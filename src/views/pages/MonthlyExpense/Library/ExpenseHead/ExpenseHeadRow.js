import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit, IconRotateClockwise, IconTrashXFilled } from '@tabler/icons-react';
import { Button } from '@mui/material';
import UpdateExpenseHead from './UpdateExpenseHead';
import { useDispatch } from 'react-redux';
import { useUpdateMonthlyExpenseHeadMutation } from 'store/api/monthlyExpenseHead/monthlyExpenseHeadApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const ExpenseHeadRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
    const [reactive, setReactive] = useState(false);

  const dispatch = useDispatch();

  const [updateMonthlyExpenseHead] = useUpdateMonthlyExpenseHeadMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await updateMonthlyExpenseHead({
        id: data?.id,
        body: { isActive: false },
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Head Inactivated Successfully',
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

  const handleReactive = async () => {
    setReactive(false);
    try {
      const res = await updateMonthlyExpenseHead({
        id: data?.id,
        body: { isActive: true },
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Head Activated Successfully',
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
      {data?.isActive ? (
        <StyledTableCell align="center" sx={{ minWidth: 85 }}>
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
            disabled={!data?.isActive}
            color="error"
            variant="contained"
            size="small"
            sx={{ minWidth: 0 }}
            onClick={() => setDialog(true)}
          >
            <IconTrashXFilled size={14} />
          </Button>
          {/* popup item */}
          <UpdateExpenseHead
            open={open}
            preData={data}
            handleClose={() => setOpen(false)}
          />
          <ConfirmDialog
            open={dialog}
            setOpen={setDialog}
            content="Inactive Expense Head"
            handleDelete={handleDelete}
          />
          {/* end popup item */}
        </StyledTableCell>
      ) : (
        <StyledTableCell align="center">
          <Button
            color="primary"
            variant="contained"
            size="small"
            sx={{ minWidth: 0 }}
            onClick={() => setReactive(true)}
          >
            <IconRotateClockwise size={14} />
          </Button>
          {/* popup item */}
          <ConfirmDialog
            open={reactive}
            setOpen={setReactive}
            content="Reactive Expense Head"
            handleDelete={handleReactive}
          />
          {/* end popup item */}
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default ExpenseHeadRow;
