import { TableRow, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteBuildingExpenseMutation } from 'store/api/buildingExpense/buildingExpenseApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import ShowStatus from 'ui-component/ShowStatus';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import UpdateOperationExpense from './UpdateOperationExpense';
import { IconLayoutDashboard } from '@tabler/icons-react';
import ViewOperationExpense from './ViewOperationExpense';

const OperationExpenseRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const [deleteBuildingExpense] = useDeleteBuildingExpenseMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteBuildingExpense(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Expense Deleted Successfully',
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
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendor?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.expenseHead?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.quantity}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.unitPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.remarks || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        <ShowStatus status={data?.status} />
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        <Tooltip title="Quick View">
          <Button
            variant="contained"
            sx={{ minWidth: 0 }}
            color="secondary"
            size="small"
            onClick={() => setView(true)}
          >
            <IconLayoutDashboard size={14} />
          </Button>
        </Tooltip>
        <ViewOperationExpense
          open={view}
          handleClose={() => setView(false)}
          data={data}
        />
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center" sx={{ minWidth: 85 }}>
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
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>

        <UpdateOperationExpense
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />

        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Expense"
          handleDelete={handleDelete}
        />
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default OperationExpenseRow;
