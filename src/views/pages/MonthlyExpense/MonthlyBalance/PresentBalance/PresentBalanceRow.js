import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const PresentBalanceRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.cost}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount - data?.cost}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PresentBalanceRow;
