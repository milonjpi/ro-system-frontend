import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetEquipmentsQuery } from 'store/api/equipment/equipmentApi';
import { useUpdateEquipmentInMutation } from 'store/api/equipmentIn/equipmentInApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 450, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateItemsIn = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date);
  const [equipment, setEquipment] = useState(preData?.equipment);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: equipmentData } = useGetEquipmentsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc', isAsset: false },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipments = equipmentData?.equipments || [];
  // end library

  const dispatch = useDispatch();

  const [updateEquipmentIn] = useUpdateEquipmentInMutation();
  const onSubmit = async (data) => {
    const newData = {
      equipmentId: equipment?.id,
      date: date,
      quantity: data?.quantity,
      unitPrice: data?.unitPrice,
      totalPrice: data?.totalPrice,
      remarks: data?.remarks || '',
    };
    try {
      setLoading(true);
      const res = await updateEquipmentIn({
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
            Edit Item In
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
                      required
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={equipment}
                size="small"
                options={allEquipments}
                fullWidth
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setEquipment(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a Equipment"
                    variant="outlined"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Quantity"
                fullWidth
                size="small"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
                required
                {...register('quantity', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Unit Price"
                fullWidth
                size="small"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
                required
                {...register('unitPrice', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Total Price"
                fullWidth
                size="small"
                type="number"
                inputProps={{
                  step: '0.01',
                }}
                required
                {...register('totalPrice', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks"
                fullWidth
                size="small"
                {...register('remarks')}
              />
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateItemsIn;
