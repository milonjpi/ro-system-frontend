import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const OperationExpenseSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder sx={{ textTransform: 'uppercase' }}>
        {data?.expenseHead?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?._sum?.quantity}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?._avg?.unitPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?._sum?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default OperationExpenseSummaryRow;
