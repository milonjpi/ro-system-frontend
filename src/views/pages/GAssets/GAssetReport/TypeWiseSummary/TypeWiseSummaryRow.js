import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import React from 'react';

const TypeWiseSummaryRow = ({ sn, data }) => {
  const types = data?.types || [];

  // Total rowSpan for SN and Category columns
  const totalRowSpan = types.reduce(
    (acc, type) => acc + (type.carats?.length || 1),
    0
  );

  return (
    <>
      {types.map((typeItem, typeIndex) => {
        const carats = typeItem.carats || [];
        const rowSpan = carats.length || 1;

        // Calculate total weight for this type
        const typeTotalWeight = carats.reduce(
          (acc, curr) => acc + (curr.weight || 0),
          0
        );

        return (
          <React.Fragment key={typeIndex}>
            <TableRow>
              {/* Show SN and Category only on first type's first row */}
              {typeIndex === 0 && (
                <>
                  <StyledTableCellWithBorder
                    align="center"
                    rowSpan={totalRowSpan}
                    sx={{ width: '50px !important' }}
                  >
                    {sn}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder rowSpan={totalRowSpan}>
                    {data?.category}
                  </StyledTableCellWithBorder>
                </>
              )}

              {/* Type Name with rowSpan */}
              <StyledTableCellWithBorder rowSpan={rowSpan}>
                {typeItem.type}
              </StyledTableCellWithBorder>

              {/* First carat row */}
              <StyledTableCellWithBorder>
                {carats[0]?.carat}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                {carats[0]?.weight?.toFixed(3)}
              </StyledTableCellWithBorder>

              {/* Show total weight in last row of this type */}
              <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
                {typeTotalWeight.toFixed(3)}
              </StyledTableCellWithBorder>
            </TableRow>

            {/* Remaining carat rows */}
            {carats.slice(1).map((caratItem, caratIndex) => (
              <TableRow key={`${typeIndex}-${caratIndex}`}>
                <StyledTableCellWithBorder>
                  {caratItem.carat}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder align="right">
                  {caratItem.weight?.toFixed(3)}
                </StyledTableCellWithBorder>
              </TableRow>
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TypeWiseSummaryRow;
