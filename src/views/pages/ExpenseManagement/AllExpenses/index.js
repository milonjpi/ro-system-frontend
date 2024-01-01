import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useGetExpensesQuery } from 'store/api/expense/expenseApi';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';

const AllExpenses = () => {
  const [searchText, setSearchText] = useState('');
  const [expenseHead, setExpenseHead] = useState('');

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

  if (expenseHead) {
    query['expenseHeadId'] = expenseHead.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetExpensesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.expenses || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Expenses"
      secondary={
        <CardAction
          title="Add Expense"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={5}>
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
          <Grid item xs={12} md={4}>
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
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Bill No</StyledTableCell>
              <StyledTableCell>Vehicle</StyledTableCell>
              <StyledTableCell>Driver</StyledTableCell>
              <StyledTableCell>Workshop Type</StyledTableCell>
              <StyledTableCell>Maintenance Type</StyledTableCell>
              <StyledTableCell align="right">Service Charge</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="center">Bill</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allMaintenances?.length ? (
              allMaintenances.map((item) => (
                <RepairMaintenanceRow key={item.id} sn={sn++} data={item} />
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

export default AllExpenses;
