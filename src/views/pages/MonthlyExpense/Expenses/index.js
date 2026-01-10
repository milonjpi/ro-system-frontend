import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconCloudDownload, IconPlus, IconPrinter } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { useDebounced } from 'hooks';
import moment from 'moment';
import { utils, writeFile } from 'xlsx';
import { Autocomplete, IconButton, TableRow, Tooltip } from '@mui/material';
import { allMonths } from 'assets/data';
import { useGetExpenseAreasQuery } from 'store/api/expenseArea/expenseAreaApi';
import { useGetAllMonthlyExpenseHeadsQuery } from 'store/api/monthlyExpenseHead/monthlyExpenseHeadApi';
import { useGetPaymentSourcesQuery } from 'store/api/paymentSource/paymentSourceApi';
import { useGetMonthlyExpensesQuery } from 'store/api/monthlyExpense/monthlyExpenseApi';
import AddExpense from './AddExpense';
import ExpenseRow from './ExpenseRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintExpenses from './PrintExpenses';

const Expenses = () => {
  const [searchText, setSearchText] = useState('');
  const [expenseArea, setExpenseArea] = useState(null);
  const [monthlyExpenseHead, setMonthlyExpenseHead] = useState(null);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentSource, setPaymentSource] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: expenseAreaData, isLoading: expenseAreaLoading } =
    useGetExpenseAreasQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseAreas = expenseAreaData?.expenseAreas || [];

  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetAllMonthlyExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.monthlyExpenseHeads || [];

  const { data: paymentSourceData, isLoading: paymentSourceLoading } =
    useGetPaymentSourcesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentSources = paymentSourceData?.paymentSources || [];
  // end library

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
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'date';
  query['sortOrder'] = 'desc';

  if (expenseArea) {
    query['expenseAreaId'] = expenseArea?.id;
  }

  if (monthlyExpenseHead) {
    query['monthlyExpenseHeadId'] = monthlyExpenseHead?.id;
  }

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }

  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  if (paymentSource) {
    query['paymentSourceId'] = paymentSource?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetMonthlyExpensesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allMonthlyExpenses = data?.monthlyExpenses || [];
  const meta = data?.meta;
  const sum = data?.sum;

  // export
  const { data: printData, isLoading: printLoading } =
    useGetMonthlyExpensesQuery(
      { ...query, page: 0, limit: 5000 },
      { refetchOnMountOrArgChange: true }
    );

  const allPrintMonthlyExpenses = printData?.monthlyExpenses || [];

  const handleExport = () => {
    let elt = allPrintMonthlyExpenses.map((el, index) => ({
      SN: index + 1,
      'Expense Area': `${el?.expenseArea?.label}\n${
        el?.vehicle ? ', ' + el?.vehicle?.label : ''
      }`,
      Month: el?.month + ' - ' + el?.year,
      Date: moment(el?.date).format('DD/MM/YYYY'),
      'Expense Head': el?.monthlyExpenseHead?.label,
      'Expense Details': el?.expenseDetail?.label || 'n/a',
      Remarks: el?.expenseDetails || 'n/a',
      'Payment Source': el?.paymentSource?.label,
      Amount: el?.amount,
    }));
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 41 },
      { wch: 15 },
      { wch: 12 },
      { wch: 36 },
      { wch: 27 },
      { wch: 27 },
      { wch: 14 },
      { wch: 14 },
    ];
    writeFile(wb, `MonthlyExpenses.xlsx`);
  };

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
  return (
    <SubCard
      title={
        <span>
          Expenses
          <Tooltip title="Export">
            <span>
              <IconButton
                color="primary"
                size="small"
                sx={{ ml: 0.5 }}
                disabled={printLoading}
                onClick={handleExport}
              >
                <IconCloudDownload size={18} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton
              color="secondary"
              size="small"
              sx={{ ml: 0.5 }}
              disabled={printLoading}
              onClick={handlePrint}
            >
              <IconPrinter size={18} />
            </IconButton>
          </Tooltip>
        </span>
      }
      secondary={
        <Button
          size="small"
          color="secondary"
          variant="contained"
          startIcon={<IconPlus size={16} />}
          sx={{ minWidth: 0, fontSize: 12 }}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      }
    >
      {/* popup items */}
      <AddExpense open={open} handleClose={() => setOpen(false)} />
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintExpenses
          ref={componentRef}
          allMonthlyExpenses={allPrintMonthlyExpenses}
          isLoading={isLoading}
          sum={sum}
        />
      </Box>
      {/* end popup items */}

      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3.5}>
            <InputBase
              fullWidth
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ borderBottom: '1px solid #ccc' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              loading={expenseAreaLoading}
              value={expenseArea}
              size="small"
              fullWidth
              options={allExpenseAreas}
              onChange={(e, newValue) => setExpenseArea(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Expense Area" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={expenseHeadLoading}
              value={monthlyExpenseHead}
              size="small"
              fullWidth
              options={allExpenseHeads}
              onChange={(e, newValue) => setMonthlyExpenseHead(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Expense Head" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={paymentSourceLoading}
              value={paymentSource}
              size="small"
              fullWidth
              options={allPaymentSources}
              onChange={(e, newValue) => setPaymentSource(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Payment Source" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                  <MenuItem key={el} value={`${2020 + el}`}>
                    {2020 + el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              value={month}
              size="small"
              fullWidth
              options={allMonths}
              onChange={(e, newValue) => setMonth(newValue)}
              renderInput={(params) => <TextField {...params} label="Month" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (From)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (To)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allMonthlyExpenses}
        options={(el, index) => (
          <ExpenseRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
          />
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
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              ></StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={meta?.total || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* end data table */}
    </SubCard>
  );
};

export default Expenses;
