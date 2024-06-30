import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const DistPayableRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>TBZ RO</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.lastSaleDate
          ? moment(data?.lastSaleDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.lastPaymentDate
          ? moment(data?.lastPaymentDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.quantity}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.paidAmount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.dueDifferent}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default DistPayableRow;
