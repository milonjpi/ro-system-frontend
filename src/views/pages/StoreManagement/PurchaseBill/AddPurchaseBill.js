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
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import EquipmentFields from './EquipmentFields';
import { useVendorDetailsQuery } from 'store/api/vendor/vendorApi';
import { useCreateBillMutation } from 'store/api/bill/billApi';

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

const equipmentValue = {
  equipment: null,
  quantity: 1,
  unitPrice: 0,
};

const AddPurchaseBill = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [billDate, setBillDate] = useState(moment());

  const [discount, setDiscount] = useState('');

  // hook form
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      equipments: [equipmentValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipments',
  });

  const handleAppend = () => {
    append(equipmentValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // calculation
  const totalPayment = vendor?.bills?.voucherAmount || 0;
  const paidAmount = vendor?.bills?.paidAmount || 0;
  const presentBalance = totalPayment - paidAmount;

  const watchValue = useWatch({ control, name: 'equipments' });
  const subTotalMapped = watchValue?.map((el) => ({
    amount: (el.quantity || 0) * (el.unitPrice || 0),
  }));

  const subTotal = totalSum(subTotalMapped || [], 'amount');
  const totalValue = subTotal - parseInt(discount || 0);
  const givenFromBalance =
    presentBalance > totalValue ? totalValue : presentBalance;
  // end calculation

  // library
  const { data: vendorData } = useVendorDetailsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allVendors = vendorData?.vendors || [];

  // end library
  // table
  const tableHeads = [
    {
      title: 'Equipment Details',
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
  const [createBill] = useCreateBillMutation();

  const onSubmit = async (data) => {
    const newData = {
      data: {
        date: billDate,
        vendorId: vendor?.id,
        totalQty: totalSum(data?.equipments || [], 'quantity'),
        totalPrice: subTotal,
        discount: parseInt(discount || 0),
        amount: totalValue,
        paidAmount: givenFromBalance,
        refNo: data?.refNo || '',
        status:
          givenFromBalance === totalValue
            ? 'Paid'
            : givenFromBalance > 0
            ? 'Partial'
            : 'Due',
      },
      billEquipments:
        data?.equipments?.map((el) => ({
          equipmentId: el.equipment?.id,
          quantity: el.quantity || 1,
          unitPrice: el.unitPrice,
          totalPrice: (el.quantity || 1) * (el.unitPrice || 0),
        })) || [],
    };

    try {
      setLoading(true);
      const res = await createBill({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setVendor(null);
        setBillDate(moment());
        reset({ refNo: '', equipments: [equipmentValue] });
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
            Create Bill
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
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
            <Grid item xs={8}>
              <Autocomplete
                value={vendor}
                size="small"
                fullWidth
                options={allVendors}
                getOptionLabel={(option) => option.vendorName}
                onChange={(e, newValue) => setVendor(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Vendor" required />
                )}
              />
            </Grid>
            <Grid item xs={4} sx={{ alignSelf: 'center' }}>
              {vendor ? (
                <Typography sx={{ fontSize: 11 }}>
                  Balance:{' '}
                  <span style={{ color: 'red' }}>
                    {presentBalance > 0 ? presentBalance : 0}
                  </span>
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Bill Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={billDate}
                  onChange={(newValue) => {
                    setBillDate(newValue);
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
              <TextField
                fullWidth
                size="small"
                label="Remarks"
                {...register('refNo')}
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
                    {fields.map((el, index) => (
                      <EquipmentFields
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
                <span style={{ lineHeight: 1 }}>Create Bill</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddPurchaseBill;

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
