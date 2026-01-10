import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { LinearProgress, Table, TableBody, TableHead } from '@mui/material';
import ZakatReportRow from './ZakatReportRow';
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';

const PrintZakatReport = forwardRef(
  ({ allRecipients, isLoading, totalAmount }, ref) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            যাকাত রিপোর্ট
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center" rowSpan={2}>
                ক্রোমিক নং
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                গ্রহীতার নাম
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                ঠিকানা
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center" colSpan={3}>
                যাকাত গ্রহণ
              </StyledTableCellWithBorder>
            </TableRow>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                বছর
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                পরিমাণ
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                মোট গ্রহণ
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRecipients?.length ? (
              allRecipients?.map((el, index) => (
                <ZakatReportRow key={el.id} sn={index + 1} data={el} />
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
            {allRecipients?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={5}
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

export default PrintZakatReport;
