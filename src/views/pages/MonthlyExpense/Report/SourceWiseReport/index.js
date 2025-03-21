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
import { Autocomplete, TableRow } from '@mui/material';
import { useGetSourceWiseMonthlyReportQuery } from 'store/api/monthlyExpense/monthlyExpenseApi';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import groupBy from 'lodash.groupby';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useGetExpenseAreasQuery } from 'store/api/expenseArea/expenseAreaApi';
import { useGetAllMonthlyExpenseHeadsQuery } from 'store/api/monthlyExpenseHead/monthlyExpenseHeadApi';
import SourceWiseReportRow from './SourceWiseReportRow';

const SourceWiseReport = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [expenseArea, setExpenseArea] = useState(null);
  const [monthlyExpenseHead, setMonthlyExpenseHead] = useState(null);

  // library
  const { data: expenseAreaData, isLoading: expenseAreaLoading } =
    useGetExpenseAreasQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseAreas = expenseAreaData?.expenseAreas || [];

  const { data: expenseHeadData, isLoading: expenseHeadLoading } =
    useGetAllMonthlyExpenseHeadsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseHeads = expenseHeadData?.monthlyExpenseHeads || [];
  // end library

  // table
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Payment Source',
    },
    {
      title: 'Jan',
      align: 'right',
    },
    {
      title: 'Feb',
      align: 'right',
    },
    {
      title: 'Mar',
      align: 'right',
    },
    {
      title: 'Apr',
      align: 'right',
    },
    {
      title: 'May',
      align: 'right',
    },
    {
      title: 'Jun',
      align: 'right',
    },
    {
      title: 'Jul',
      align: 'right',
    },
    {
      title: 'Aug',
      align: 'right',
    },
    {
      title: 'Sep',
      align: 'right',
    },
    {
      title: 'Oct',
      align: 'right',
    },
    {
      title: 'Nov',
      align: 'right',
    },
    {
      title: 'Dec',
      align: 'right',
    },
    {
      title: 'Total',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  if (year) {
    query['year'] = year;
  }

  if (monthlyExpenseHead) {
    query['monthlyExpenseHeadId'] = monthlyExpenseHead?.id;
  }

  if (expenseArea) {
    query['expenseAreaId'] = expenseArea?.id;
  }

  const { data, isLoading } = useGetSourceWiseMonthlyReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];
  const groupedResult = groupBy(allExpenses, (el) => el.paymentSource?.label);
  const arrayGroup = Object.entries(groupedResult);

  // calculation
  const jan = allExpenses?.filter((el) => el.month === 'January');
  const feb = allExpenses?.filter((el) => el.month === 'February');
  const mar = allExpenses?.filter((el) => el.month === 'March');
  const apr = allExpenses?.filter((el) => el.month === 'April');
  const may = allExpenses?.filter((el) => el.month === 'May');
  const jun = allExpenses?.filter((el) => el.month === 'June');
  const jul = allExpenses?.filter((el) => el.month === 'July');
  const aug = allExpenses?.filter((el) => el.month === 'August');
  const sep = allExpenses?.filter((el) => el.month === 'September');
  const oct = allExpenses?.filter((el) => el.month === 'October');
  const nov = allExpenses?.filter((el) => el.month === 'November');
  const dec = allExpenses?.filter((el) => el.month === 'December');
  return (
    <SubCard title="Payment Source Wise Summary">
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
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              loading={expenseAreaLoading}
              value={expenseArea}
              size="small"
              fullWidth
              options={allExpenseAreas}
              onChange={(e, newValue) => setExpenseArea(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Expense Area" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={expenseHeadLoading}
              value={monthlyExpenseHead}
              size="small"
              fullWidth
              options={allExpenseHeads}
              onChange={(e, newValue) => setMonthlyExpenseHead(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Expense Head" />
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
        data={arrayGroup}
        options={(el, index) => (
          <SourceWiseReportRow
            key={index}
            sn={index + 1}
            source={el[0]}
            data={el[1]}
          />
        )}
        extra={
          allExpenses?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={2}
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
                {totalSum(jan, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(feb, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(mar, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(apr, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(may, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(jun, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(jul, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(aug, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(sep, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(oct, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(nov, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(dec, 'amount')}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {totalSum(allExpenses, 'amount')}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
        loading={isLoading}
      />

      {/* end data table */}
    </SubCard>
  );
};

export default SourceWiseReport;
