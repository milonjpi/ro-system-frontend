import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import MainCard from 'ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import { allInvoiceStatus } from 'assets/data';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { useDebounced } from 'hooks';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetDrCustomersQuery } from 'store/api/drCustomer/drCustomerApi';
import { useGetDrInvoicesQuery } from 'store/api/drInvoice/drInvoiceApi';
import { useGetDrProductsQuery } from 'store/api/drProduct/drProductApi';
import AddDrInvoice from './AddDrInvoice';
import DrInvoiceRow from './DrInvoiceRow';

const DrInvoices = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');
  const [customer, setCustomer] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: customerData } = useGetDrCustomersQuery(
    {
      limit: 1000,
      sortBy: 'customerName',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];

  const { data: productData } = useGetDrProductsQuery(
    {
      limit: 1000,
      sortBy: 'label',
      sortOrder: 'asc',
      isActive: true,
    },
    { refetchOnMountOrArgChange: true }
  );

  const allProducts = productData?.products || [];
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
      title: 'Invoice No',
    },

    {
      title: 'Distributor',
    },
    {
      title: 'Product Details',
    },
    {
      title: 'Total Price',
      align: 'right',
    },
    {
      title: 'Discount',
      align: 'right',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Due',
      align: 'right',
    },
    {
      title: 'Status',
      align: 'center',
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

  if (status !== 'all') {
    query['status'] = status;
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

  const { data, isLoading } = useGetDrInvoicesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allInvoices = data?.invoices || [];
  const allSumData = data?.sum;
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Invoices"
      secondary={
        <CardAction
          title="Create Invoice"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <AddDrInvoice
        open={open}
        handleClose={() => setOpen(false)}
        allCustomers={allCustomers}
        allProducts={allProducts}
      />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
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
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="sales-order-status-id">Status</InputLabel>
              <Select
                labelId="sales-order-status-id"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {allInvoiceStatus?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
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
      {/* end filter area */}

      {/* data table */}
      <DataTable
        tableHeads={tableHeads}
        extra={
          allInvoices?.length ? (
            <StyledTableRow>
              <StyledTableCell
                align="right"
                colSpan={4}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                Total
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {(allSumData?._sum?.totalQty || 0) + ' pcs'}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {allSumData?._sum?.totalPrice || 0}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {allSumData?._sum?.discount || 0}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {allSumData?._sum?.amount || 0}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {(allSumData?._sum?.amount || 0) -
                  (allSumData?._sum?.paidAmount || 0)}
              </StyledTableCell>
            </StyledTableRow>
          ) : null
        }
        data={allInvoices}
        options={(el) => (
          <DrInvoiceRow
            key={el.id}
            sn={sn++}
            data={el}
            allCustomers={allCustomers}
            allProducts={allProducts}
          />
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

export default DrInvoices;
