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
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { IconFileInvoice } from '@tabler/icons-react';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { useReceivePaymentMutation } from 'store/api/voucher/voucherApi';
import { setToast } from 'store/toastSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 550 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const NewPaymentReceive = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  const [date, setDate] = useState(moment());

  // hook form
  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: customerData } = useGetCustomersQuery(
    {
      forVoucher: true,
      isActive: true,
      limit: 1000,
      sortBy: 'customerName',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];
  // end library

  const dispatch = useDispatch();
  const [receivePayment] = useReceivePaymentMutation();

  const onSubmit = async (data) => {
    const newData = {
      date: date,
      amount: data?.amount,
      customerId: customer.id,
      narration: data?.narration,
      version: true,
    };
    try {
      setLoading(true);
      const res = await receivePayment({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setDate(moment());
        setCustomer(null);
        reset();
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
            Receive Payment
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* popup items */}

        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Receipt Date"
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
                      required
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={8}>
              <Autocomplete
                value={customer}
                size="small"
                fullWidth
                options={allCustomers}
                getOptionLabel={(option) => option.customerName}
                onChange={(e, newValue) => setCustomer(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Paid By" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Amount"
                type="number"
                required
                inputProps={{ min: 5 }}
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Narration"
                {...register('narration')}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<IconFileInvoice />}
                variant="contained"
                type="submit"
              >
                <span style={{ lineHeight: 1 }}>Submit</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default NewPaymentReceive;
