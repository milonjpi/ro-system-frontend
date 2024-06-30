import moment from 'moment';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const PrintDistExpenseRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.expenseHead?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vendor ? data?.vendor?.vendorName : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.remarks ? data?.remarks : 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintDistExpenseRow;
