import { useState } from 'react';
import Box from '@mui/material/Box';
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
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useGetIncomeExpenseCategoriesQuery } from 'store/api/incomeExpenseCategory/incomeExpenseCategoryApi';
import { useGetIncomeExpenseHeadsQuery } from 'store/api/incomeExpenseHead/incomeExpenseHeadApi';
import { useGetIncomeExpensesQuery } from 'store/api/incomeExpense/incomeExpenseApi';
import AddPersonalIncome from './AddPersonalIncome';
import PersonalIncomeRow from './PersonalIncomeRow';
import moment from 'moment';

const PersonalIncome = () => {
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
      type: 'Income',
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
  query['type'] = 'Income';

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

  const allIncomes = data?.incomeExpenses || [];
  const meta = data?.meta;
  const totalIncome = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Incomes"
      secondary={
        <CardAction
          title="Add Income"
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
      <AddPersonalIncome open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Income Head</StyledTableCell>
              <StyledTableCell>Mode of Payment</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allIncomes?.length ? (
              allIncomes.map((item) => (
                <PersonalIncomeRow key={item.id} sn={sn++} data={item} />
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
            {allIncomes?.length ? (
              <StyledTableRow>
                <StyledTableCell
                  align="right"
                  colSpan={6}
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="right">
                  {totalIncome}
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

export default PersonalIncome;
