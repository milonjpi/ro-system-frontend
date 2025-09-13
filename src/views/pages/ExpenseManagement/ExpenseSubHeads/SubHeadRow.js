import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDeleteExpenseSubHeadMutation } from 'store/api/expenseSubHead/expenseSubHeadApi';
import UpdateSubHead from './UpdateSubHead';

const SubHeadRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteExpenseSubHead] = useDeleteExpenseSubHeadMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteExpenseSubHead(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Details Deleted Successfully',
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

  const docsCount = data?._count?.expenses || 0;

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.expenseHead?.label}</StyledTableCell>
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
          disabled={docsCount > 0}
          variant="contained"
          color="error"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>

        {/* pop up items */}
        <UpdateSubHead
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Expense Details"
          handleDelete={handleDelete}
        />
        {/* end pop up items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default SubHeadRow;
