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
import { useDeleteInvoiceMutation } from 'store/api/invoice/invoiceApi';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import ShowStatus from 'ui-component/ShowStatus';
import UpdateSalesInvoice from './UpdateSalesInvoice';
import InvoiceView from './InvoiceView';

const SalesInvoiceRow = ({ sn, data, allDetailCustomers }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();
  const [deleteInvoice] = useDeleteInvoiceMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteInvoice(data?.id).unwrap();
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
      <StyledTableCell>{data?.customer?.customerName}</StyledTableCell>
      <StyledTableCell>
        {data?.invoicedProducts?.map((el) => (
          <Typography key={el.id} sx={{ fontSize: 12 }}>
            {el.product?.label +
              ' - ' +
              el.quantity +
              ' ' +
              el.product?.uom?.toLowerCase()}
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
            disabled={
              data?.version || ['Due', 'Partial'].includes(data?.status)
                ? false
                : true
            }
          >
            <IconEdit size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setDialog(true)}
            disabled={data?.version ? false : true}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>
        {/* popup items */}
        <InvoiceView
          open={view}
          handleClose={() => setView(false)}
          data={data}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Invoice"
          handleDelete={handleDelete}
        />
        {allDetailCustomers?.length ? (
          <UpdateSalesInvoice
            open={open}
            preData={data}
            handleClose={() => setOpen(false)}
            allDetailCustomers={allDetailCustomers}
          />
        ) : null}

        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default SalesInvoiceRow;
