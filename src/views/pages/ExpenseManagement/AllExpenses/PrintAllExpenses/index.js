import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import PrintAllExpenseRow from './PrintAllExpenseRow';

const PrintAllExpenses = forwardRef(
  ({ allExpenses, startDate, endDate, totalAmount }, ref) => {
    let sn = 1;
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
            Expenses <em>{moment(startDate).format('DD/MM/YYYY')}</em> to{' '}
            <em>{moment(endDate).format('DD/MM/YYYY')}</em>
          </Typography>
        </Box>

        <Table id="printTable">
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Date</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Vendor</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>
                Expense Head
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>
                Expense Details
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Remarks</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses.map((item) => (
                <PrintAllExpenseRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={13}
                  sx={{ border: 0 }}
                  align="center"
                >
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder colSpan={6} sx={{ fontWeight: 700 }}>
                  TOTAL:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintAllExpenses;
