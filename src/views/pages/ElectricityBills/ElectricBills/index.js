import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import AddElectricBill from './AddElectricBill';
import ElectricBillRow from './ElectricBillRow';
import { useGetElectricityBillsQuery } from 'store/api/electricityBill/electricityBillApi';
import { electricMonths, electricYears } from 'assets/data';

const ElectricBills = () => {
  const [searchText, setSearchText] = useState('');
  const [meter, setMeter] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [status, setStatus] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: meterData, isLoading: meterLoading } = useGetMetersQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.meters || [];
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
  query['sortOrder'] = 'asc';

  if (meter) {
    query['meterId'] = meter?.id;
  }

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  if (status) {
    query['status'] = status;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetElectricityBillsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allElectricityBills = data?.electricityBills || [];
  const meta = data?.meta;
  const totalUnit = data?.sum?._sum?.unit || 0;
  const totalNetBill = data?.sum?._sum?.netBill || 0;
  const totalServiceCharge = data?.sum?._sum?.serviceCharge || 0;
  const totalAmount = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Electric Bills"
      secondary={
        <CardAction
          title="Add Bill"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
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
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={meter}
              loading={meterLoading}
              size="small"
              fullWidth
              options={allMeters}
              getOptionLabel={(option) =>
                option.label +
                (option.smsAccount ? ', ' + option?.smsAccount : '')
              }
              onChange={(e, newValue) => setMeter(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Meter" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={electricYears}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Autocomplete
              value={month}
              size="small"
              fullWidth
              options={electricMonths}
              onChange={(e, newValue) => setMonth(newValue)}
              renderInput={(params) => <TextField {...params} label="Month" />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              value={status}
              size="small"
              fullWidth
              options={['Due', 'Paid']}
              onChange={(e, newValue) => setStatus(newValue)}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddElectricBill open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Paid Date</StyledTableCell>
              <StyledTableCell>Meter Info</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell align="right">Reading</StyledTableCell>
              <StyledTableCell align="right">Unit</StyledTableCell>
              <StyledTableCell>Unit Details Amount</StyledTableCell>
              <StyledTableCell align="right">Net Bill</StyledTableCell>
              <StyledTableCell align="right">Service Charge</StyledTableCell>
              <StyledTableCell align="right">Total Bill</StyledTableCell>
              <StyledTableCell>Paid By</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allElectricityBills?.length ? (
              allElectricityBills.map((item) => (
                <ElectricBillRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={16} sx={{ border: 0 }} align="center">
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {allElectricityBills?.length ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={6}
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalUnit}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ fontWeight: 700 }}
                ></StyledTableCell>
                <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalNetBill}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalServiceCharge}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                  {totalAmount}
                </StyledTableCell>
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

export default ElectricBills;
