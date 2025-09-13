import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useDeleteExpenseMutation } from 'store/api/expense/expenseApi';
import UpdateExpense from './UpdateExpense';
import { Button, TableRow } from '@mui/material';

const ExpenseRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteExpense(data?.id).unwrap();
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
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendor?.vendorName || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.expenseHead?.label}
      </StyledTableCellWithBorder>

      <StyledTableCellWithBorder>
        {data?.expenseSubHead?.label || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder sx={{ maxWidth: 200 }}>
        {(data?.expenseDetails
          ? data?.expenseDetails + (data?.remarks ? ', ' : '')
          : '') + (data?.remarks || '') || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
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

        {/* popup items */}
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Expense"
          handleDelete={handleDelete}
        />
        <UpdateExpense
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        {/* end popup items */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ExpenseRow;
