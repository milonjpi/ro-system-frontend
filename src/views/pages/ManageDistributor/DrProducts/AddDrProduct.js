import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetUomQuery } from 'store/api/uom/uomApi';
import { useCreateDrProductMutation } from 'store/api/drProduct/drProductApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddDrProduct = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // library
  const { data: uomData } = useGetUomQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allUom = uomData?.uom || [];
  // end library

  const dispatch = useDispatch();

  const [createDrProduct] = useCreateDrProductMutation();

  const onSubmit = async (data) => {
    const newData = {
      label: data?.label,
      description: data?.description,
      uom: data?.uom,
      price: data?.price,
    };
    try {
      setLoading(true);
      const res = await createDrProduct({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
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
            Add Product
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
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                required
                label="Product Name"
                size="small"
                sx={{ mr: 2 }}
                {...register('label', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="uom-select-id">UOM</InputLabel>
                <Select
                  labelId="uom-select-id"
                  label="UOM"
                  defaultValue=""
                  {...register('uom', { required: true })}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {allUom?.map((el) => (
                    <MenuItem key={el.id} value={el.label}>
                      {el.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price"
                size="small"
                type="number"
                required
                InputProps={{ inputProps: { min: 1 } }}
                {...register('price', { required: true, valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Description"
                size="small"
                {...register('description')}
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
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddDrProduct;
