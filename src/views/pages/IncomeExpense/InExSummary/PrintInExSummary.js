import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import InExSummaryRow from './InExSummaryRow';

const PrintInExSummary = forwardRef(
  ({ allIncomeExpenses, totalAmount, startDate, endDate }, ref) => {
    let sn = 1;
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            Income Expense Summary
          </Typography>
          <Typography component="p" sx={{ fontSize: 14, textAlign: 'center' }}>
            {moment(startDate).format('DD/MM/YYYY')}
            <em> to </em>
            {moment(endDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Category</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Income Head</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allIncomeExpenses?.length ? (
              allIncomeExpenses.map((item) => (
                <InExSummaryRow key={item.head} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={10} align="center">
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allIncomeExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  align="right"
                  colSpan={3}
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  sx={{ fontWeight: 700 }}
                  align="right"
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

export default PrintInExSummary;
