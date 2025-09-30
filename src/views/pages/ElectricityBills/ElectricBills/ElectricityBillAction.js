import { Button } from '@mui/material';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import React from 'react';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import UpdateElectricBill from './UpdateElectricBill';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';
import { setToast } from 'store/toastSlice';

const ElectricityBillAction = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteElectricityBill] = useDeleteElectricityBillMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteElectricityBill(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
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
    <StyledTableCellWithBorder align="center" sx={{ minWidth: 85 }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ minWidth: 0, mr: 0.5 }}
        onClick={() => setOpen(true)}
      >
        <IconEdit size={14} />
      </Button>
      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ minWidth: 0 }}
        onClick={() => setDialog(true)}
      >
        <IconTrashXFilled size={14} />
      </Button>

      <UpdateElectricBill
        open={open}
        preData={data}
        handleClose={() => setOpen(false)}
      />
      <ConfirmDialog
        open={dialog}
        setOpen={setDialog}
        content="Delete Electric Bill"
        handleDelete={handleDelete}
      />
    </StyledTableCellWithBorder>
  );
};

export default ElectricityBillAction;
