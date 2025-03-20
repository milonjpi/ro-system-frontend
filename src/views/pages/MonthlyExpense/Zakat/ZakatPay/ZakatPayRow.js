import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { IconTrashXFilled } from '@tabler/icons-react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDeleteZakatMutation } from 'store/api/zakat/zakatApi';
import UpdateZakatPay from './UpdateZakatPay';

const ZakatPayRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteZakat] = useDeleteZakatMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteZakat(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Zakat Deleted Successfully',
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
      <StyledTableCellWithBorder>
        {data?.recipient?.fullName}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.remarks || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
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
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        {/* popup item */}
        <UpdateZakatPay
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Zakat Record"
          handleDelete={handleDelete}
        />
        {/* end popup item */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ZakatPayRow;
