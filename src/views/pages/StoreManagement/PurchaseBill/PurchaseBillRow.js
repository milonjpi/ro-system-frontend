import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { IconCategory2 } from '@tabler/icons-react';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ShowStatus from 'ui-component/ShowStatus';
import BillView from './BillView';
import UpdatePurchaseBill from './UpdatePurchaseBill';
import { useDeleteBillMutation } from 'store/api/bill/billApi';

const PurchaseBillRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();
  const [deleteBill] = useDeleteBillMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteBill(data?.id).unwrap();
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
      <StyledTableCell>{data?.billNo}</StyledTableCell>
      <StyledTableCell>{data?.vendor?.vendorName}</StyledTableCell>
      <StyledTableCell>
        {data?.billEquipments?.map((el) => (
          <Typography key={el.id} sx={{ fontSize: 12 }}>
            {el.equipment?.label +
              ' - ' +
              el.quantity +
              ' ' +
              el.equipment?.uom?.toLowerCase()}
          </Typography>
        ))}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.totalPrice}</StyledTableCell>
      <StyledTableCell align="right">{data?.discount}</StyledTableCell>
      <StyledTableCell align="right">{data?.amount}</StyledTableCell>
      <StyledTableCell align="right">
        {data?.amount - data?.paidAmount}
      </StyledTableCell>
      <StyledTableCell align="center">
        <ShowStatus status={data?.status} />
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setView(true)}>
          <IconCategory2 size={18} />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
            disabled={data?.status === 'Due' ? false : true}
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setDialog(true)}
            disabled={data?.status === 'Due' ? false : true}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>
        {/* popup items */}
        <BillView open={view} handleClose={() => setView(false)} data={data} />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Bill"
          handleDelete={handleDelete}
        />
        <UpdatePurchaseBill
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PurchaseBillRow;
