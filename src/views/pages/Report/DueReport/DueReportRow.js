import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const DueReportRow = ({ sn, data }) => {
  const invoicesData = data?.invoices;
  const duePayment =
    (invoicesData?.amount || 0) - (invoicesData?.paidAmount || 0);
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.customerId}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.customerName}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.customerNameBn}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.mobile ? data?.mobile : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address ? data?.address : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {invoicesData?.lastSaleDate
          ? moment(invoicesData?.lastSaleDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {invoicesData?.lastPaymentDate
          ? moment(invoicesData?.lastPaymentDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {duePayment}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default DueReportRow;
