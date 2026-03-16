import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { LinearProgress, Table, TableBody, TableHead } from '@mui/material';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';
import YearWiseReportRow from './YearWiseReportRow';

const PrintYearWiseReport = forwardRef(
  ({ allZakats, isLoading, totalAmount }, ref) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            যাকাত রিপোর্ট &#40;বছর&#41;
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center" sx={{ width: 100 }}>
                ক্রোমিক নং
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center">
                বছর
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                যাকাতের পরিমাণ
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allZakats?.length ? (
              allZakats?.map((el, index) => (
                <YearWiseReportRow key={el.id} sn={index + 1} data={el} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={15} align="center">
                  {isLoading ? (
                    <LinearProgress
                      color="primary"
                      sx={{ opacity: 0.5, py: 0.5 }}
                    />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allZakats?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={2}
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  মোট
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {convertToBanglaNumber(totalAmount || 0)}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintYearWiseReport;
