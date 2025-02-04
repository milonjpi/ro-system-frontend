import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { Autocomplete, Button, Tooltip } from '@mui/material';
import { useGetBuildingExpenseHeadsQuery } from 'store/api/buildingExpenseHead/buildingExpenseHeadApi';
import { useGetBuildingVendorsQuery } from 'store/api/buildingVendor/buildingVendorApi';
import { useGetBuildingBrandsQuery } from 'store/api/buildingBrand/buildingBrandApi';
import { useCreateBuildingExpenseMutation } from 'store/api/buildingExpense/buildingExpenseApi';
import { useGetBuildingUomQuery } from 'store/api/buildingUom/buildingUomApi';
import AddBuildingExpenseHead from '../OperationLibrary/BuildingExpenseHead/AddBuildingExpenseHead';
import AddBuildingVendor from '../OperationLibrary/BuildingVendor/AddBuildingVendor';
import AddBuildingBrand from '../OperationLibrary/BuildingBrand/AddBuildingBrand';
import AddBuildingUom from '../OperationLibrary/BuildingUom/AddBuildingUom';
import { useGetBuildingPaymentMethodsQuery } from 'store/api/buildingPaymentMethod/buildingPaymentMethodApi';
import ExpenseFields from './ExpenseFields';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { totalSum } from 'views/utilities/NeedyFunction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 900 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const defaultValue = {
  date: moment(),
  paymentMethod: null,
  amount: '',
};

const AddOperationExpense = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [expenseHead, setExpenseHead] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [uom, setUom] = useState(null);

  // library open
  const [expenseHeadOpen, setExpenseHeadOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [uomOpen, setUomOpen] = useState(false);

  // library
  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetBuildingExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.buildingExpenseHeads || [];

  const { data: vendorData, isLoading: vendorLoading } =
    useGetBuildingVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.buildingVendors || [];

  const { data: brandData, isLoading: brandLoading } =
    useGetBuildingBrandsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allBrands = brandData?.buildingBrands || [];

  const { data: uomData, isLoading: uomLoading } = useGetBuildingUomQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allUom = uomData?.buildingUom || [];

  const { data: paymentMethodData, isLoading: paymentMethodLoading } =
    useGetBuildingPaymentMethodsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentMethods = paymentMethodData?.buildingPaymentMethods || [];
  // end library

  // hook form
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      buildingPayments: [defaultValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'buildingPayments',
  });

  const handleAppend = () => {
    append(defaultValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  const watchValue = useWatch({ control, name: 'buildingPayments' });
  const totalAmount = totalSum(watchValue || [], 'amount');

  const dispatch = useDispatch();

  const [createBuildingExpense] = useCreateBuildingExpenseMutation();

  const onSubmit = async (data) => {
    if (totalAmount > (data?.amount || 0)) {
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Paid Amount Greater than Amount',
        })
      );
    }
    const newData = {
      date: date,
      expenseHeadId: expenseHead?.id,
      vendorId: vendor?.id,
      brandId: brand?.id,
      uomId: uom?.id,
      quantity: data?.quantity,
      unitPrice: data?.unitPrice || 0,
      amount: data?.amount,
      paidAmount: totalAmount,
      remarks: data?.remarks || '',
      status:
        totalAmount === 0
          ? 'Due'
          : data?.amount === totalAmount
          ? 'Paid'
          : 'Partial',
      buildingPayments: data?.buildingPayments?.map((el) => ({
        date: el.date,
        paymentMethodId: el.paymentMethod?.id,
        paymentDetails: el.paymentDetails || '',
        amount: el.amount,
      })),
    };
    try {
      setLoading(true);
      const res = await createBuildingExpense({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
        reset();
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        setLoading(false);
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
            Add Investment
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}
        <AddBuildingExpenseHead
          open={expenseHeadOpen}
          handleClose={() => setExpenseHeadOpen(false)}
        />
        <AddBuildingVendor
          open={vendorOpen}
          handleClose={() => setVendorOpen(false)}
        />
        <AddBuildingBrand
          open={brandOpen}
          handleClose={() => setBrandOpen(false)}
        />
        <AddBuildingUom open={uomOpen} handleClose={() => setUomOpen(false)} />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={4.5}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  loading={vendorLoading}
                  value={vendor}
                  size="small"
                  fullWidth
                  options={allVendors}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setVendor(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Vendor" required />
                  )}
                />
                <Tooltip title="Add Vendor">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setVendorOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={4.5}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  loading={expenseHeadLoading}
                  value={expenseHead}
                  size="small"
                  fullWidth
                  options={allExpenseHeads}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setExpenseHead(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Expense Head" required />
                  )}
                />
                <Tooltip title="Add Head">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setExpenseHeadOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={3.5}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  loading={brandLoading}
                  value={brand}
                  size="small"
                  fullWidth
                  options={allBrands}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setBrand(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Brand" />
                  )}
                />
                <Tooltip title="Add Brand">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setBrandOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                loading={uomLoading}
                value={uom}
                size="small"
                fullWidth
                options={allUom}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setUom(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="UOM" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                required
                size="small"
                label="Quantity"
                type="number"
                inputProps={{ min: 0 }}
                {...register('quantity', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={2.2}>
              <TextField
                fullWidth
                required
                size="small"
                label="Unit Price"
                type="number"
                inputProps={{ min: 0 }}
                {...register('unitPrice', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={2.3}>
              <TextField
                fullWidth
                required
                size="small"
                label="Amount"
                type="number"
                inputProps={{ min: 0 }}
                {...register('amount', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Remarks"
                {...register('remarks')}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: 'center',
                  py: 1,
                  background: '#ede7f6',
                  color: '#5e35b1',
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                Payment Details &#40;{totalAmount}&#41;
              </Typography>
              {fields.map((el, index) => (
                <ExpenseFields
                  key={el.id}
                  field={el}
                  index={index}
                  control={control}
                  handleRemove={handleRemove}
                  register={register}
                  allPaymentMethods={allPaymentMethods}
                  paymentMethodLoading={paymentMethodLoading}
                />
              ))}
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip title="Add Row">
                  <IconButton color="primary" onClick={handleAppend}>
                    <IconSquareRoundedPlusFilled size={20} />
                  </IconButton>
                </Tooltip>
              </Box>
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
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddOperationExpense;
