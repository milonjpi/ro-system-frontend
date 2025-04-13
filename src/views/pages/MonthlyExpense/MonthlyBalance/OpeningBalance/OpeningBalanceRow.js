import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { Button, TableRow } from '@mui/material';
import UpdateOpeningBalance from './UpdateOpeningBalance';
import { useDispatch } from 'react-redux';
import { useDeleteOpeningBalanceMutation } from 'store/api/openingBalance/openingBalanceApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const OpeningBalanceRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteOpeningBalance] = useDeleteOpeningBalanceMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteOpeningBalance(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Opening Balance Deleted Successfully',
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
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.remarks || 'n/a'}
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
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        {/* popup item */}
        <UpdateOpeningBalance
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Opening Balance"
          handleDelete={handleDelete}
        />
        {/* end popup item */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default OpeningBalanceRow;
