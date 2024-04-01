import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const InExSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.category}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.head}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default InExSummaryRow;
