import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  IconFileInvoice,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import { InputBase } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useCustomerDetailsQuery } from 'store/api/customer/customerApi';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ProductFields from './ProductFields';
import { useCreateInvoiceMutation } from 'store/api/invoice/invoiceApi';
import { useGetCustomerGroupsQuery } from 'store/api/customerGroup/customerGroupApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 700 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const productValue = {
  product: null,
  quantity: 1,
};

const AddSalesInvoice = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [invoiceDate, setInvoiceDate] = useState(moment());

  const [discount, setDiscount] = useState('');

  // hook form
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      products: [productValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const handleAppend = () => {
    append(productValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // library
  const { data: groupData, isLoading: groupLoading } =
    useGetCustomerGroupsQuery(
      { limit: 100, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allCustomerGroups = groupData?.customerGroups || [];

  const customerQuery = {};

  if (group) {
    customerQuery['groupId'] = group.id;
  }

  const { data: customerData } = useCustomerDetailsQuery(
    { ...customerQuery },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];

  // end library

  // calculation
  const totalPayment = customer?.invoices?.voucherAmount || 0;
  const paidAmount = customer?.invoices?.paidAmount || 0;
  const presentBalance = totalPayment - paidAmount;

  const watchValue = useWatch({ control, name: 'products' });
  const subTotalMapped = watchValue?.map((el) => ({
    amount: (el.quantity || 0) * (el.product?.price || 0),
  }));

  const subTotal = totalSum(subTotalMapped || [], 'amount');
  const totalValue = subTotal - parseInt(discount || 0);
  const givenFromBalance =
    presentBalance > totalValue ? totalValue : presentBalance;
  // end calculation

  // table
  const tableHeads = [
    {
      title: 'Product Details',
    },
    {
      title: 'Quantity',
    },
    {
      title: 'Unit Price',
    },
    {
      title: 'Total',
      align: 'right',
    },
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  const dispatch = useDispatch();
  const [createInvoice] = useCreateInvoiceMutation();

  const onSubmit = async (data) => {
    const newData = {
      data: {
        date: invoiceDate,
        customerId: customer?.id,
        totalQty: totalSum(data?.products || [], 'quantity'),
        totalPrice: subTotal,
        discount: parseInt(discount || 0),
        amount: totalValue,
        paidAmount: givenFromBalance,
        status:
          givenFromBalance === totalValue
            ? 'Paid'
            : givenFromBalance > 0
            ? 'Partial'
            : 'Due',
      },
      invoicedProducts:
        data?.products?.map((el) => ({
          productId: el.product?.id,
          quantity: el.quantity || 1,
          unitPrice: el.product?.price,
          totalPrice: (el.quantity || 1) * el.product?.price,
        })) || [],
    };
    try {
      setLoading(true);
      const res = await createInvoice({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setCustomer(null);
        setInvoiceDate(moment());
        reset({ products: [productValue] });
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
            Create Invoice
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
            <Grid item xs={12} md={4.5}>
              <Autocomplete
                value={group}
                loading={groupLoading}
                size="small"
                fullWidth
                options={allCustomerGroups}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setGroup(newValue);
                  setCustomer(null);
                }}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Group" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={7.5}>
              <Autocomplete
                value={customer}
                size="small"
                fullWidth
                options={allCustomers}
                getOptionLabel={(option) => option.customerName}
                onChange={(e, newValue) => setCustomer(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Customer" required />
                )}
              />
            </Grid>

            <Grid item xs={8} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Invoice Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={invoiceDate}
                  onChange={(newValue) => {
                    setInvoiceDate(newValue);
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

            <Grid item xs={4} sx={{ alignSelf: 'center' }}>
              {customer ? (
                <Typography sx={{ fontSize: 11 }}>
                  Balance:{' '}
                  <span style={{ color: 'red' }}>
                    {presentBalance > 0 ? presentBalance : 0}
                  </span>
                </Typography>
              ) : null}
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
                    {fields.map((el, index) => (
                      <ProductFields
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
                            <Typography
                              sx={{ fontSize: 12, mb: 1, fontWeight: 700 }}
                            >
                              Sub Total:
                            </Typography>
                            <Typography
                              sx={{ fontSize: 12, mb: 1, fontWeight: 700 }}
                            >
                              Discount:
                            </Typography>
                            <Typography
                              sx={{ fontSize: 12, mb: 1, fontWeight: 700 }}
                            >
                              Total:
                            </Typography>
                            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                              Paid Amount:
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 12, mb: 1, fontWeight: 700 }}
                            >
                              {subTotal}
                            </Typography>

                            <InputBase
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                              fullWidth
                              size="small"
                              type="number"
                              placeholder="Discount"
                              sx={styles.inputNumber}
                            />
                            <Typography
                              sx={{ fontSize: 12, mb: 1, fontWeight: 700 }}
                            >
                              {totalValue}
                            </Typography>
                            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                              {givenFromBalance}
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
                color="primary"
                sx={{ py: 1 }}
                loading={loading}
                loadingPosition="start"
                startIcon={<IconFileInvoice />}
                variant="contained"
                type="submit"
              >
                <span style={{ lineHeight: 1 }}>Create Invoice</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddSalesInvoice;

const styles = {
  inputNumber: {
    '& input[type=number]': {
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 700,
      MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 700,
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 700,
      margin: 0,
    },
  },
};
