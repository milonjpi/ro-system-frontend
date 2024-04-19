import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DailyReportRow from './DailyReportRow';
import moment from 'moment';

const PrintDailyReport = forwardRef(
  (
    {
      tableHeads,
      allProducts,
      startDate,
      endDate,
      expenses,
      invoicedProducts,
      invoices,
      vouchers,
      investments,
      withdraws,
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
            Daily Report {moment(startDate).format('DD/MM/YYYY')} <em> to </em>{' '}
            {moment(endDate).format('DD/MM/YYYY')}
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
            {expenses ||
            invoicedProducts?.length ||
            invoices ||
            vouchers?.length ||
            investments ||
            withdraws ? (
              <DailyReportRow
                expenses={expenses}
                invoicedProducts={invoicedProducts}
                invoices={invoices}
                vouchers={vouchers}
                investments={investments}
                withdraws={withdraws}
                allProducts={allProducts}
              />
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
            {expenses ||
            invoicedProducts?.length ||
            invoices ||
            vouchers?.length ||
            investments ||
            withdraws ? (
              <>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={allProducts?.length || 1}
                    align="center"
                    sx={{
                      fontSize: '12px !important',
                      py: '2px !important',
                      fontWeight: 700,
                    }}
                  >
                    Total Quantity: {invoices?._sum?.totalQty || 0}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={allProducts?.length || 1}
                    align="center"
                    sx={{
                      fontSize: '12px !important',
                      py: '2px !important',
                      fontWeight: 700,
                    }}
                  >
                    Total Amount: {invoices?._sum?.amount || 0} ৳
                  </StyledTableCellWithBorder>
                </TableRow>
              </>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintDailyReport;
