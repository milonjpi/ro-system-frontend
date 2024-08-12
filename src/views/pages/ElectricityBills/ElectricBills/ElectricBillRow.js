import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconTrashXFilled } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';
import { setToast } from 'store/toastSlice';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import UpdateElectricBill from './UpdateElectricBill';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import moment from 'moment';

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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {data?.date ? moment(data?.date).format('DD/MM/YYYY') : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>
        {data?.meter?.label +
          (data?.meter?.smsAccount ? ', ' + data?.meter?.smsAccount : '')}
        <br />
        {data?.meter?.location || 'N/A'}
      </StyledTableCell>
      <StyledTableCell>{data?.year}</StyledTableCell>
      <StyledTableCell>{data?.month}</StyledTableCell>
      <StyledTableCell align="right">{data?.meterReading}</StyledTableCell>
      <StyledTableCell align="right">{data?.unit || 0}</StyledTableCell>
      <StyledTableCell>{data?.unitDetails}</StyledTableCell>
      <StyledTableCell align="right">{data?.netBill}</StyledTableCell>
      <StyledTableCell align="right">
        {data?.serviceCharge || 0}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell>{data?.paidBy}</StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 95 }}>
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
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ElectricBillRow;
