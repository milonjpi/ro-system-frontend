import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconCategory2, IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useDeleteDrVoucherMutation } from 'store/api/drVoucher/drVoucherApi';
import DrVoucherView from './DrVoucherView';
import UpdateDrVoucher from './UpdateDrVoucher';

const DrVoucherRow = ({ sn, data, allCustomers }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteDrVoucher] = useDeleteDrVoucherMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteDrVoucher(data?.id).unwrap();
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
        <DrVoucherView
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
            disabled={
              data?.amount >
              totalSum(data?.drVoucherDetails || [], 'receiveAmount')
            }
            onClick={() => setOpen(true)}
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            disabled={
              data?.amount >
              totalSum(data?.drVoucherDetails || [], 'receiveAmount')
            }
            onClick={() => setDialog(true)}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>

        {/* popup items */}
        <UpdateDrVoucher
          open={open}
          handleClose={() => setOpen(false)}
          preData={data}
          allCustomers={allCustomers}
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

export default DrVoucherRow;
