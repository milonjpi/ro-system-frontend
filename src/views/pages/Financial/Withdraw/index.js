import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import moment from 'moment';
import { useGetWithdrawsQuery } from 'store/api/withdraw/withdrawApi';
import WithdrawRow from './WithdrawRow';
import AddWithdraw from './AddWithdraw';

const Withdraw = () => {
  const [searchText, setSearchText] = useState('');
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

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;

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

  const { data, isLoading } = useGetWithdrawsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allWithdraws = data?.withdraws || [];
  const meta = data?.meta;
  const totalAmount = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Withdraws"
      secondary={
        <CardAction
          title="Add Withdraw"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1.5} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} lg={4}>
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
          <Grid item xs={12} md={6} lg={2.5}>
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
          <Grid item xs={12} md={6} lg={2.5}>
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
      <AddWithdraw open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allWithdraws?.length ? (
              allWithdraws.map((item) => (
                <WithdrawRow key={item.id} sn={sn++} data={item} />
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
            {allWithdraws?.length ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={3}
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

export default Withdraw;
