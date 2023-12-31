import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useDeleteEquipmentInMutation } from 'store/api/equipmentIn/equipmentInApi';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import UpdateItemsIn from './UpdateItemsIn';

const ItemsInRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteEquipmentIn] = useDeleteEquipmentInMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteEquipmentIn(data?.id).unwrap();
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
      <StyledTableCell>{data?.equipment?.equipmentCode}</StyledTableCell>
      <StyledTableCell>{data?.equipment?.label}</StyledTableCell>
      <StyledTableCell>{data?.remarks}</StyledTableCell>
      <StyledTableCell align="right">{data?.quantity}</StyledTableCell>
      <StyledTableCell align="right">{data?.unitPrice}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalPrice}</StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
            disabled={data?.quantity === data?.usedQty ? true : false}
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setDialog(true)}
            disabled={data?.quantity === data?.usedQty ? true : false}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>

        <UpdateItemsIn
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Remove from Stock"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ItemsInRow;
