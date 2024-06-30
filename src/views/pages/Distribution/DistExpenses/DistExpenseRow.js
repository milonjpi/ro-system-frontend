import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateDistExpense from './UpdateDistExpense';
import { useDeleteDistExpenseMutation } from 'store/api/distExpense/distExpenseApi';

const DistExpenseRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteDistExpense] = useDeleteDistExpenseMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteDistExpense(data?.id).unwrap();
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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.expenseHead?.label}</StyledTableCell>
      <StyledTableCell>{data?.vendor || 'n/a'}</StyledTableCell>
      <StyledTableCell>{data?.remarks ? data?.remarks : 'n/a'}</StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setDialog(true)}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>
        {/* popup items */}
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Expense"
          handleDelete={handleDelete}
        />
        <UpdateDistExpense
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default DistExpenseRow;
