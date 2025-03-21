import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import moment from 'moment';
import { useGetOpeningBalancesQuery } from 'store/api/openingBalance/openingBalanceApi';
import { Autocomplete, TableRow } from '@mui/material';
import { allMonths } from 'assets/data';
import { useGetPaymentSourcesQuery } from 'store/api/paymentSource/paymentSourceApi';
import PresentBalanceRow from './PresentBalanceRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const PresentBalance = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [paymentSource, setPaymentSource] = useState(null);

  // library
  const { data: paymentSourceData, isLoading: paymentSourceLoading } =
    useGetPaymentSourcesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allPaymentSources = paymentSourceData?.paymentSources || [];
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
      title: 'Year',
    },
    {
      title: 'Month',
    },
    {
      title: 'Payment Source',
    },
    {
      title: 'Opening Balance',
      align: 'right',
    },
    {
      title: 'Expense',
      align: 'right',
    },
    {
      title: 'Present Balance',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'createdAt';
  query['sortOrder'] = 'desc';

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  if (paymentSource) {
    query['paymentSourceId'] = paymentSource?.id;
  }

  const { data, isLoading } = useGetOpeningBalancesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allOpeningBalances = data?.openingBalances || [];
  const meta = data?.meta;

  // calculation
  const openingAmount = totalSum(allOpeningBalances, 'amount');
  const expenseAmount = totalSum(
    allOpeningBalances?.map((el) => ({
      amount: totalSum(el.paymentSource?.monthlyExpenses || [], 'amount'),
    })),
    'amount'
  );
  return (
    <SubCard title="Present Balance">
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((el) => (
                  <MenuItem key={el} value={`${2024 + el}`}>
                    {2024 + el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-month-id">Month</InputLabel>
              <Select
                labelId="select-month-id"
                value={month}
                label="Month"
                onChange={(e) => setMonth(e.target.value)}
              >
                {allMonths.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={paymentSourceLoading}
              value={paymentSource}
              size="small"
              fullWidth
              options={allPaymentSources}
              onChange={(e, newValue) => setPaymentSource(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Payment Source" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allOpeningBalances}
        options={(el, index) => (
          <PresentBalanceRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
          />
        )}
        extra={
          allOpeningBalances?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={4}
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                TOTAL
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {openingAmount}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {expenseAmount}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {openingAmount - expenseAmount}
              </StyledTableCellWithBorder>
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
    </SubCard>
  );
};

export default PresentBalance;
