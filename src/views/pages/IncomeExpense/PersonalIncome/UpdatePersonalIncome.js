import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetIncomeExpenseCategoriesQuery } from 'store/api/incomeExpenseCategory/incomeExpenseCategoryApi';
import { useGetIncomeExpenseHeadsQuery } from 'store/api/incomeExpenseHead/incomeExpenseHeadApi';
import { useGetModeOfPaymentsQuery } from 'store/api/modeOfPayment/modeOfPaymentApi';
import { useUpdateIncomeExpenseMutation } from 'store/api/incomeExpense/incomeExpenseApi';
import AddInExCategory from '../InExCategory/AddInExCategory';
import AddIncomeHead from '../IncomeHead/AddIncomeHead';
import AddModeOfPayment from '../ModeOfPayment/AddModeOfPayment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 450, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdatePersonalIncome = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date);
  const [category, setCategory] = useState(preData?.category || null);
  const [head, setHead] = useState(preData?.incomeExpenseHead || null);
  const [mode, setMode] = useState(preData?.modeOfPayment || null);

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  const [openCat, setOpenCat] = useState(false);
  const [openHead, setOpenHead] = useState(false);
  const [openMode, setOpenMode] = useState(false);

  // library
  const { data: categoryData } = useGetIncomeExpenseCategoriesQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCategories = categoryData?.incomeExpenseCategories || [];

  const { data: headData } = useGetIncomeExpenseHeadsQuery(
    {
      limit: 100,
      type: 'Income',
      categoryId: category?.id || '123',
      sortBy: 'label',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allIncomeHeads = headData?.incomeExpenseHeads || [];

  const { data: modeOfHeadData } = useGetModeOfPaymentsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allModeOfPayments = modeOfHeadData?.modeOfPayments || [];
  // end library

  const dispatch = useDispatch();

  const [updateIncomeExpense] = useUpdateIncomeExpenseMutation();

  const onSubmit = async (data) => {
    const newData = {
      type: 'Income',
      date: date,
      categoryId: category?.id,
      incomeExpenseHeadId: head?.id,
      amount: data?.amount,
      modeOfPaymentId: mode?.id,
      remarks: data?.remarks,
    };
    try {
      setLoading(true);
      const res = await updateIncomeExpense({
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
            Edit Income
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}
        <AddInExCategory open={openCat} handleClose={() => setOpenCat(false)} />
        <AddIncomeHead open={openHead} handleClose={() => setOpenHead(false)} />
        <AddModeOfPayment
          open={openMode}
          handleClose={() => setOpenMode(false)}
        />
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
                      required
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  value={category}
                  size="small"
                  fullWidth
                  options={allCategories}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setCategory(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" required />
                  )}
                />
                <Tooltip title="Add Category">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 1 }}
                    onClick={() => setOpenCat(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  value={head}
                  size="small"
                  fullWidth
                  options={allIncomeHeads}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setHead(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Income Head"
                      required
                    />
                  )}
                />
                <Tooltip title="Add Head">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 1 }}
                    onClick={() => setOpenHead(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  value={mode}
                  size="small"
                  fullWidth
                  options={allModeOfPayments}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setMode(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Mode of Payment" required />
                  )}
                />
                <Tooltip title="Add Mode">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 1 }}
                    onClick={() => setOpenMode(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Amount"
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
                color="primary"
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

export default UpdatePersonalIncome;
