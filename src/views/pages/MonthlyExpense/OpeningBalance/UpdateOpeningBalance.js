import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useUpdateOpeningBalanceMutation } from 'store/api/openingBalance/openingBalanceApi';
import { Autocomplete } from '@mui/material';
import { useGetPaymentSourcesQuery } from 'store/api/paymentSource/paymentSourceApi';
import { electricMonths } from 'assets/data';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateOpeningBalance = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(preData?.year);
  const [month, setMonth] = useState(preData?.month);
  const [paymentSource, setPaymentSource] = useState(
    preData?.paymentSource || null
  );

  // library
  const { data: paymentSourceData, isLoading: paymentSourceLoading } =
    useGetPaymentSourcesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentSources = paymentSourceData?.paymentSources || [];
  // end library

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  const dispatch = useDispatch();

  const [updateOpeningBalance] = useUpdateOpeningBalanceMutation();

  const onSubmit = async (data) => {
    const newData = {
      year: year,
      month: month,
      amount: data?.amount || 0,
      paymentSourceId: paymentSource?.id,
      remarks: data?.remarks || '',
    };

    try {
      setLoading(true);
      const res = await updateOpeningBalance({
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
          })
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
        })
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
            Edit Opening Balance
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="select-year-id">Year</InputLabel>
                <Select
                  labelId="select-year-id"
                  value={year}
                  label="Year"
                  onChange={(e) => setYear(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6].map((el) => (
                    <MenuItem key={el} value={`${2024 + el}`}>
                      {2024 + el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={month}
                size="small"
                fullWidth
                options={electricMonths}
                onChange={(e, newValue) => setMonth(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Month" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                loading={paymentSourceLoading}
                value={paymentSource}
                size="small"
                fullWidth
                options={allPaymentSources}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setPaymentSource(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Payment Source" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Amount"
                type="number"
                size="small"
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateOpeningBalance;
