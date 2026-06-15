import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import RoDailyReportRow from './RoDailyReportRow';

const PrintRoDailyReport = forwardRef(
  (
    {
      tableHeads,
      allProducts,
      year,
      month,
      invoices,
      totalQty,
      totalAmount,
      totalPaidAmount,
      totalDue,
      isLoading,
    },
    ref
  ) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            TBZ RO SYSTEM
          </Typography>
          <Typography component="p" sx={{ fontSize: 14, textAlign: 'center' }}>
            Rajpat, Fakirhat, Bagerhat.
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          >
            Daily Report of {month + ', ' + year}
          </Typography>
        </Box>

        <Table id="printTable">
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                  colSpan={el?.colSpan || 1}
                  rowSpan={el?.rowSpan || 1}
                  sx={{ py: '0px !important' }}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
            <TableRow>
              {allProducts?.map((el) => (
                <StyledTableCellWithBorder
                  key={el.id}
                  align="center"
                  sx={{ py: '0px !important', fontSize: '9px !important' }}
                >
                  {el.label}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.length ? (
              invoices?.map((el, index) => (
                <RoDailyReportRow
                  key={index}
                  sn={index + 1}
                  data={el}
                  allProducts={allProducts}
                />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={12}
                  sx={{ border: 0 }}
                  align="center"
                >
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {invoices?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={(allProducts?.length || 1) + 2}
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
                  {totalQty}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalPaidAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalDue}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintRoDailyReport;
