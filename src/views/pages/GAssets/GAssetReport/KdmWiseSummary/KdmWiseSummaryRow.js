import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const KdmWiseSummaryRow = ({ sn, data }) => {
  const allCarats = data?.carats || [];
  const rowSpan = allCarats.length || 1;
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder
          align="center"
          rowSpan={rowSpan}
          sx={{ width: '50px !important' }}
        >
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.category}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {allCarats.length > 0 && (
          <>
            <StyledTableCellWithBorder>
              {allCarats[0].carat}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {allCarats[0].weight?.toFixed(2)}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {allCarats[0].price}
            </StyledTableCellWithBorder>
          </>
        )}
      </TableRow>

      {/* Remaining Income Details Rows */}
      {allCarats.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>{el.carat}</StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.weight?.toFixed(2)}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.price}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default KdmWiseSummaryRow;
