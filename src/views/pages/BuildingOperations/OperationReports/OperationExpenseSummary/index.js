import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { Autocomplete, TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetBuildingExpenseHeadsQuery } from 'store/api/buildingExpenseHead/buildingExpenseHeadApi';
import { useGetBuildingVendorsQuery } from 'store/api/buildingVendor/buildingVendorApi';
import { useGetBuildingBrandsQuery } from 'store/api/buildingBrand/buildingBrandApi';
import { useGetBuildingExpenseSummaryQuery } from 'store/api/buildingExpense/buildingExpenseApi';
import OperationExpenseSummaryRow from './OperationExpenseSummaryRow';

const OperationExpenseSummary = () => {
  const [expenseHead, setExpenseHead] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
      title: 'EXPENSE HEAD',
    },
    {
      title: 'QUANTITY',
      align: 'right',
    },
    {
      title: 'AVG. UNIT PRICE',
      align: 'right',
    },
    {
      title: 'AMOUNT',
      align: 'right',
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

  const { data, isLoading } = useGetBuildingExpenseSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  const totalAmount = allExpenses?.reduce(
    (acc, el) => el._sum?.amount + acc,
    0
  );

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard title="Expense Summary">
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={2.5}>
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
          <Grid item xs={12} sm={6} md={2}>
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
          <Grid item xs={12} sm={6} md={2}>
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
        bordered
        tableHeads={tableHeads}
        data={allExpenses.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
        options={(el, index) => (
          <OperationExpenseSummaryRow key={index} sn={sn++} data={el} />
        )}
        extra={
          allExpenses?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={4}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                TOTAL
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {totalAmount}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={allExpenses?.length || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default OperationExpenseSummary;
