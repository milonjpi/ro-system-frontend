import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DataTable from 'ui-component/table';
import PrintExpenseRow from './PrintExpenseRow';

const PrintExpenses = forwardRef(
  ({ allMonthlyExpenses, isLoading, sum }, ref) => {
    const tableHeads = [
      {
        title: 'SN',
        align: 'center',
      },
      {
        title: 'Expense Area',
      },
      {
        title: 'Month',
      },
      {
        title: 'Date',
      },

      {
        title: 'Expense Head',
      },
      {
        title: 'Expense Details',
      },
      {
        title: 'Remarks',
      },
      {
        title: 'Payment Source',
      },
      {
        title: 'Amount',
        align: 'right',
      },
    ];
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            Expenses
          </Typography>
        </Box>

        <DataTable
          bordered
          tableHeads={tableHeads}
          data={allMonthlyExpenses}
          options={(el, index) => (
            <PrintExpenseRow key={el.id} sn={index + 1} data={el} />
          )}
          extra={
            allMonthlyExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={8}
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
                  {sum?._sum?.amount || 0}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null
          }
          loading={isLoading}
        />
      </Box>
    );
  }
);

export default PrintExpenses;
