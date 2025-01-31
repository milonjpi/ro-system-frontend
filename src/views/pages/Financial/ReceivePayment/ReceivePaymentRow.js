import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconCategory2, IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ReceiveVoucherView from '../VoucherView/ReceiveVoucherView';
import UpdatePaymentReceive from './UpdatePaymentReceive';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { useDeleteReceivePaymentMutation } from 'store/api/voucher/voucherApi';
import { setToast } from 'store/toastSlice';

const ReceivePaymentRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteReceivePayment] = useDeleteReceivePaymentMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteReceivePayment(data?.id).unwrap();
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
      <StyledTableCell>{data?.voucherNo}</StyledTableCell>
      <StyledTableCell>{data?.customer?.customerName}</StyledTableCell>
      <StyledTableCell>{data?.customer?.customerNameBn}</StyledTableCell>
      <StyledTableCell>{data?.customer?.address || 'n/a'}</StyledTableCell>
      <StyledTableCell>
        {data?.narration ? data?.narration : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="info" size="small" onClick={() => setView(true)}>
          <IconCategory2 size={18} />
        </IconButton>

        {/* popup items */}
        <ReceiveVoucherView
          open={view}
          handleClose={() => setView(false)}
          data={data}
        />
        {/* end popup items */}
      </StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            disabled={data?.version ? false : true}
            onClick={() => setOpen(true)}
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            disabled={data?.version ? false : true}
            onClick={() => setDialog(true)}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>

        {/* popup items */}
        <UpdatePaymentReceive
          open={open}
          handleClose={() => setOpen(false)}
          preData={data}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Receive Voucher"
          handleDelete={handleDelete}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReceivePaymentRow;
