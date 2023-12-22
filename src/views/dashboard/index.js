// material-ui
import Grid from '@mui/material/Grid';

// project imports

import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import data from 'assets/clients.json';
import { useCreateAllCustomerMutation } from 'store/api/customer/customerApi';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  // const mappedClient = data?.map((el, index) => ({
  //   customerId: (index + 1).toString().padStart(8, 'C-000000'),
  //   customerName: el.clientName,
  //   customerNameBn: el.clientNameBn,
  //   mobile: el.mobile,
  //   address: el.address,
  // }));
  // console.log(mappedClient.slice(200, 300));
  // const newData = mappedClient.slice(200, 300);
  // const dispatch = useDispatch();
  // const [createAllCustomer] = useCreateAllCustomerMutation();
  // const onSubmit = async (data) => {
  //   try {
  //     const res = await createAllCustomer({ data: newData }).unwrap();
  //     if (res.success) {
  //       dispatch(
  //         setToast({
  //           open: true,
  //           variant: 'success',
  //           message: res?.message,
  //         })
  //       );
  //     }
  //   } catch (err) {
  //     dispatch(
  //       setToast({
  //         open: true,
  //         variant: 'error',
  //         message: err?.data?.message || 'Something Went Wrong',
  //         errorMessages: err?.data?.errorMessages,
  //       })
  //     );
  //   }
  // };
  return (
    <Grid container spacing={gridSpacing}>
      {/* <Button onClick={onSubmit}>Add</Button> */}
    </Grid>
  );
};

export default Dashboard;
