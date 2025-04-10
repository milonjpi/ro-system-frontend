import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { Button } from '@mui/material';
import UpdatePaymentSource from './UpdatePaymentSource';
import { useDispatch } from 'react-redux';
import { useDeletePaymentSourceMutation } from 'store/api/paymentSource/paymentSourceApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const PaymentSourceRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deletePaymentSource] = useDeletePaymentSourceMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deletePaymentSource(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Payment Source Deleted Successfully',
          })
        );
      }
    } catch (err) {
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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.label}</StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 85 }}>
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
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        {/* popup item */}
        <UpdatePaymentSource
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Payment Source"
          handleDelete={handleDelete}
        />
        {/* end popup item */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PaymentSourceRow;
