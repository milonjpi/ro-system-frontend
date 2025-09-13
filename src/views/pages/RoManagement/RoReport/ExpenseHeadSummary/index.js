import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconCloudDownload, IconPrinter } from '@tabler/icons-react';
import LinearProgress from '@mui/material/LinearProgress';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { utils, writeFile } from 'xlsx';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { allMonths, dueYears } from 'assets/data';
import { useExpenseHeadSummaryQuery } from 'store/api/expense/expenseApi';
import ExpenseHeadSummaryRow from './ExpenseHeadSummaryRow';
import PrintExpenseHeadSummary from './PrintExpenseHeadSummary';

const ExpenseHeadSummary = () => {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  // table
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination

  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Expense Head',
    },
    {
      title: 'Amount',
      align: 'right',
    },
  ];
  // end table

  // filtering
  const query = {};

  if (year) {
    query['startDate'] = `${year}-01-01`;
    query['endDate'] = `${year}-12-31`;
  }

  if (month) {
    query['startDate'] = moment(`${year}-${month}`, 'YYYY-MMMM')
      .startOf('month')
      .format('YYYY-MM-DD');
    query['endDate'] = moment(`${year}-${month}`, 'YYYY-MMMM')
      .endOf('month')
      .format('YYYY-MM-DD');
  }

  const { data, isLoading } = useExpenseHeadSummaryQuery(
    { ...query },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allHeadExpenses = data?.data || [];

  let sn = page * rowsPerPage + 1;

  // calculation
  const totalExpenses = totalSum(allHeadExpenses, 'amount');

  // print and export
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        .pageBreakRow {
          page-break-inside: avoid;
        }
      }
      `,
  });

  const handleExport = () => {
    let elt = document.getElementById('printTable');
    let wb = utils.book_new();
    let ws = utils.table_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [{ wch: 5 }, { wch: 18 }, { wch: 8 }];
    writeFile(wb, `Expense-Head-Summary.xlsx`);
  };

  return (
    <MainCard
      title="Expense Head Summary"
      secondary={
        <ButtonGroup>
          <Tooltip title="Export to Excel">
            <IconButton color="primary" size="small" onClick={handleExport}>
              <IconCloudDownload size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small" color="secondary" onClick={handlePrint}>
              <IconPrinter size={22} />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      }
    >
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={dueYears}
              onChange={(e, newValue) => {
                setYear(newValue);
                setMonth(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Year" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              disabled={year ? false : true}
              value={month}
              size="small"
              fullWidth
              options={allMonths}
              onChange={(e, newValue) => setMonth(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Month" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintExpenseHeadSummary
          ref={componentRef}
          tableHeads={tableHeads}
          data={allHeadExpenses}
          totalExpenses={totalExpenses}
          month={month}
          year={year}
          loading={isLoading}
        />
      </Box>
      {/* end popup item */}

      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allHeadExpenses?.length ? (
              allHeadExpenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <ExpenseHeadSummaryRow key={index} sn={sn++} data={item} />
                ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={10}
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
            {allHeadExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={2}
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  TOTAL:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {totalExpenses}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allHeadExpenses?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default ExpenseHeadSummary;
