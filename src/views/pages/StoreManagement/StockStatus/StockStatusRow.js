import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const StockStatusRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.equipmentCode}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.label}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.uom}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.totalQty}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.usedQty}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.totalQty - data?.usedQty}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default StockStatusRow;
