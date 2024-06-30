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
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { useDebounced } from 'hooks';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { useGetDistClientsQuery } from 'store/api/distClient/distClientApi';
import NewDistPayReceive from './NewDistPayReceive';
import DistReceivePaymentRow from './DistReceivePaymentRow';
import { useGetDistVouchersQuery } from 'store/api/distVoucher/distVoucherApi';

const DistReceivePayment = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [searchText, setSearchText] = useState('');
  const [distributor, setDistributor] = useState(
    ['super_admin'].includes(userData?.role) ? null : userData?.distributor
  );
  const [customer, setCustomer] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState(false);

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

  // client
  const { data: customerData } = useGetDistClientsQuery(
    {
      limit: 1000,
      sortBy: 'customerName',
      sortOrder: 'asc',
      distributorId: distributor?.id || '123',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.distClients || [];
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
      title: 'Client',
    },
    {
      title: 'Client (BN)',
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
  query['type'] = 'Received';
  query['distributorId'] = '123';

  if (['super_admin'].includes(userData?.role)) {
    query['distributorId'] = undefined;
  }

  if (distributor) {
    query['distributorId'] = distributor?.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }
  if (customer) {
    query['customerId'] = customer?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetDistVouchersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allVouchers = data?.distVouchers || [];
  const allSumData = data?.sum;
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Receive Amount"
      secondary={
        userData?.distributor ? (
          <CardAction
            title="New Receive"
            icon={<IconPlus />}
            onClick={() => setOpen(true)}
          />
        ) : null
      }
    >
      {/* pop up items */}
      <NewDistPayReceive open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            hidden={['super_admin'].includes(userData?.role) ? true : false}
          >
            <InputBase
              fullWidth
              placeholder="Search By Invoice No..."
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
              onChange={(e, newValue) => {
                setDistributor(newValue);
                setCustomer(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Autocomplete
              value={customer}
              size="small"
              fullWidth
              options={allCustomers}
              getOptionLabel={(option) =>
                option.customerName +
                (option.customerNameBn ? ', ' + option.customerNameBn : '')
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setCustomer(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Client" />
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
        options={(el) => (
          <DistReceivePaymentRow key={el.id} sn={sn++} data={el} />
        )}
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

export default DistReceivePayment;
