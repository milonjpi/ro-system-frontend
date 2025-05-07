import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const PresentBalanceRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.year}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.month}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount?.toFixed()}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.cost?.toFixed()}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {(data?.amount - data?.cost).toFixed()}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PresentBalanceRow;
