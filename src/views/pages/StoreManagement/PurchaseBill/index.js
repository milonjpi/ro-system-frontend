import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { allInvoiceStatus } from 'assets/data';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import DataTable from 'ui-component/table';
import { utils, writeFile } from 'xlsx';
import moment from 'moment';
import { useDebounced } from 'hooks';
import AddPurchaseBill from './AddPurchaseBill';
import PurchaseBillRow from './PurchaseBillRow';
import { useGetAllVendorsQuery } from 'store/api/vendor/vendorApi';
import { useGetBillsQuery } from 'store/api/bill/billApi';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const PurchaseBill = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('all');
  const [vendor, setVendor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: vendorData } = useGetAllVendorsQuery(
    { isActive: true, limit: 1000, sortBy: 'vendorName', sortOrder: 'asc' },
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
      title: 'Bill No',
    },

    {
      title: 'Vendor',
    },
    {
      title: 'Equipment Details',
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

  const { data, isLoading } = useGetBillsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allBills = data?.bills || [];
  const meta = data?.meta;
  const totalPrice = data?.sum?._sum?.totalPrice || 0;
  const discount = data?.sum?._sum?.discount || 0;
  const amount = data?.sum?._sum?.amount || 0;
  const paidAmount = data?.sum?._sum?.paidAmount || 0;
  const due = amount - paidAmount;

  let sn = page * rowsPerPage + 1;

  // handle export
  // fetch export data
  const { data: exportData } = useGetBillsQuery(
    { ...query, page: 0, limit: 1000 },
    { refetchOnMountOrArgChange: true }
  );
  const allExportBills = exportData?.bills || [];

  let xSn = 1;
  let elt = allExportBills?.map((el, index) => ({
    SN: xSn + index,
    Project: '',
    Date: moment(el?.date).format('DD/MM/YYYY'),
    'Bill No': el?.billNo,
    Vendor: el?.vendor?.vendorName,
    'Equipment Details': el?.billEquipments
      ?.map(
        (be) =>
          be.equipment?.label +
          ' - ' +
          be.quantity +
          ' ' +
          be.equipment?.uom?.toLowerCase()
      )
      ?.join(', '),
    'Total Price': el?.totalPrice,
    Discount: el?.discount,
    Amount: el?.amount,
    Due: el?.amount - el?.paidAmount,
    Status: el?.status?.toUpperCase(),
  }));
  const handleExport = () => {
    let wb = utils.book_new();
    let ws = utils.json_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 15 },
      { wch: 10 },
      { wch: 9 },
      { wch: 25 },
      { wch: 30 },
      { wch: 10 },
      { wch: 8 },
      { wch: 10 },
      { wch: 8 },
      { wch: 10 },
    ];
    writeFile(wb, `AllBills.xlsx`);
  };
  return (
    <MainCard
      title={
        <span>
          The Bills{' '}
          <Tooltip title="Export to Excel">
            <IconButton color="primary" size="small" onClick={handleExport}>
              <CloudDownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </span>
      }
      secondary={
        <CardAction
          title="Create Bill"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <AddPurchaseBill open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6} lg={3.5}>
            <InputBase
              fullWidth
              placeholder="Search By Bill No..."
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
          <Grid item xs={12} md={6} lg={2}>
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
          <Grid item xs={12} lg={2.5}>
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
          <Grid item xs={12} md={6} lg={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Bill Date (From)"
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
          <Grid item xs={12} md={6} lg={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Bill Date (To)"
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
        data={allBills}
        options={(el) => <PurchaseBillRow key={el.id} sn={sn++} data={el} />}
        extra={
          allBills?.length ? (
            <StyledTableRow>
              <StyledTableCell
                colSpan={5}
                align="right"
                sx={{ fontWeight: 700 }}
              >
                Total:
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                {totalPrice}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                {discount}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                {amount}
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 700 }}>
                {due}
              </StyledTableCell>
              <StyledTableCell colSpan={3}></StyledTableCell>
            </StyledTableRow>
          ) : null
        }
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

export default PurchaseBill;
