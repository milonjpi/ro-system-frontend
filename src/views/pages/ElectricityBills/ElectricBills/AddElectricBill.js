import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetSmsAccountsQuery } from 'store/api/meter/meterApi';
import { electricMonths, electricYears } from 'assets/data';
import { useCreateManyElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';
import ElectricBillField from './ElectricBillField';
import { useEffect } from 'react';
import { useMemo } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 850, lg: 950 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddElectricBill = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  // library
  const { data: meterData } = useGetSmsAccountsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = useMemo(() => meterData?.data || [], [meterData]);
  // end library

  const { control, register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      month: null,
      year: null,
      billDetails: [],
    },
  });

  const dispatch = useDispatch();

  const [createManyElectricityBill] = useCreateManyElectricityBillMutation();

  const onSubmit = async (data) => {
    const newData = data?.billDetails?.map((el) => ({
      date: el.date,
      meterId: el.meter?.id,
      month: month,
      year: year,
      previousReading: el.previousReading || 0,
      meterReading: el.meterReading || 0,
      unit: Math.max((el.meterReading || 0) - (el.previousReading || 0), 0),
      amount: el.amount,
      paidBy: el.paidBy,
      remarks: el.remarks || '',
      status: 'Paid',
    }));

    try {
      setLoading(true);
      const res = await createManyElectricityBill({ data: newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset();
        setYear(null);
        setMonth(null);
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

  useEffect(() => {
    if (allMeters.length) {
      reset({
        billDetails: allMeters.map((el) => ({
          date: null,
          meter: el,
          previousReading: el.electricityBills?.[0]?.meterReading || 0,
          meterReading: '',
          unit: 0,
          amount: '',
          paidBy: '',
        })),
      });
    }
  }, [allMeters, reset]);

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
            Add Electric Bill
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
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={year}
                size="small"
                fullWidth
                options={electricYears}
                onChange={(e, newValue) => setYear(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Year" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={month}
                size="small"
                fullWidth
                options={electricMonths}
                onChange={(e, newValue) => setMonth(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Month" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  p: 1,
                  background: '#ede7f6',
                  color: '#5e35b1',
                  textAlign: 'center',
                  borderRadius: 1,
                }}
              >
                Bill Details
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ overflow: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                {allMeters?.map((el, index) => (
                  <ElectricBillField
                    key={index}
                    field={el}
                    index={index}
                    control={control}
                    register={register}
                    setValue={setValue}
                    mb={allMeters?.length !== index + 1 && 2}
                  />
                ))}
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

export default AddElectricBill;
