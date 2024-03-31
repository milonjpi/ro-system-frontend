import { useState } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
import AddExpenseHead from './AddExpenseHead';
import ExpenseHeadRow from './ExpenseHeadRow';

const ExpenseHead = () => {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: categoryData } = useGetIncomeExpenseCategoriesQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCategories = categoryData?.incomeExpenseCategories || [];
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
  query['type'] = 'Expense';

  if (category) {
    query['categoryId'] = category?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetIncomeExpenseHeadsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allHeads = data?.incomeExpenseHeads || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Expense Head"
      secondary={
        <CardAction
          title="Add Head"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={category}
              size="small"
              fullWidth
              options={allCategories}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setCategory(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Category" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddExpenseHead open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Expense Head</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allHeads?.length ? (
              allHeads.map((item) => (
                <ExpenseHeadRow key={item.id} sn={sn++} data={item} />
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

export default ExpenseHead;
