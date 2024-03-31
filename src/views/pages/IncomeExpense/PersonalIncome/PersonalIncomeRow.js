import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDispatch } from 'react-redux';
import { useDeleteIncomeExpenseMutation } from 'store/api/incomeExpense/incomeExpenseApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import UpdatePersonalIncome from './UpdatePersonalIncome';

const PersonalIncomeRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteIncomeExpense] = useDeleteIncomeExpenseMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteIncomeExpense(data?.id).unwrap();
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
      <StyledTableCell>{data?.category?.label}</StyledTableCell>
      <StyledTableCell>{data?.incomeExpenseHead?.label}</StyledTableCell>
      <StyledTableCell>{data?.modeOfPayment?.label}</StyledTableCell>
      <StyledTableCell>{data?.remarks}</StyledTableCell>
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

        <UpdatePersonalIncome
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Income"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PersonalIncomeRow;
