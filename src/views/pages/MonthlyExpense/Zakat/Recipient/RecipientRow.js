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

const RecipientRow = ({ sn, data }) => {
  const zakatDetails = data?.zakats || [];
  const rowSpan = zakatDetails.length || 1;

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
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.fullName}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.mobile || 'n/a'}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.address || 'n/a'}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {zakatDetails.length > 0 ? (
          <>
            <StyledTableCellWithBorder align="center">
              {zakatDetails[0].year}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {zakatDetails[0].amount}
            </StyledTableCellWithBorder>
          </>
        ) : (
          <StyledTableCellWithBorder colSpan={2} align="center">
            No History
          </StyledTableCellWithBorder>
        )}

        {/* Totals and Actions */}
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
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

      {/* Remaining Income Details Rows */}
      {zakatDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder align="center">
            {el.year}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default RecipientRow;
