import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useDriversQuery } from 'store/api/driver/driverApi';
import { useVehiclesQuery } from 'store/api/vehicle/vehicleApi';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { totalSum } from 'views/utilities/NeedyFunction';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useCreateCustomerMutation } from 'store/api/customer/customerApi';
import { useGetCustomerGroupsQuery } from 'store/api/customerGroup/customerGroupApi';
import ControlledAutoComplete from 'ui-component/form-components/ControlledAutoComplete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddExpense = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment());
  const [vehicle, setVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [workshopType, setWorkshopType] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const getExpenses = useWatch({ control, name: 'expenses' });
  const totalExpenses = totalSum(getExpenses || [], 'amount');

  // library
  const { data: vehicleData } = useVehiclesQuery(
    { limit: 100, isActive: true, sortBy: 'vehicleId', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicles = vehicleData?.vehicles || [];

  const { data: driverData } = useDriversQuery(
    { limit: 100, isActive: true },
    { refetchOnMountOrArgChange: true }
  );
  const allDrivers = driverData?.drivers || [];

  // end library

  const dispatch = useDispatch();

  const [addMaintenance] = useAddMaintenanceMutation();

  const onSubmit = async (data) => {
    if (!date) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Please Select Date',
        })
      );
      return 1;
    }
    if (!vehicle) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Please Select Vehicle',
        })
      );
      return 1;
    }

    const newData = {
      data: {
        date,
        vehicleId: vehicle?.id,
        driverId: driver?.id,
        odoMeter: data?.odoMeter,
        workshopType: data?.workshopType,
        maintenanceType: data?.maintenanceType,
        workshopDetails: data?.workshopDetails,
        serviceCharge: data?.serviceCharge,
        remarks: data?.remarks,
      },
      equipmentUses:
        workshopType === 'InHouse'
          ? data?.equipmentUses?.map((el) => ({
              date,
              vehicleId: vehicle?.id,
              equipmentTitleId: el.equipmentTitle?.id,
              quantity: el.quantity,
              unitPrice: el.unitPrice,
              totalPrice: Number.isInteger(el.unitPrice * el.quantity)
                ? el.unitPrice * el.quantity
                : Number((el.unitPrice * el.quantity).toFixed(2)),
              remarks: el.remarks,
            }))
          : [],
      externalEquipmentUses:
        workshopType === 'External'
          ? data?.externalEquipmentUses?.map((el) => ({
              date,
              vehicleId: vehicle?.id,
              equipmentTitleId: el.equipmentTitle?.id,
              quantity: el.quantity,
              unitPrice: Number.isInteger(el.totalPrice / el.quantity)
                ? el.totalPrice / el.quantity
                : Number((el.totalPrice / el.quantity).toFixed(2)),
              totalPrice: el.totalPrice,
              remarks: el.remarks,
            }))
          : [],
    };
    try {
      setLoading(true);
      const res = await addMaintenance({ ...newData }).unwrap();
      if (res.success) {
        setLoading(false);
        reset();
        setDate(moment());
        setVehicle(null);
        setDriver(null);
        setWorkshopType('');
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
  const submitAndExit = async (data) => {
    if (!date) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Please Select Date',
        })
      );
      return 1;
    }
    if (!vehicle) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Please Select Vehicle',
        })
      );
      return 1;
    }

    const newData = {
      data: {
        date,
        vehicleId: vehicle?.id,
        driverId: driver?.id,
        odoMeter: data?.odoMeter,
        workshopType: data?.workshopType,
        maintenanceType: data?.maintenanceType,
        workshopDetails: data?.workshopDetails,
        serviceCharge: data?.serviceCharge,
        remarks: data?.remarks,
      },
      equipmentUses:
        workshopType === 'InHouse'
          ? data?.equipmentUses?.map((el) => ({
              date,
              vehicleId: vehicle?.id,
              equipmentTitleId: el.equipmentTitle?.id,
              quantity: el.quantity,
              unitPrice: el.unitPrice,
              totalPrice: Number.isInteger(el.unitPrice * el.quantity)
                ? el.unitPrice * el.quantity
                : Number((el.unitPrice * el.quantity).toFixed(2)),
              remarks: el.remarks,
            }))
          : [],
      externalEquipmentUses:
        workshopType === 'External'
          ? data?.externalEquipmentUses?.map((el) => ({
              date,
              vehicleId: vehicle?.id,
              equipmentTitleId: el.equipmentTitle?.id,
              quantity: el.quantity,
              unitPrice: Number.isInteger(el.totalPrice / el.quantity)
                ? el.totalPrice / el.quantity
                : Number((el.totalPrice / el.quantity).toFixed(2)),
              totalPrice: el.totalPrice,
              remarks: el.remarks,
            }))
          : [],
    };

    try {
      setLoading(true);
      const res = await addMaintenance({ ...newData }).unwrap();
      if (res.success) {
        setLoading(false);
        reset();
        setDate(moment());
        setVehicle(null);
        setDriver(null);
        setWorkshopType('');
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        navigate('/pages/maintenance/repair-maintenance');
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
            Add Client
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
        <Box component="form" autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontWeight: 700, pb: 2 }}>
                Maintenance Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Maintenance Date"
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
                          required
                          size="small"
                          autoComplete="off"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <ControlledAutoComplete
                    label="Select Vehicle"
                    required
                    value={vehicle}
                    options={allVehicles}
                    getOptionLabel={(option) =>
                      option.vehicleId + ' - ' + option.regNo
                    }
                    isOptionEqualToValue={(item, value) => item.id === value.id}
                    onChange={(e, newValue) => setVehicle(newValue)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledAutoComplete
                    label="Select Driver"
                    value={driver}
                    options={allDrivers}
                    getOptionLabel={(option) =>
                      option.driverId + ', ' + option.name
                    }
                    isOptionEqualToValue={(item, value) => item.id === value.id}
                    onChange={(e, newValue) => setDriver(newValue)}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth size="small" required>
                    <InputLabel id="work-shop-type-label">
                      Workshop Type
                    </InputLabel>
                    <Select
                      value={workshopType}
                      labelId="work-shop-type-label"
                      label="Workshop Type"
                      {...register('workshopType', {
                        required: true,
                        onChange: (e) => setWorkshopType(e.target.value),
                      })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="InHouse">In House</MenuItem>
                      <MenuItem value="External">External</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth size="small" required>
                    <InputLabel id="maintenance-type-label">
                      Maintenance Type
                    </InputLabel>
                    <Select
                      labelId="maintenance-type-label"
                      label="Maintenance Type"
                      defaultValue=""
                      {...register('maintenanceType')}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Scheduled">Scheduled</MenuItem>
                      <MenuItem value="Unscheduled">Unscheduled</MenuItem>
                      <MenuItem value="Accidental">Accidental</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    required
                    label="Odo Meter"
                    size="small"
                    type="number"
                    {...register('odoMeter', {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Service Charge"
                    size="small"
                    type="number"
                    {...register('serviceCharge', {
                      valueAsNumber: true,
                    })}
                  />
                </Grid>
                {workshopType === 'External' ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Workshop Details"
                      size="small"
                      {...register('workshopDetails', { required: true })}
                    />
                  </Grid>
                ) : null}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Remarks"
                    multiline
                    rows={2}
                    size="small"
                    {...register('remarks')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 700, pb: 2 }}>
                  Equipment Uses{' '}
                  {workshopType === 'InHouse' ? (
                    <span style={{ fontSize: 10 }}>&#40;In House&#41;</span>
                  ) : workshopType === 'External' ? (
                    <span style={{ fontSize: 10 }}>&#40;External&#41;</span>
                  ) : (
                    <span style={{ color: 'red', fontSize: 10 }}>
                      &#40;Please Select Workshop Type&#41;
                    </span>
                  )}
                </Typography>
                <Typography sx={{ fontWeight: 700, pb: 2 }}>
                  Total: {totalExpenses}
                </Typography>
              </Box>
              {workshopType === 'InHouse' ? (
                <SelectInHouseEquipment
                  control={control}
                  register={register}
                  setValue={setValue}
                />
              ) : workshopType === 'External' ? (
                <SelectExternalEquipment
                  control={control}
                  register={register}
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                size="small"
                color="primary"
                sx={{ mr: 2 }}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </LoadingButton>
              <LoadingButton
                size="small"
                color="error"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit(submitAndExit)}
              >
                Submit and Exit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddExpense;
