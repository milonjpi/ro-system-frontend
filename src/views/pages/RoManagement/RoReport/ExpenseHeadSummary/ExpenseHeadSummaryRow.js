import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const ExpenseHeadSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.expenseHead?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ExpenseHeadSummaryRow;
