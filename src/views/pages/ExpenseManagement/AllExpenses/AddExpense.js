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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';
import { useVendorDetailsQuery } from 'store/api/vendor/vendorApi';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { useCreateExpenseMutation } from 'store/api/expense/expenseApi';
import { Button, Tooltip } from '@mui/material';
import AddExpenseHead from '../ExpenseHeads/AddExpenseHead';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 600, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddExpense = ({ open, handleClose }) => {
  const [date, setDate] = useState(moment());
  const [expenseHead, setExpenseHead] = useState(null);
  const [vendor, setVendor] = useState(null);

  const [headOpen, setHeadOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: expenseHeadData } = useGetExpenseHeadsQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = expenseHeadData?.expenseHeads || [];

  const { data: vendorData } = useVendorDetailsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allVendors = vendorData?.vendors || [];

  // end library

  const dispatch = useDispatch();

  const [createExpense] = useCreateExpenseMutation();

  const onSubmit = async (data) => {
    const newData = {
      date,
      expenseHeadId: expenseHead?.id,
      vendorId: vendor?.id,
      amount: data?.amount,
      expenseDetails: data?.expenseDetails || '',
      remarks: data?.remarks || '',
    };
    try {
      setLoading(true);
      const res = await createExpense({ ...newData }).unwrap();
      if (res.success) {
        setLoading(false);
        reset();
        setDate(moment());
        setExpenseHead(null);
        setVendor(null);
        handleClose();
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
            Add Expense
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
        <AddExpenseHead
          open={headOpen}
          handleClose={() => setHeadOpen(false)}
        />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
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
                      required
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ControlledAutoComplete
                  label="Select Expense Head"
                  required
                  value={expenseHead}
                  options={allExpenseHeads}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setExpenseHead(newValue)}
                />
                <Tooltip title="Add Head">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setHeadOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledAutoComplete
                label="Select Vendor"
                value={vendor}
                options={allVendors}
                getOptionLabel={(option) => option.vendorName}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setVendor(newValue)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                size="small"
                type="number"
                required
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Expense Details"
                size="small"
                {...register('expenseDetails')}
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
                size="small"
                fullWidth
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

export default AddExpense;
