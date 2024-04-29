import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import MainCard from 'ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { useDebounced } from 'hooks';
import { useGetVouchersQuery } from 'store/api/voucher/voucherApi';
import { useGetAllVendorsQuery } from 'store/api/vendor/vendorApi';
import NewPaymentMake from './NewPaymentMake';
import MakePaymentRow from './MakePaymentRow';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const MakePayment = () => {
  const [searchText, setSearchText] = useState('');
  const [vendor, setVendor] = useState(null);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const [open, setOpen] = useState(false);

  // library
  const { data: vendorData } = useGetAllVendorsQuery(
    {
      isActive: true,
      limit: 1000,
      sortBy: 'vendorName',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allVendors = vendorData?.vendors || [];
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
      title: 'Date',
    },
    {
      title: 'Voucher No',
    },
    {
      title: 'Vendor',
    },
    {
      title: 'Vendor (BN)',
    },
    {
      title: 'Address',
    },
    {
      title: 'Narration',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Quick View',
      align: 'center',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['type'] = 'Paid';

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }
  if (vendor) {
    query['vendorId'] = vendor?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetVouchersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allVouchers = data?.vouchers || [];
  const allSumData = data?.sum?.length ? data?.sum[0] : null;
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Paid Amount"
      secondary={
        <CardAction
          title="New Pay"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <NewPaymentMake open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6} lg={4}>
            <InputBase
              fullWidth
              placeholder="Search By Voucher No..."
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
          <Grid item xs={12} md={6} lg={3}>
            <Autocomplete
              value={vendor}
              size="small"
              fullWidth
              options={allVendors}
              getOptionLabel={(option) => option.vendorName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setVendor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Vendor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
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
      {/* end filter area */}

      {/* data table */}
      <DataTable
        tableHeads={tableHeads}
        extra={
          allVouchers?.length ? (
            <StyledTableRow>
              <StyledTableCell
                align="right"
                colSpan={7}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                Total
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {allSumData?._sum?.amount || 0}
              </StyledTableCell>
            </StyledTableRow>
          ) : null
        }
        data={allVouchers}
        options={(el) => <MakePaymentRow key={el.id} sn={sn++} data={el} />}
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={meta?.total || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default MakePayment;
