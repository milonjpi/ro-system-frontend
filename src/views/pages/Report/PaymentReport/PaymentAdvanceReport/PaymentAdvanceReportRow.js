import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const PaymentAdvanceReportRow = ({ sn, data }) => {
  return (
    <TableRow className="pageBreakRow">
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.vendorId}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.vendorName}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendorNameBn}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.mobile ? data?.mobile : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.address ? data?.address : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.lastBillDate
          ? moment(data?.lastBillDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.lastPaymentDate
          ? moment(data?.lastPaymentDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.differentAmount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PaymentAdvanceReportRow;
