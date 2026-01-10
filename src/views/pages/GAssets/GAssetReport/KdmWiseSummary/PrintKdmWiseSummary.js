import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DataTable from 'ui-component/table';
import KdmWiseSummaryRow from './KdmWiseSummaryRow';

const PrintKdmWiseSummary = forwardRef(
  ({ tableHeads, allData, isLoading, totalWeight, totalPrice }, ref) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            KDM Wise Summary
          </Typography>
        </Box>

        <DataTable
          bordered
          tableHeads={tableHeads}
          data={allData}
          options={(el, index) => (
            <KdmWiseSummaryRow key={index} sn={index + 1} data={el} />
          )}
          loading={isLoading}
          extra={
            allData?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={3}
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  TOTAL
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalWeight?.toFixed(3)}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalPrice}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null
          }
        />
      </Box>
    );
  }
);

export default PrintKdmWiseSummary;
