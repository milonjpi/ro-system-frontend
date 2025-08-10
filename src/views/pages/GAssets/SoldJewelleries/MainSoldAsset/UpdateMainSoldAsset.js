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
import { useGetJewelleryVendorsQuery } from 'store/api/jewelleryVendor/jewelleryVendorApi';
import { useGetJewelleriesQuery } from 'store/api/jewellery/jewelleryApi';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useUpdateSoldJewelleryMutation } from 'store/api/soldJewellery/soldJewelleryApi';

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

const UpdateMainSoldAsset = ({ open, handleClose, category, preData }) => {
  const [loading, setLoading] = useState(false);
  const [soldDate, setSoldDate] = useState(preData?.soldDate);
  const [soldType, setSoldType] = useState(preData?.soldType || null);
  const [vendor, setVendor] = useState(preData?.vendor || null);
  const [jewelleryType, setJewelleryType] = useState(
    preData?.jewellery?.jewelleryType || null
  );
  const [jewellery, setJewellery] = useState(preData?.jewellery || null);

  // library
  const { data: vendorData, isLoading: vendorLoading } =
    useGetJewelleryVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.jewelleryVendors || [];

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

  let allJewelleries = jewelleryData?.jewelleries || [];
  if (preData?.jewellery?.jewelleryTypeId === jewelleryType?.id) {
    allJewelleries = [...allJewelleries, { ...preData.jewellery }];
  }
  // end library

  // hook form
  const { register, handleSubmit } = useForm({ defaultValues: preData });
  // end hook form

  const dispatch = useDispatch();

  const [updateSoldJewellery] = useUpdateSoldJewelleryMutation();

  const onSubmit = async (data) => {
    const newData = {
      soldType,
      jewelleryId: jewellery?.id,
      vendorId: vendor?.id,
      soldDate,
      year: moment(soldDate).format('YYYY'),
      month: moment(soldDate).format('MMMM'),
      percent: data?.percent?.toString(),
      weight: jewellery?.weight,
      price: data?.price,
      invoiceNo: data?.invoiceNo,
      remarks: data?.remarks || '',
    };

    try {
      setLoading(true);
      const res = await updateSoldJewellery({
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
            EDIT SALE/EXCHANGE {category} JEWELLERY
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
            <Grid item xs={12} md={6}>
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
                  <TextField {...params} label="Select Vendor" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Invoice No"
                size="small"
                {...register('invoiceNo', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Deduction (%)"
                size="small"
                type="number"
                inputProps={{ min: 0, step: '0.01' }}
                {...register('percent', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Price"
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                {...register('price', {
                  required: true,
                  valueAsNumber: true,
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateMainSoldAsset;
