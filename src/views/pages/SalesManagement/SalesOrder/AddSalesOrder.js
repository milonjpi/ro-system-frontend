import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import AddedProductRow from './AddedProductRow';
import AddSalesProduct from './AddSalesProduct';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { useCreateSalesOrderMutation } from 'store/api/salesOrder/salesOrderApi';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetCustomerGroupsQuery } from 'store/api/customerGroup/customerGroupApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500, md: 700 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddSalesOrder = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [orderDate, setOrderDate] = useState(moment());
  const [deliveryDate, setDeliveryDate] = useState(moment());
  const [products, setProducts] = useState([]);
  const [openProduct, setOpenProduct] = useState(false);

  // library
  const { data: groupData, isLoading: groupLoading } =
    useGetCustomerGroupsQuery(
      { limit: 100, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allCustomerGroups = groupData?.customerGroups || [];

  const customerQuery = {};
  customerQuery['limit'] = 1000;
  customerQuery['sortBy'] = 'customerName';
  customerQuery['sortOrder'] = 'asc';

  if (group) {
    customerQuery['groupId'] = group.id;
  }

  const { data: customerData } = useGetCustomersQuery(
    { ...customerQuery },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];
  // end library
  // table
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Product Details',
    },
    {
      title: 'Quantity',
      align: 'center',
    },
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  const dispatch = useDispatch();

  const [createSalesOrder] = useCreateSalesOrderMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const totalQty = totalSum(products, 'quantity');
    const mappedTotalPrice =
      products?.map((el) => ({
        totalPrice: el.product?.price * el.quantity,
      })) || [];
    const totalPrice = totalSum(mappedTotalPrice, 'totalPrice');
    const newData = {
      data: {
        date: orderDate,
        deliveryDate: deliveryDate,
        totalQty: totalQty,
        totalPrice: totalPrice,
        customerId: customer?.id,
        userId: '',
      },
      orderedProducts: products?.map((el) => ({
        productId: el.product?.id,
        quantity: el.quantity,
        unitPrice: el.product?.price,
        totalPrice: el.product?.price * el.quantity,
      })),
    };
    try {
      setLoading(true);
      const res = await createSalesOrder({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        setCustomer(null);
        setProducts([]);
        setOrderDate(moment());
        setDeliveryDate(moment());
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
  let sn = 1;
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
            New Order
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}
        <AddSalesProduct
          open={openProduct}
          handleClose={() => setOpenProduct(false)}
          products={products}
          setProducts={setProducts}
        />
        {/* end popup items */}
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                value={group}
                loading={groupLoading}
                size="small"
                fullWidth
                options={allCustomerGroups}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => {
                  setGroup(newValue);
                  setCustomer(null);
                }}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Group" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Autocomplete
                value={customer}
                size="small"
                fullWidth
                options={allCustomers}
                getOptionLabel={(option) => option.customerName}
                onChange={(e, newValue) => setCustomer(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Customer" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Order Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={orderDate}
                  onChange={(newValue) => {
                    setOrderDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Delivery Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={deliveryDate}
                  onChange={(newValue) => {
                    setDeliveryDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <StyledTableRow>
                      {tableHeads?.map((el, index) => (
                        <StyledTableCell key={index} align={el.align || 'left'}>
                          {el.title}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {products.length
                      ? products.map((el) => (
                          <AddedProductRow
                            key={el.product?.id}
                            sn={sn++}
                            data={el}
                            products={products}
                            setProducts={setProducts}
                          />
                        ))
                      : null}
                    <StyledTableRow>
                      <StyledTableCell colSpan={6} align="center">
                        <IconButton
                          color="primary"
                          onClick={() => setOpenProduct(true)}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                sx={{ py: 1 }}
                loading={loading}
                loadingPosition="start"
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                type="submit"
              >
                <span style={{ lineHeight: 1 }}>Place Order</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddSalesOrder;
