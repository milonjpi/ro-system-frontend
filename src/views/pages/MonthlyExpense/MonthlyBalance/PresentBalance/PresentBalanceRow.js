import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';

const PresentBalanceRow = ({ sn, data }) => {
  const expenses = data?.paymentSource?.monthlyExpenses || [];
  const expenseAmount = totalSum(expenses, 'amount');

  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.paymentSource?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {expenseAmount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount - expenseAmount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PresentBalanceRow;
