import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconCloudDownload, IconPlus, IconPrinter } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { utils, writeFile } from 'xlsx';
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import AddDistExpense from './AddDistExpense';
import PrintDistExpense from './PrintDistExpense';
import DistExpenseRow from './DistExpenseRow';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { useGetDistExpensesQuery } from 'store/api/distExpense/distExpenseApi';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';

const DistExpenses = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [searchText, setSearchText] = useState('');
  const [distributor, setDistributor] = useState(
    ['super_admin'].includes(userData?.role) ? null : userData?.distributor
  );

  const [expenseHead, setExpenseHead] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState(false);

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

  // library
  const { data: distributorData, isLoading: distributorLoading } =
    useGetCustomersQuery(
      {
        isDistributor: true,
        limit: 1000,
        sortBy: 'customerName',
        sortOrder: 'asc',
      },
      { refetchOnMountOrArgChange: true }
    );

  const allDistributor = distributorData?.customers || [];

  const { data: expenseHeadData } = useGetExpenseHeadsQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = expenseHeadData?.expenseHeads || [];
  // end library

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['distributorId'] = '123';

  if (['super_admin'].includes(userData?.role)) {
    query['distributorId'] = undefined;
  }

  if (distributor) {
    query['distributorId'] = distributor?.id;
  }

  if (expenseHead) {
    query['expenseHeadId'] = expenseHead.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetDistExpensesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.distExpenses || [];
  const meta = data?.meta;
  const totalAmount = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;

  // export to excel
  const exportQuery = {};

  exportQuery['limit'] = 2000;
  exportQuery['page'] = 0;
  exportQuery['distributorId'] = '123';

  if (['super_admin'].includes(userData?.role)) {
    exportQuery['distributorId'] = undefined;
  }

  if (distributor) {
    exportQuery['distributorId'] = distributor?.id;
  }

  if (expenseHead) {
    exportQuery['expenseHeadId'] = expenseHead.id;
  }

  if (startDate) {
    exportQuery['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    exportQuery['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  if (!!debouncedSearchTerm) {
    exportQuery['searchTerm'] = debouncedSearchTerm;
  }

  const { data: exportExpenseData, isLoading: exportLoading } =
    useGetDistExpensesQuery(
      { ...exportQuery },
      { refetchOnMountOrArgChange: true }
    );
  const allExportExpenses = exportExpenseData?.distExpenses || [];

  const totalExportAmount = exportExpenseData?.sum?._sum?.amount || 0;

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

    ws['!cols'] = [
      { wch: 5 },
      { wch: 10 },
      { wch: 22 },
      { wch: 20 },
      { wch: 46 },
      { wch: 10 },
    ];
    writeFile(wb, `Expenses.xlsx`);
  };
  return (
    <MainCard
      title={
        <span>
          Expenses
          <ButtonGroup sx={{ ml: 1 }}>
            <Tooltip title="Export to Excel">
              <span>
                <IconButton
                  color="primary"
                  size="small"
                  disabled={exportLoading ? true : false}
                  onClick={handleExport}
                >
                  <IconCloudDownload size={20} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Print">
              <span>
                <IconButton
                  size="small"
                  color="secondary"
                  disabled={exportLoading ? true : false}
                  onClick={handlePrint}
                >
                  <IconPrinter size={20} />
                </IconButton>
              </span>
            </Tooltip>
          </ButtonGroup>
        </span>
      }
      secondary={
        userData?.distributor ? (
          <CardAction
            title="Add Expense"
            onClick={() => setOpen(true)}
            icon={<IconPlus />}
          />
        ) : null
      }
    >
      {/* popup items */}
      <AddDistExpense open={open} handleClose={() => setOpen(false)} />
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintDistExpense
          ref={componentRef}
          startDate={startDate}
          endDate={endDate}
          allExpenses={allExportExpenses}
          totalAmount={totalExportAmount}
          distributor={distributor}
        />
      </Box>
      {/* end popup items */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            hidden={['super_admin'].includes(userData?.role) ? true : false}
          >
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
          <Grid
            item
            xs={12}
            lg={4}
            hidden={['super_admin'].includes(userData?.role) ? false : true}
          >
            <Autocomplete
              loading={distributorLoading}
              value={distributor}
              size="small"
              fullWidth
              options={allDistributor}
              getOptionLabel={(option) => option.customerName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDistributor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={expenseHead}
              size="small"
              fullWidth
              options={allExpenseHeads}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setExpenseHead(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Expense Head" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
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
          <Grid item xs={12} sm={6} md={2.5}>
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
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Expense Head</StyledTableCell>
              <StyledTableCell>Vendor</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses.map((item) => (
                <DistExpenseRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={13} sx={{ border: 0 }} align="center">
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {allExpenses?.length ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={5}
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalAmount}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default DistExpenses;
