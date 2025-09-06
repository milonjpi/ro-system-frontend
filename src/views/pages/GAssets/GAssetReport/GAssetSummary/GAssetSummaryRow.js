import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const GAssetSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder
        align="center"
        sx={{ width: '50px !important' }}
      >
        {sn}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.category}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.weight?.toFixed(3)}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.price}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default GAssetSummaryRow;
