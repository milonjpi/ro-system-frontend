import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDeleteFosInvoiceMutation } from 'store/api/fosInvoice/fosInvoiceApi';
import UpdateFocInvoice from './UpdateFocInvoice';

const FocInvoiceRow = ({ sn, data, allCustomers }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteFosInvoice] = useDeleteFosInvoiceMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteFosInvoice(data?.id).unwrap();
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
      <StyledTableCell>{data?.invoiceNo}</StyledTableCell>
      <StyledTableCell>{data?.fosCustomer?.customerName}</StyledTableCell>
      <StyledTableCell>{data?.fosCustomer?.address || 'n/a'}</StyledTableCell>
      <StyledTableCell>
        {data?.fosInvoicedProducts?.map((el) => (
          <Typography key={el.id} sx={{ fontSize: 12 }}>
            {el.fosProduct?.label +
              ' - ' +
              el.quantity +
              ' ' +
              el.fosProduct?.uom?.toLowerCase()}
          </Typography>
        ))}
      </StyledTableCell>

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
        {/* popup items */}
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete FOC Invoice"
          handleDelete={handleDelete}
        />
        <UpdateFocInvoice
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
          allCustomers={allCustomers}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FocInvoiceRow;
