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
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { Autocomplete, Button, Tooltip } from '@mui/material';
import { useUpdateBuildingInvestmentMutation } from 'store/api/buildingInvestment/buildingInvestmentApi';
import { useGetBuildingInvestmentSourcesQuery } from 'store/api/buildingInvestmentSource/buildingInvestmentSourceApi';
import AddBuildingInvestmentSource from '../OperationLibrary/BuildingInvestmentSource/AddBuildingInvestmentSource';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const UpdateOperationInvestment = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(preData?.date);
  const [source, setSource] = useState(preData?.investmentSource || null);

  // library open
  const [sourceOpen, setSourceOpen] = useState(false);

  // library
  const { data: investmentSourceData, isLoading: investmentSourceLoading } =
    useGetBuildingInvestmentSourcesQuery(
      { limit: 100, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allInvestmentSource =
    investmentSourceData?.buildingInvestmentSources || [];
  // end library

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  const dispatch = useDispatch();

  const [updateBuildingInvestment] = useUpdateBuildingInvestmentMutation();

  const onSubmit = async (data) => {
    const newData = {
      date: date,
      investmentSourceId: source?.id,
      amount: data?.amount,
      investmentDetails: data?.investmentDetails,
      remarks: data?.remarks || '',
    };
    try {
      setLoading(true);
      const res = await updateBuildingInvestment({
        id: preData?.id,
        body: newData,
      }).unwrap();

      if (res.success) {
        handleClose();
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
            Edit Investment
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}
        <AddBuildingInvestmentSource
          open={sourceOpen}
          handleClose={() => setSourceOpen(false)}
        />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  loading={investmentSourceLoading}
                  value={source}
                  size="small"
                  fullWidth
                  options={allInvestmentSource}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => setSource(newValue)}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField {...params} label="Investment Source" required />
                  )}
                />
                <Tooltip title="Add Source">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setSourceOpen(true)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                size="small"
                label="Amount"
                type="number"
                inputProps={{ min: 0 }}
                {...register('amount', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                size="small"
                label="Investment Details"
                {...register('investmentDetails', { required: true })}
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

export default UpdateOperationInvestment;
