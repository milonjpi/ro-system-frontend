import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconCloudDownload, IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useGetIncomeExpenseCategoriesQuery } from 'store/api/incomeExpenseCategory/incomeExpenseCategoryApi';
import { useGetIncomeExpenseHeadsQuery } from 'store/api/incomeExpenseHead/incomeExpenseHeadApi';
import { useGetIncomeExpensesQuery } from 'store/api/incomeExpense/incomeExpenseApi';
import moment from 'moment';
import { utils, writeFile } from 'xlsx';
import PersonalExpenseRow from './PersonalExpenseRow';
import AddPersonalExpense from './AddPersonalExpense';

const PersonalExpense = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState(null);
  const [head, setHead] = useState(null);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  const [open, setOpen] = useState(false);

  // library
  const { data: categoryData } = useGetIncomeExpenseCategoriesQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCategories = categoryData?.incomeExpenseCategories || [];

  const { data: headData } = useGetIncomeExpenseHeadsQuery(
    {
      limit: 100,
      type: 'Expense',
      categoryId: category?.id || '123',
      sortBy: 'label',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allIncomeHeads = headData?.incomeExpenseHeads || [];
  // end library

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

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'date';
  query['sortOrder'] = 'desc';
  query['type'] = 'Expense';

  if (category) {
    query['categoryId'] = category?.id;
  }

  if (head) {
    query['incomeExpenseHeadId'] = head?.id;
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

  const { data, isLoading } = useGetIncomeExpensesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.incomeExpenses || [];
  const meta = data?.meta;
  const totalExpense = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;

  const { data: exportData, isLoading: exportLoading } =
    useGetIncomeExpensesQuery(
      { ...query, page: 0, limit: 2000 },
      { refetchOnMountOrArgChange: true }
    );

  const allExportExpenses = exportData?.incomeExpenses || [];

  let snX = 1;
  // export
  const handleExport = () => {
    let elt = allExportExpenses.map((el) => ({
      SN: snX++,
      Date: moment(el.date).format('DD/MM/YYYY'),
      Category: el.category?.label,
      'Expense Head': el?.incomeExpenseHead?.label,
      'Mode of Payment': el?.modeOfPayment?.label,
      Remarks: el?.remarks || 'n/a',
      Amount: el?.amount,
    }));
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 10 },
      { wch: 26 },
      { wch: 29 },
      { wch: 15 },
      { wch: 20 },
      { wch: 14 },
    ];
    writeFile(wb, `Expenses.xlsx`);
  };
  return (
    <MainCard
      title={
        <span>
          Expenses
          <Tooltip title="Export">
            <IconButton
              color="primary"
              size="small"
              sx={{ ml: 0.5 }}
              disabled={exportLoading}
              onClick={handleExport}
            >
              <IconCloudDownload size={18} />
            </IconButton>
          </Tooltip>
        </span>
      }
      secondary={
        <CardAction
          title="Add Expense"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
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
              value={category}
              size="small"
              fullWidth
              options={allCategories}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => {
                setCategory(newValue);
                setHead(null);
              }}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Category" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              value={head}
              size="small"
              fullWidth
              options={allIncomeHeads}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setHead(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Head" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (Form)"
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
          <Grid item xs={12} md={2}>
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
      {/* popup items */}
      <AddPersonalExpense open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Expense Head</StyledTableCell>
              <StyledTableCell>Mode of Payment</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses.map((item) => (
                <PersonalExpenseRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
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
                  align="right"
                  colSpan={6}
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="right">
                  {totalExpense}
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

export default PersonalExpense;
