import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  IconFileInvoice,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { useGetInvoicesQuery } from 'store/api/invoice/invoiceApi';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import InvoicesRow from './InvoicesRow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const productValue = {
  product: null,
  quantity: 1,
};

const NewPaymentReceive = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [amount, setAmount] = useState('');
  const [invoice, setInvoice] = useState(false);

  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(moment());

  const [discount, setDiscount] = useState('');

  const [invoiceLoading, setInvoiceLoading] = useState(false);

  // hook form
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invoices',
  });

  const handleAppend = () => {
    append(productValue);
  };
  const handleRemove = (index) => remove(index);

  // calculation
  const watchValue = useWatch({ control });
  const changeMainAmount = () => {
    const changedAmount = Object.values(watchValue)?.reduce(
      (acc, el) => acc + el,
      0
    );
    if (changedAmount > Number(amount)) {
      setAmount(changedAmount);
    }
  };

  console.log(Object.values(watchValue));

  // const subTotal = totalSum(subTotalMapped, 'amount');
  // const totalValue = subTotal - parseInt(discount || 0);
  // end calculation

  // library
  const customerQuery = {};

  customerQuery['limit'] = 1000;
  customerQuery['sortBy'] = 'customerName';
  customerQuery['sortOrder'] = 'asc';

  if (customer) {
    customerQuery['customerId'] = customer.id;
  }
  const { data: customerData } = useGetCustomersQuery(
    { ...customerQuery },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];

  const { data: invoiceData } = useGetInvoicesQuery(
    { limit: 30, sortBy: 'invoiceNo', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allInvoices = invoiceData?.invoices || [];
  // end library

  // handle customer
  const handleCustomer = (value) => {
    setCustomer(value);
    if (value) {
      reset({ invoices: allInvoices });
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
      title: 'Receive Amount',
    },
  ];
  // end table

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // setLoading(true);
    console.log(data);
    // const productData = data?.products?.map((el) => ({
    //   product: el.product?._id,
    //   unitPrice: el.product?.price,
    //   quantity: el.quantity,
    // }));
    // const newData = {
    //   date,
    //   products: productData,
    //   customer: customer?._id,
    //   // totalAmount: subTotal,
    //   discount: parseInt(discount || 0),
    //   // amount: totalValue,
    //   refNo: order?._id || null,
    // };
    // axiosPrivate
    //   .post('/invoices', newData)
    //   .then((res) => {
    //     handleClose();
    //     dispatch(setRefresh());
    //     setLoading(false);
    //     setCustomer(null);
    //     setInvoices([]);
    //     setOrder(null);
    //     setDate(moment());
    //     setDiscount('');
    //     reset({ products: [productValue] });
    //     dispatch(
    //       setToast({
    //         open: true,
    //         variant: 'success',
    //         message: res.data?.message,
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     dispatch(
    //       setToast({
    //         open: true,
    //         variant: 'error',
    //         message: err.response?.data?.message || 'Network Error',
    //         errorMessages: err.response?.data?.errorMessages,
    //       })
    //     );
    //   });
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
            New Receipt
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
                isOptionEqualToValue={(item, value) => item._id === value._id}
                renderInput={(params) => (
                  <TextField {...params} label="Paid By" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <TextField
                value={amount}
                fullWidth
                size="small"
                label="Amount"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => setAmount(e.target.value)}
              />
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
                        <InvoicesRow
                          key={el.id}
                          index={index}
                          sn={sn++}
                          register={register}
                          data={el}
                          amount={amount}
                          setAmount={setAmount}
                          control={control}
                        />
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={9} align="center">
                          {invoiceLoading ? (
                            <CircularProgress size={20} thickness={6} />
                          ) : (
                            'No Invoices'
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
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
