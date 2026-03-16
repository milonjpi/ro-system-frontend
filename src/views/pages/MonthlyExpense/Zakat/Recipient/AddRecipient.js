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
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useCreateRecipientMutation } from 'store/api/recipient/recipientApi';
import { useGetRecipientGroupsQuery } from 'store/api/recipientGroup/recipientGroupApi';
import { Autocomplete } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddRecipient = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [recipientGroup, setRecipientGroup] = useState(null);

  // library
  const { data: groupData, isLoading: groupLoading } =
    useGetRecipientGroupsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allRecipientGroups = groupData?.recipientGroups || [];
  // end library

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const [createRecipient] = useCreateRecipientMutation();

  const onSubmit = async (data) => {
    const newData = {
      fullName: data?.fullName,
      fullNameEn: data?.fullNameEn,
      recipientGroupId: recipientGroup?.id,
      mobile: data?.mobile || '',
      address: data?.address || '',
    };

    try {
      setLoading(true);
      const res = await createRecipient({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setRecipientGroup(null);
        reset();
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
            গ্রহীতা যোগ করুন
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
              <TextField
                fullWidth
                required
                label="গ্রহীতার নাম"
                size="small"
                {...register('fullName', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="গ্রহীতার নাম (EN)"
                size="small"
                {...register('fullNameEn')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                loading={groupLoading}
                value={recipientGroup}
                size="small"
                fullWidth
                options={allRecipientGroups}
                getOptionLabel={(option) =>
                  option.labelBn + ' => ' + option.label
                }
                onChange={(e, newValue) => setRecipientGroup(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="গ্রহীতা গ্রুপ" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="মোবাইল নং"
                size="small"
                {...register('mobile')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ঠিকানা"
                size="small"
                {...register('address')}
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
                সাবমিট
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddRecipient;
