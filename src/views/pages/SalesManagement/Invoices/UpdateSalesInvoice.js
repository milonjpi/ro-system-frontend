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
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import ProductFields from './ProductFields';
import {
  IconFileInvoice,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import { InputBase, TableRow } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useUpdateInvoiceMutation } from 'store/api/invoice/invoiceApi';
import {
  StyledTableCell,
  StyledTableCellWithBorder,
  StyledTableRow,
} from 'ui-component/table-component';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 550, md: 850 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const productValue = {
  product: null,
  quantity: 1,
};

const UpdateSalesInvoice = ({
  open,
  handleClose,
  preData,
  allDetailCustomers,
}) => {
  const findCustomer = allDetailCustomers.find(
    (el) => el.id === preData?.customerId
  );


  const voucherDetails = preData?.voucherDetails || [];
  const voucherAmount = totalSum(voucherDetails, 'receiveAmount');

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(findCustomer);
  const [invoiceDate, setInvoiceDate] = useState(preData?.date);

  const [advance, setAdvance] = useState(
    preData?.paidAmount - voucherAmount || 0
  );
  const [receiveAmount, setReceiveAmount] = useState(voucherAmount || 0);
  const [discount, setDiscount] = useState(preData?.discount);
  // hook form
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      products: preData?.invoicedProducts || [productValue],
      receiveAmount: voucherAmount,
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

  // calculation
  const totalPayment = customer?.invoices?.voucherAmount || 0;
  const paidAmount =
    (customer?.invoices?.paidAmount || 0) - preData?.paidAmount;
  const presentBalance = totalPayment - paidAmount - voucherAmount;

  const watchValue = useWatch({ control, name: 'products' });
  const subTotalMapped = watchValue?.map((el) => ({
    amount: (el.quantity || 0) * (el.product?.price || 0),
  }));
  const subTotal = totalSum(subTotalMapped, 'amount');
  const totalValue = subTotal - parseInt(discount || 0);

  const paidInvoiceAmount = Number(advance || 0) + Number(receiveAmount || 0);
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
  const [updateInvoice] = useUpdateInvoiceMutation();

  const onSubmit = async (data) => {
    const newData = {
      data: {
        date: invoiceDate,
        customerId: customer?.id,
        totalQty: totalSum(data?.products || [], 'quantity'),
        totalPrice: subTotal,
        discount: parseInt(discount || 0),
        amount: totalValue,
        paidAmount: paidInvoiceAmount,
        status:
          paidInvoiceAmount === totalValue
            ? 'Paid'
            : paidInvoiceAmount > 0
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
      voucher: {
        id: voucherDetails[0]?.voucherId || '123',
        amount: Number(receiveAmount || '0'),
      },
    };
    try {
      setLoading(true);
      const res = await updateInvoice({
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
            Edit Invoice
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
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Autocomplete
                    value={customer}
                    disabled
                    size="small"
                    fullWidth
                    options={[findCustomer]}
                    getOptionLabel={(option) => option.customerName}
                    onChange={(e, newValue) => setCustomer(newValue)}
                    isOptionEqualToValue={(item, value) => item.id === value.id}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Customer" required />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCellWithBorder
                      colSpan={2}
                      align="center"
                      sx={{ py: '2px !important' }}
                    >
                      Adjust Payment
                    </StyledTableCellWithBorder>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCellWithBorder sx={{ py: '6px !important' }}>
                      Advance &#40;{presentBalance > 0 ? presentBalance : 0}
                      &#41;
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder
                      align="right"
                      sx={{ width: 120, py: '6px !important' }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Amount"
                        type="number"
                        value={advance}
                        onChange={(e) => setAdvance(e.target.value)}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max:
                              totalValue > presentBalance
                                ? presentBalance
                                : totalValue,
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: 10,
                            px: 1,
                            py: 0.7,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            fontSize: 10,
                          },
                        }}
                      />
                    </StyledTableCellWithBorder>
                  </TableRow>
                  <TableRow>
                    <StyledTableCellWithBorder sx={{ py: '6px !important' }}>
                      New Payment
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder
                      align="right"
                      sx={{ width: 120, py: '6px !important' }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Amount"
                        type="number"
                        value={receiveAmount}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: totalValue - Number(advance || '0'),
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-input': {
                            fontSize: 10,
                            px: 1,
                            py: 0.7,
                          },
                          '& .MuiInputBase-input::placeholder': {
                            fontSize: 10,
                          },
                        }}
                      />
                    </StyledTableCellWithBorder>
                  </TableRow>
                </TableBody>
              </Table>
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

                      {watchValue.length ? (
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
                              {Number(advance || '0') +
                                Number(receiveAmount || 0)}
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
                <span style={{ lineHeight: 1 }}>Update Invoice</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateSalesInvoice;

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
