import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import { Autocomplete } from '@mui/material';
import { useGetPaymentSourcesQuery } from 'store/api/paymentSource/paymentSourceApi';
import { useGetExpenseAreasQuery } from 'store/api/expenseArea/expenseAreaApi';
import { useGetAllVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { useGetAllMonthlyExpenseHeadsQuery } from 'store/api/monthlyExpenseHead/monthlyExpenseHeadApi';
import moment from 'moment';
import { useUpdateMonthlyExpenseMutation } from 'store/api/monthlyExpense/monthlyExpenseApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateExpense = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date);
  const [expenseArea, setExpenseArea] = useState(preData?.expenseArea || null);
  const [vehicle, setVehicle] = useState(preData?.vehicle || null);
  const [monthlyExpenseHead, setMonthlyExpenseHead] = useState(
    preData?.monthlyExpenseHead || null
  );
  const [paymentSource, setPaymentSource] = useState(
    preData?.paymentSource || null
  );

  // library
  const { data: expenseAreaData, isLoading: expenseAreaLoading } =
    useGetExpenseAreasQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseAreas = expenseAreaData?.expenseAreas || [];

  const { data: vehicleData, isLoading: vehicleLoading } =
    useGetAllVehiclesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVehicles = vehicleData?.vehicles || [];

  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetAllMonthlyExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.monthlyExpenseHeads || [];

  const { data: paymentSourceData, isLoading: paymentSourceLoading } =
    useGetPaymentSourcesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentSources = paymentSourceData?.paymentSources || [];
  // end library

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  const dispatch = useDispatch();

  const [updateMonthlyExpense] = useUpdateMonthlyExpenseMutation();

  const onSubmit = async (data) => {
    const newData = {
      year: moment(date).format('YYYY'),
      month: moment(date).format('MMMM'),
      date: date,
      expenseAreaId: expenseArea?.id,
      vehicleId: vehicle?.id,
      monthlyExpenseHeadId: monthlyExpenseHead?.id,
      expenseDetails: data?.expenseDetails || '',
      amount: data?.amount,
      paymentSourceId: paymentSource?.id,
    };

    try {
      setLoading(true);
      const res = await updateMonthlyExpense({
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
            Edit Expense
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
                  label="Date"
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
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                loading={expenseAreaLoading}
                value={expenseArea}
                size="small"
                fullWidth
                options={allExpenseAreas}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setExpenseArea(newValue);
                  setVehicle(null);
                }}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Expense Area" required />
                )}
              />
            </Grid>
            {expenseArea?.label?.toLowerCase()?.includes('vehicle') ? (
              <Grid item xs={12}>
                <Autocomplete
                  loading={vehicleLoading}
                  value={vehicle}
                  size="small"
                  fullWidth
                  options={allVehicles}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setVehicle(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Vehicle" required />
                  )}
                />
              </Grid>
            ) : null}

            <Grid item xs={12} md={4.5}>
              <Autocomplete
                loading={expenseHeadLoading}
                value={monthlyExpenseHead}
                size="small"
                fullWidth
                options={allExpenseHeads}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setMonthlyExpenseHead(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Expense Head" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={7.5}>
              <TextField
                fullWidth
                label="Expense Details"
                size="small"
                {...register('expenseDetails')}
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

export default UpdateExpense;
