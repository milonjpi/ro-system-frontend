import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const PaymentReportSummaryRow = ({ sn, data }) => {
  const vendor = data[0]?.vendor;

  return (
    <>
      <TableRow>
        <StyledTableCellWithBorder rowSpan={data?.length + 1 || 1}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={data?.length + 1 || 1}>
          {vendor?.vendorName}
        </StyledTableCellWithBorder>
      </TableRow>
      {data?.map((el) => (
        <TableRow key={el.id}>
          <StyledTableCellWithBorder>
            {moment(el?.date).format('DD/MM/YYYY')}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>{el?.voucherNo}</StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.voucherDetails?.map((vd) => vd?.bill?.billNo).join(', ') ||
              'n/a'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.narration || 'n/a'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el?.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default PaymentReportSummaryRow;
