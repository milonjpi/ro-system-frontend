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
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { Autocomplete } from '@mui/material';
import { useGetJewelleriesQuery } from 'store/api/jewellery/jewelleryApi';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useCreateSoldJewelleryMutation } from 'store/api/soldJewellery/soldJewelleryApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 550, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddMainSoldAsset = ({ open, handleClose, category }) => {
  const [loading, setLoading] = useState(false);
  const [soldDate, setSoldDate] = useState(moment());
  const [soldType, setSoldType] = useState(null);
  const [jewelleryType, setJewelleryType] = useState(null);
  const [jewellery, setJewellery] = useState(null);
  const [unitPrice, setUnitPrice] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [price, setPrice] = useState(0);

  // library
  const { data: jewelleryTypeData, isLoading: jewelleryTypeLoading } =
    useGetJewelleryTypesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleryTypes = jewelleryTypeData?.jewelleryTypes || [];

  // jewellery
  const jewQuery = {};

  jewQuery['limit'] = 1000;
  jewQuery['page'] = 0;
  jewQuery['sortBy'] = 'dop';
  jewQuery['sortOrder'] = 'desc';
  jewQuery['isSold'] = false;
  jewQuery['isExchanged'] = false;
  jewQuery['category'] = category;
  jewQuery['jewelleryTypeId'] = jewelleryType?.id || '123';

  const { data: jewelleryData, isLoading: jewelleryLoading } =
    useGetJewelleriesQuery(
      { ...jewQuery },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleries = jewelleryData?.jewelleries || [];
  // end library

  // hook form
  const { register, handleSubmit, setValue, reset } = useForm();
  // end hook form

  const dispatch = useDispatch();

  const [createSoldJewellery] = useCreateSoldJewelleryMutation();

  const onSubmit = async (data) => {
    const newData = {
      soldType,
      jewelleryId: jewellery?.id,
      soldDate,
      year: moment(soldDate).format('YYYY'),
      month: moment(soldDate).format('MMMM'),
      percent: data?.percent?.toString(),
      weight: jewellery.weight,
      unitPrice: data?.unitPrice,
      totalPrice: Math.round(
        (Number(jewellery?.weight) || 0) * (Number(unitPrice) || 0)
      ),
      deduction: Math.round(
        (Number(jewellery?.weight) || 0) *
          (Number(unitPrice) || 0) *
          ((Number(deduction) || 0) / 100)
      ),
      price: data?.price,
      remarks: data?.remarks || '',
    };

    try {
      setLoading(true);
      const res = await createSoldJewellery({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setSoldDate(moment());
        setSoldType(null);
        setJewelleryType(null);
        setJewellery(null);
        setUnitPrice(0);
        setDeduction(0);
        setPrice(0);
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
            SALE/EXCHANGE {category} JEWELLERY
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
                  label="Sold Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={soldDate}
                  onChange={(newValue) => {
                    setSoldDate(newValue);
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
                value={soldType}
                size="small"
                fullWidth
                options={['SALE', 'EXCHANGE']}
                onChange={(e, newValue) => setSoldType(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Sale / Exchange" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                loading={jewelleryTypeLoading}
                value={jewelleryType}
                size="small"
                fullWidth
                options={allJewelleryTypes}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setJewelleryType(newValue);
                  setJewellery(null);
                }}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Jewellery Type" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Autocomplete
                loading={jewelleryLoading}
                value={jewellery}
                size="small"
                fullWidth
                options={allJewelleries}
                getOptionLabel={(option) =>
                  option.vendor?.label +
                  `(I: ${option.invoiceNo})=> KDM: ` +
                  option?.carat?.label +
                  ', ' +
                  option.weight +
                  ' gm, ' +
                  option.price +
                  ' ৳'
                }
                onChange={(e, newValue) => setJewellery(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Jewellery" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid #676767', borderRadius: 1, p: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      Weight:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {jewellery?.weight}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      Unit Price:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {jewellery?.unitPrice}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      Raw Price:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {Math.round(
                          (jewellery?.weight || 0) * (jewellery?.unitPrice || 0)
                        )}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      Making Charge:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {jewellery?.makingCharge}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      VAT:{' '}
                      <span style={{ fontWeight: 700 }}>{jewellery?.vat}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontSize: 11 }}>
                      Total Price:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {jewellery?.price}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Unit Price"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={unitPrice}
                {...register('unitPrice', {
                  min: 0,
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setUnitPrice(newValue);
                    const newPrice = Math.round(
                      (Number(jewellery?.weight) || 0) * newValue -
                        (Number(jewellery?.weight) || 0) *
                          newValue *
                          ((Number(deduction) || 0) / 100)
                    );
                    setValue('price', newPrice);
                    setPrice(newPrice);
                  },
                })}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Total Price"
                size="small"
                InputProps={{ readOnly: true }}
                value={Math.round(
                  (Number(jewellery?.weight) || 0) * (Number(unitPrice) || 0)
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Deduction (%)"
                size="small"
                type="number"
                inputProps={{ min: 0, step: '0.01' }}
                value={deduction}
                {...register('percent', {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setDeduction(newValue);
                    const newPrice = Math.round(
                      (Number(jewellery?.weight) || 0) *
                        (Number(unitPrice) || 0) -
                        (Number(jewellery?.weight) || 0) *
                          (Number(unitPrice) || 0) *
                          (newValue / 100)
                    );
                    setValue('price', newPrice);
                    setPrice(newPrice);
                  },
                })}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Sale/Exchange Price"
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                value={price}
                {...register('price', {
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setPrice(newValue);
                  },
                })}
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

export default AddMainSoldAsset;
