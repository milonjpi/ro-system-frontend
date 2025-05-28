import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Button, TableRow } from '@mui/material';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { IconTrashXFilled } from '@tabler/icons-react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDeleteJewelleryMutation } from 'store/api/jewellery/jewelleryApi';
import UpdateJewellery from './UpdateJewellery';

const JewelleriesRow = ({ sn, data, category }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteJewellery] = useDeleteJewelleryMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteJewellery(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Jewellery Deleted Successfully',
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
        {moment(data?.dop).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.jewelleryType?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendor?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.invoiceNo}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.carat?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.weight}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.price}
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
        <UpdateJewellery
          preData={data}
          open={open}
          handleClose={() => setOpen(false)}
          category={category}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content={`DELETE ${category} JEWELLERY`}
          handleDelete={handleDelete}
        />
        {/* end popup item */}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default JewelleriesRow;
