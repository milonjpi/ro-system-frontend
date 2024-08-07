import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { IconFileInvoice } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { setToast } from 'store/toastSlice';
import { useCreateDrVoucherMutation } from 'store/api/drVoucher/drVoucherApi';
import DrInvoicesRow from './DrInvoicesRow';

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

const AddVoucher = ({ open, handleClose, allCustomers }) => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  const [date, setDate] = useState(moment());

  // hook form
  const { register, handleSubmit, control, reset } = useForm();
  const { fields } = useFieldArray({
    control,
    name: 'invoices',
  });

  // calculation
  const totalAmount = totalSum(fields || [], 'amount');
  const totalPaid = totalSum(fields || [], 'paidAmount');
  const totalDue = totalAmount - totalPaid;
  const watchValue = useWatch({ control });

  const subTotal = totalSum(watchValue?.invoices || [], 'receiveAmount');
  const advanced = (watchValue?.amount || 0) - subTotal;
  // end calculation

  // handle customer
  const handleCustomer = (value) => {
    setCustomer(value);
    if (value) {
      reset({ invoices: value.drInvoices || [] });
    } else {
      reset({ invoices: [] });
    }
  };

  // table
  const tableHeads = [
    {
      title: 'Invoice Date',
    },
    {
      title: 'Invoice No',
    },
    {
      title: 'Total Amount',
      align: 'right',
    },
    {
      title: 'Paid Amount',
      align: 'right',
    },
    {
      title: 'Due Amount',
      align: 'right',
    },
    {
      title: 'Pay Now',
    },
  ];
  // end table

  const dispatch = useDispatch();
  const [createDrVoucher] = useCreateDrVoucherMutation();

  const onSubmit = async (data) => {
    if ((watchValue?.amount || 0) !== subTotal)
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Your Calculation miss match',
        })
      );
    const newData = {
      date: date,
      amount: data?.amount,
      customerId: customer.id,
      narration: data?.narration,
      invoices: data?.invoices?.map((el) => ({
        id: el.id,
        paidAmount: el.paidAmount + el.receiveAmount,
        status:
          el.paidAmount + el.receiveAmount === el.amount
            ? 'Paid'
            : el.paidAmount + el.receiveAmount > 0
            ? 'Partial'
            : 'Due',
      })),
      drVoucherDetails: data?.invoices
        ?.filter((inv) => inv.receiveAmount > 0)
        .map((el) => ({
          invoiceId: el.id,
          receiveAmount: el.receiveAmount,
        })),
    };
    try {
      setLoading(true);
      const res = await createDrVoucher({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setDate(moment());
        setCustomer(null);
        reset({ invoices: [], narration: '' });
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

  let sn = 1;
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
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}

        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
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
            <Grid item xs={12} md={6} lg={4}>
              <Autocomplete
                value={customer}
                size="small"
                fullWidth
                options={allCustomers}
                getOptionLabel={(option) => option.customerName}
                onChange={(e, newValue) => handleCustomer(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Paid By" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                size="small"
                label="Amount"
                type="number"
                required
                inputProps={{ min: 1 }}
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Narration"
                {...register('narration')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ alignSelf: 'center' }}>
              <Typography sx={{ fontSize: 11 }}>
                Total Distribute:{' '}
                <span style={{ color: '#0066ff' }}>{subTotal}</span>, Advance:{' '}
                <span style={{ color: advanced < 0 ? 'red' : 'green' }}>
                  {advanced}
                </span>
              </Typography>
            </Grid>
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
                    {fields.length ? (
                      fields.map((el, index) => (
                        <DrInvoicesRow
                          key={el.id}
                          index={index}
                          sn={sn++}
                          register={register}
                          data={el}
                          control={control}
                        />
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={9} align="center">
                          No Invoices
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                    {fields.length ? (
                      <StyledTableRow>
                        <StyledTableCell align="right" colSpan={4}>
                          Total Due:
                        </StyledTableCell>
                        <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                          {totalDue}
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                disabled={(watchValue?.amount || 0) !== subTotal}
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<IconFileInvoice />}
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

export default AddVoucher;
