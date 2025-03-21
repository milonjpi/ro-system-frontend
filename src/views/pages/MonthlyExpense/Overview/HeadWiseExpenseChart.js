import { Autocomplete, Grid, Paper, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import moment from 'moment';
import { allMonths } from 'assets/data';
import { useGetExpenseAreasQuery } from 'store/api/expenseArea/expenseAreaApi';
import { useGetHeadWiseDashMonthlyReportQuery } from 'store/api/monthlyExpense/monthlyExpenseApi';

const HeadWiseExpenseChart = () => {
  const [expenseArea, setExpenseArea] = useState(null);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));

  // library
  const { data: expenseAreaData, isLoading: expenseAreaLoading } =
    useGetExpenseAreasQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allExpenseAreas = expenseAreaData?.expenseAreas || [];
  // end library

  // filtering and pagination
  const query = {};

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  if (expenseArea) {
    query['expenseAreaId'] = expenseArea?.id;
  }

  const { data } = useGetHeadWiseDashMonthlyReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  const optionCat = allExpenses?.map((el) => el.expenseHead);
  const optionData = allExpenses?.map((el) => el.amount);

  const series = [
    {
      name: 'ExpenseSummary',
      data: optionData,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '৳';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },

    xaxis: {
      categories: optionCat,
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '৳';
        },
      },
    },
    title: {
      text: `Expense Head Wise Summary of ${month}, ${year}`,
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  return (
    <div>
      <Paper sx={{ p: 1, mb: 1 }}>
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item xs={12} md={3.5}>
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
          <Grid item xs={12} md={3.5}>
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
          <Grid item xs={12} md={5}>
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
        </Grid>
      </Paper>

      <Paper>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Paper>
    </div>
  );
};

export default HeadWiseExpenseChart;
