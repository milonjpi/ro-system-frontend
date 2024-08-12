import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import { electricMonths, electricYears } from 'assets/data';
import { useCreateElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddElectricBill = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [meter, setMeter] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [status, setStatus] = useState(null);

  // library
  const { data: meterData, isLoading: meterLoading } = useGetMetersQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.meters || [];
  // end library

  const { register, handleSubmit, control, reset } = useForm();

  const dispatch = useDispatch();

  const [createElectricityBill] = useCreateElectricityBillMutation();

  // watch value
  const netBill = useWatch({ control, name: 'netBill' });
  const amount = useWatch({ control, name: 'amount' });

  const onSubmit = async (data) => {
    if (data.netBill > data?.amount) {
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Net Bill is Greater than Total Bill',
        })
      );
    }
    const newData = {
      date: date,
      meterId: meter?.id,
      month: month,
      year: year,
      meterReading: data?.meterReading,
      unit: data?.unit,
      unitDetails: data?.unitDetails,
      netBill: data?.netBill,
      serviceCharge: data?.amount - data?.netBill,
      amount: data?.amount,
      paidBy: data?.paidBy,
      remarks: data?.remarks,
      status: status,
    };
    try {
      setLoading(true);
      const res = await createElectricityBill({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setDate(null);
        setMeter(null);
        setYear(null);
        setMonth(null);
        setStatus(null);
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
            Add Electric Bill
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Paid Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={meter}
                loading={meterLoading}
                size="small"
                fullWidth
                options={allMeters}
                getOptionLabel={(option) =>
                  option.label +
                  (option.smsAccount ? ', ' + option.smsAccount : '')
                }
                onChange={(e, newValue) => setMeter(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Meter" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={year}
                size="small"
                fullWidth
                options={electricYears}
                onChange={(e, newValue) => setYear(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Year" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                value={status}
                size="small"
                fullWidth
                options={['Due', 'Paid']}
                onChange={(e, newValue) => setStatus(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Paying Status" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Meter Reading"
                size="small"
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                {...register('meterReading', {
                  valueAsNumber: true,
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Unit"
                size="small"
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                {...register('unit', { valueAsNumber: true, required: true })}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Unit Details With Amount"
                size="small"
                required
                {...register('unitDetails', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Net Bill"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                required
                {...register('netBill', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Service Charge</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {netBill && amount ? amount - netBill : 0}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Bill"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                required
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Paid By"
                size="small"
                required
                {...register('paidBy', { required: true })}
              />
            </Grid>

            <Grid item xs={12} md={8}>
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
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddElectricBill;
