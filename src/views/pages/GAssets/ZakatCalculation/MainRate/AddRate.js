import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetCaratsQuery } from 'store/api/carat/caratApi';
import { useCreateJewelleryRateMutation } from 'store/api/jewelleryRate/jewelleryRateApi';
import moment from 'moment';
import { Autocomplete } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 500 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddRate = ({ open, handleClose, category }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [carat, setCarat] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc', category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

  // end library

  const dispatch = useDispatch();

  const [createJewelleryRate] = useCreateJewelleryRateMutation();

  const onSubmit = async (data) => {
    const newData = {
      date: moment(date).format('YYYY-MM-DD'),
      caratId: carat?.id,
      price: data?.price || 0,
    };

    try {
      setLoading(true);
      const res = await createJewelleryRate({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setDate(moment());
        setCarat(null);
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
            ADD {category} RATE
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Price/gm (TK)"
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                {...register('price', {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
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

export default AddRate;
