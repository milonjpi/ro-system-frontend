import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useGetProductsQuery } from 'store/api/product/productApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddSalesProduct = ({ open, handleClose, products, setProducts }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // library
  const { data: productData } = useGetProductsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allProducts = productData?.products || [];
  // end library

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const isExist = products?.find((el) => el.product?.id === product?.id);
    if (isExist) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: `${product?.label} already Added`,
        })
      );
    } else {
      setProducts([...products, { product, quantity }]);
      handleClose();
      setProduct(null);
      setQuantity(1);
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
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Autocomplete
                value={product}
                size="small"
                fullWidth
                options={allProducts}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setProduct(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Product" required />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
                required
                label="Quantity"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                size="small"
                color="primary"
                startIcon={<AddCircleIcon />}
                variant="contained"
                type="submit"
              >
                Add to order List
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddSalesProduct;
