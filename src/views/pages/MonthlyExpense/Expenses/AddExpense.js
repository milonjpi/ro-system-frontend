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
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import {
  Autocomplete,
  Table,
  TableBody,
  TableHead,
  Tooltip,
} from '@mui/material';
import { useGetExpenseAreasQuery } from 'store/api/expenseArea/expenseAreaApi';
import { useGetAllVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import { useCreateMonthlyExpenseMutation } from 'store/api/monthlyExpense/monthlyExpenseApi';
import { totalSum } from 'views/utilities/NeedyFunction';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import ExpenseFields from './ExpenseFields';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 550, md: 850 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const defaultValue = {
  date: moment(),
  monthlyExpenseHead: null,
  expenseDetails: '',
  paymentSource: null,
  amount: 0,
};

const AddExpense = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [expenseArea, setExpenseArea] = useState(null);
  const [vehicle, setVehicle] = useState(null);

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
  // end library

  // hook form
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      expenses: [defaultValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const handleAppend = () => {
    append(defaultValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // calculation

  const watchValue = useWatch({ control, name: 'expenses' });

  const totalAmount = totalSum(watchValue || [], 'amount');

  // end calculation

  // table
  const tableHeads = [
    {
      title: 'Expense Head',
    },
    {
      title: 'Details',
    },
    {
      title: 'Payment Source',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  const dispatch = useDispatch();

  const [createMonthlyExpense] = useCreateMonthlyExpenseMutation();

  const onSubmit = async (data) => {
    const newData = data?.expenses?.map((el) => ({
      year: moment(date).format('YYYY'),
      month: moment(date).format('MMMM'),
      date: date,
      expenseAreaId: expenseArea?.id,
      vehicleId: vehicle?.id,
      monthlyExpenseHeadId: el.monthlyExpenseHead?.id,
      expenseDetails: el?.expenseDetails || '',
      amount: el?.amount,
      paymentSourceId: el.paymentSource?.id,
    }));

    try {
      setLoading(true);
      const res = await createMonthlyExpense({ data: newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset({ expenses: [defaultValue] });
        setDate(moment());
        setExpenseArea(null);
        setVehicle(null);
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
            Add Expense
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
            <Grid item xs={12}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <StyledTableRow>
                      {tableHeads?.map((el, index) => (
                        <StyledTableCell key={index} align={el.align || 'left'}>
                          {el.title}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((el, index) => (
                      <ExpenseFields
                        key={el.id}
                        field={el}
                        index={index}
                        control={control}
                        handleRemove={handleRemove}
                        register={register}
                      />
                    ))}
                    <StyledTableRow>
                      <StyledTableCell sx={{ verticalAlign: 'top' }}>
                        <Tooltip title="Add Row">
                          <IconButton color="primary" onClick={handleAppend}>
                            <IconSquareRoundedPlusFilled size={20} />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      {watchValue?.length ? (
                        <>
                          <StyledTableCell colSpan={2} align="right">
                            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                              Total Amount:
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.7 }}
                            >
                              {totalAmount}
                            </Typography>
                          </StyledTableCell>
                        </>
                      ) : null}
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </Box>
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
