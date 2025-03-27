import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { Button, TableRow } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteRecipientMutation } from 'store/api/recipient/recipientApi';
import { setToast } from 'store/toastSlice';
import { IconEdit } from '@tabler/icons';
import { IconTrashXFilled } from '@tabler/icons-react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import UpdateRecipient from './UpdateRecipient';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';

const RecipientRow = ({ sn, data }) => {
  const zakatDetails = data?.zakats || [];

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteRecipient] = useDeleteRecipientMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteRecipient(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Recipient Deleted Successfully',
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
    <TableRow>
      <StyledTableCellWithBorder align="center" sx={{ width: 80 }}>
        {convertToBanglaNumber(sn)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.fullName}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.mobile ? convertToBanglaNumber(data?.mobile) : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 0.5 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={14} />
        </Button>
        <Button
          disabled={zakatDetails.length > 0 ? true : false}
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        {/* popup item */}
        <UpdateRecipient
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Recipient"
          handleDelete={handleDelete}
        />
        {/* end popup item */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default RecipientRow;
