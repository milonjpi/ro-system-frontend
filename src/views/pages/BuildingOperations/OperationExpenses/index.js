import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MainCard from 'ui-component/cards/MainCard';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { Autocomplete, TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetBuildingExpenseHeadsQuery } from 'store/api/buildingExpenseHead/buildingExpenseHeadApi';
import { useGetBuildingVendorsQuery } from 'store/api/buildingVendor/buildingVendorApi';
import { useGetBuildingBrandsQuery } from 'store/api/buildingBrand/buildingBrandApi';
import { useGetBuildingExpensesQuery } from 'store/api/buildingExpense/buildingExpenseApi';
import AddOperationExpense from './AddOperationExpense';
import OperationExpenseRow from './OperationExpenseRow';

const OperationExpenses = () => {
  const [expenseHead, setExpenseHead] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('all');

  const [open, setOpen] = useState(false);

  // library
  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetBuildingExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.buildingExpenseHeads || [];

  const { data: vendorData, isLoading: vendorLoading } =
    useGetBuildingVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.buildingVendors || [];

  const { data: brandData, isLoading: brandLoading } =
    useGetBuildingBrandsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allBrands = brandData?.buildingBrands || [];
  // end library

  // table
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
      title: 'Vendor',
    },
    {
      title: 'Expense Head',
    },
    {
      title: 'Quantity',
      align: 'right',
    },
    {
      title: 'Unit Price',
      align: 'right',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Remarks',
    },
    {
      title: 'Status',
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
  query['sortBy'] = 'date';
  query['sortOrder'] = 'desc';

  if (expenseHead) {
    query['expenseHeadId'] = expenseHead?.id;
  }

  if (vendor) {
    query['vendorId'] = vendor?.id;
  }

  if (brand) {
    query['brandId'] = brand?.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  if (status !== 'all') {
    query['status'] = status;
  }

  const { data, isLoading } = useGetBuildingExpensesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.buildingExpenses || [];
  const meta = data?.meta;
  const sum = data?.sum;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Operation Expenses"
      secondary={
        <CardAction
          title="Create"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <AddOperationExpense open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              loading={expenseHeadLoading}
              value={expenseHead}
              size="small"
              fullWidth
              options={allExpenseHeads}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setExpenseHead(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Expense Head" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              loading={vendorLoading}
              value={vendor}
              size="small"
              fullWidth
              options={allVendors}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setVendor(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => <TextField {...params} label="Vendor" />}
            />
          </Grid>
          <Grid item xs={12} md={1.9}>
            <Autocomplete
              loading={brandLoading}
              value={brand}
              size="small"
              fullWidth
              options={allBrands}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setBrand(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.8}>
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
          <Grid item xs={12} sm={6} md={1.8}>
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
          <Grid item xs={12} md={1.5}>
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
                {['Due', 'Partial', 'Paid']?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allExpenses}
        options={(el) => (
          <OperationExpenseRow key={el.id} sn={sn++} data={el} />
        )}
        extra={
          allExpenses?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={4}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                Total
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {sum?._sum?.quantity || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {'AVG: ' + sum?._avg?.unitPrice || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {sum?._sum?.amount || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                colSpan={3}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              ></StyledTableCellWithBorder>
            </TableRow>
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

export default OperationExpenses;
