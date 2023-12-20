import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { IconCategory2 } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import ViewCustomInvoice from './ViewCustomInvoice';

const CustomInvoiceRow = ({ sn, data, startDate, endDate }) => {
  const [view, setView] = useState(false);

  const invoiceCount = data?.invoices?.length || 0;

  // calculation
  const totalPrice = totalSum(data?.invoices || [], 'totalPrice');
  const totalDiscount = totalSum(data?.invoices || [], 'discount');
  const totalAmount = totalSum(data?.invoices || [], 'amount');
  const paidAmount = totalSum(data?.invoices || [], 'paidAmount');
  const dueAmount = totalAmount - paidAmount;

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.customerName}</StyledTableCell>
      <StyledTableCell align="right">{invoiceCount}</StyledTableCell>
      <StyledTableCell align="right">{totalPrice}</StyledTableCell>
      <StyledTableCell align="right">{totalDiscount}</StyledTableCell>
      <StyledTableCell align="right">{totalAmount}</StyledTableCell>
      <StyledTableCell align="right">{paidAmount}</StyledTableCell>
      <StyledTableCell align="right">{dueAmount}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton color="primary" size="small" onClick={() => setView(true)}>
          <IconCategory2 size={18} />
        </IconButton>
        {/* popup items */}
        <ViewCustomInvoice
          open={view}
          handleClose={() => setView(false)}
          data={data}
          startDate={startDate}
          endDate={endDate}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CustomInvoiceRow;
