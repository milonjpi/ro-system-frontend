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
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { Autocomplete } from '@mui/material';
import { zakatYears } from 'assets/data';
import {
  convertToBanglaNumber,
  convertToEnglishNumber,
} from 'views/utilities/NeedyFunction';
import { useUpdateZakatValueMutation } from 'store/api/zakatValue/zakatValueApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 450 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateZakatAmount = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(preData?.year);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      amount: convertToBanglaNumber(preData?.amount),
    },
  });

  // watch amount
  const watchAmount = watch('amount', ''); // Watch the amount field

  const dispatch = useDispatch();
  const [updateZakatValue] = useUpdateZakatValueMutation();

  const onSubmit = async (data) => {
    if (isNaN(Number(convertToEnglishNumber(data.amount)))) {
      return dispatch(
        setToast({
          open: true,
          variant: 'success',
          message: 'Please correct the amount',
        })
      );
    }

    const newData = {
      year: year,
      amount: Number(convertToEnglishNumber(data.amount)),
    };

    try {
      setLoading(true);
      const res = await updateZakatValue({ id: preData?.id, body: newData }).unwrap();
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

  // console.log(amount);

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
            যাকাত এমাউন্ট এডিট করুন
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
            <Grid item xs={12}>
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

            <Grid item xs={12}>
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

export default UpdateZakatAmount;
