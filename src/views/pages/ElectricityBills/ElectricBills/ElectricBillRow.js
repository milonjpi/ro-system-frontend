import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconTrashXFilled } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';
import { setToast } from 'store/toastSlice';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import UpdateElectricBill from './UpdateElectricBill';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import moment from 'moment';
import { TableRow } from '@mui/material';

const ElectricBillRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteElectricityBill] = useDeleteElectricityBillMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteElectricityBill(data?.id).unwrap();
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
        {data?.date ? moment(data?.date).format('DD/MM/YYYY') : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder sx={{ minWidth: 150 }}>
        {data?.meter?.label +
          (data?.meter?.smsAccount ? ', ' + data?.meter?.smsAccount : '')}
        <br />
        {data?.meter?.location || 'N/A'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.meterReading}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.unit || 0}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.netBill}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.serviceCharge || 0}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.paidBy}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center" sx={{ minWidth: 95 }}>
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
        <UpdateElectricBill
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Electric Bill"
          handleDelete={handleDelete}
        />
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ElectricBillRow;
