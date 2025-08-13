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
import { Autocomplete } from '@mui/material';
import moment from 'moment';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useGetCaratsQuery } from 'store/api/carat/caratApi';
import { useGetJewelleryVendorsQuery } from 'store/api/jewelleryVendor/jewelleryVendorApi';
import { useUpdateJewelleryMutation } from 'store/api/jewellery/jewelleryApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateJewellery = ({ open, handleClose, preData, category }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.dop);
  const [jewelleryType, setJewelleryType] = useState(
    preData?.jewelleryType || null
  );
  const [carat, setCarat] = useState(preData?.carat || null);
  const [vendor, setVendor] = useState(preData?.vendor || null);
  const [weight, setWeight] = useState(preData?.weight);
  const [unitPrice, setUnitPrice] = useState(preData?.unitPrice);
  const [makingCharge, setMakingCharge] = useState(preData?.makingCharge);
  const [vat, setVat] = useState(preData?.vat);
  const [price, setPrice] = useState(preData?.price);

  // library
  const { data: jewelleryTypeData, isLoading: jewelleryTypeLoading } =
    useGetJewelleryTypesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleryTypes = jewelleryTypeData?.jewelleryTypes || [];

  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc', category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

  const { data: vendorData, isLoading: vendorLoading } =
    useGetJewelleryVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.jewelleryVendors || [];
  // end library

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: preData,
  });

  const dispatch = useDispatch();

  const [updateJewellery] = useUpdateJewelleryMutation();

  const onSubmit = async (data) => {
    const newData = {
      jewelleryTypeId: jewelleryType?.id,
      caratId: carat?.id,
      vendorId: vendor?.id,
      invoiceNo: data?.invoiceNo,
      dop: date,
      year: moment(date).format('YYYY'),
      month: moment(date).format('MMMM'),
      weight: data.weight,
      unitPrice: data.unitPrice,
      makingCharge: data.makingCharge,
      vat: data.vat,
      totalPrice: Math.round(
        data.weight * data.unitPrice + data.makingCharge + data.vat
      ),
      price: data.price,
      remarks: data.remarks || '',
    };

    try {
      setLoading(true);
      const res = await updateJewellery({
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
            EDIT {category} JEWELLERY
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
            <Grid item xs={12} md={3.5}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date of Purchase"
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
            <Grid item xs={12} md={5}>
              <Autocomplete
                loading={vendorLoading}
                value={vendor}
                size="small"
                fullWidth
                options={allVendors}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setVendor(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Vendor" required />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3.5}>
              <TextField
                fullWidth
                required
                label="Invoice No"
                size="small"
                {...register('invoiceNo', { required: true })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                loading={jewelleryTypeLoading}
                value={jewelleryType}
                size="small"
                fullWidth
                options={allJewelleryTypes}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setJewelleryType(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Jewellery Type" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                loading={caratLoading}
                value={carat}
                size="small"
                fullWidth
                options={allCarats}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setCarat(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select KDM" required />
                )}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Weight (gm)"
                type="number"
                size="small"
                inputProps={{ min: 0, step: '0.01' }}
                value={weight}
                {...register('weight', {
                  min: 0,
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setWeight(newValue);
                    setValue(
                      'price',
                      newValue * (Number(unitPrice) || 0) +
                        (Number(makingCharge) || 0) +
                        (Number(vat) || 0)
                    );
                    setPrice(
                      newValue * (Number(unitPrice) || 0) +
                        (Number(makingCharge) || 0) +
                        (Number(vat) || 0)
                    );
                  },
                })}
              />
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
                    setValue(
                      'price',
                      (Number(weight) || 0) * newValue +
                        (Number(makingCharge) || 0) +
                        (Number(vat) || 0)
                    );
                    setPrice(
                      (Number(weight) || 0) * newValue +
                        (Number(makingCharge) || 0) +
                        (Number(vat) || 0)
                    );
                  },
                })}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="Making Charge"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={makingCharge}
                {...register('makingCharge', {
                  min: 0,
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setMakingCharge(newValue);
                    setValue(
                      'price',
                      (Number(weight) || 0) * (Number(unitPrice) || 0) +
                        newValue +
                        (Number(vat) || 0)
                    );
                    setPrice(
                      (Number(weight) || 0) * (Number(unitPrice) || 0) +
                        newValue +
                        (Number(vat) || 0)
                    );
                  },
                })}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                required
                label="VAT"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={vat}
                {...register('vat', {
                  min: 0,
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setVat(newValue);
                    setValue(
                      'price',
                      (Number(weight) || 0) * (Number(unitPrice) || 0) +
                        (Number(makingCharge) || 0) +
                        newValue
                    );
                    setPrice(
                      (Number(weight) || 0) * (Number(unitPrice) || 0) +
                        (Number(makingCharge) || 0) +
                        newValue
                    );
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Price"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={price}
                {...register('price', {
                  min: 0,
                  required: true,
                  valueAsNumber: true,
                  onChange: (e) => {
                    const newValue = Number(e.target.value) || 0;
                    setPrice(newValue);
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateJewellery;
