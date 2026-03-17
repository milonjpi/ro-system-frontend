import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { Autocomplete, Button, Tooltip } from '@mui/material';
import { zakatYears } from 'assets/data';
import { useGetRecipientsQuery } from 'store/api/recipient/recipientApi';
import { useUpdateZakatMutation } from 'store/api/zakat/zakatApi';
import AddRecipient from '../Recipient/AddRecipient';
import {
  convertToBanglaNumber,
  convertToEnglishNumber,
} from 'views/utilities/NeedyFunction';
import { useGetSingleZakatValueQuery } from 'store/api/zakatValue/zakatValueApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateZakatPay = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(preData?.year);
  const [recipient, setRecipient] = useState(preData?.recipient || null);
  const [status, setStatus] = useState(preData?.status || null);

  // library open
  const [recipientOpen, setRecipientOpen] = useState(false);

  // library
  const { data: zakatValueData } = useGetSingleZakatValueQuery(year || '123', {
    refetchOnMountOrArgChange: true,
  });

  const zakatValue = zakatValueData?.data;

  const { data: recipientData, isLoading: recipientLoading } =
    useGetRecipientsQuery(
      { limit: 1000, sortBy: 'fullName', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true },
    );

  const allRecipients = recipientData?.recipients || [];
  // end library

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      ...preData,
      amount: convertToBanglaNumber(preData?.amount),
    },
  });

  // watch amount
  const watchAmount = watch('amount', ''); // Watch the amount field

  // calculation
  const zakatAmount = zakatValue?.amount || 0;
  const paidAmount =
    (zakatValue?.paid || 0) -
    preData?.amount +
    (Number(convertToEnglishNumber(watchAmount)) || 0);
  const remainingAmount = zakatAmount - paidAmount;

  const dispatch = useDispatch();

  const [updateZakat] = useUpdateZakatMutation();

  const onSubmit = async (data) => {
    if (isNaN(Number(convertToEnglishNumber(data.amount)))) {
      return dispatch(
        setToast({
          open: true,
          variant: 'success',
          message: 'Please correct the amount',
        }),
      );
    }

    const newData = {
      year: year,
      recipientId: recipient?.id,
      amount: Number(convertToEnglishNumber(data.amount)),
      status: status,
      remarks: data?.remarks || '',
    };

    try {
      setLoading(true);
      const res = await updateZakat({
        id: preData?.id,
        body: newData,
      }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          }),
        );
      }
    } catch (err) {
      setLoading(false);
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        }),
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            পরিশোধিত যাকাত সম্পাদনা করুন
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* pop up items */}
        <AddRecipient
          open={recipientOpen}
          handleClose={() => setRecipientOpen(false)}
        />
        {/* end pop up items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={year}
                size="small"
                fullWidth
                options={zakatYears}
                getOptionLabel={(option) => convertToBanglaNumber(option)}
                onChange={(e, newValue) => setYear(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="বছর নির্বাচন করুন" required />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              {year ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 0.2,
                    }}
                  >
                    <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
                      মোট:
                    </Typography>
                    <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
                      {zakatAmount}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
                      পরিশোধিত:
                    </Typography>
                    <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
                      {paidAmount}
                    </Typography>
                  </Box>
                </>
              ) : null}
            </Grid>
            <Grid item xs={6} md={3}>
              {year ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
                    অবশিষ্ট:
                  </Typography>
                  <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
                    {remainingAmount}
                  </Typography>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  loading={recipientLoading}
                  value={recipient}
                  size="small"
                  fullWidth
                  options={allRecipients}
                  getOptionLabel={(option) => option.fullName}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setRecipient(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="যাকাত গ্রহীতা" required />
                  )}
                />
                <Tooltip title="Add Vendor">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setRecipientOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="পরিমাণ"
                type="text"
                size="small"
                value={convertToBanglaNumber(watchAmount)}
                {...register('amount', {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Autocomplete
                value={status}
                size="small"
                fullWidth
                options={['DUE', 'PAID']}
                onChange={(e, newValue) => setStatus(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="স্ট্যাটাস" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="মন্তব্য"
                size="small"
                {...register('remarks')}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="secondary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                আপডেট
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateZakatPay;
