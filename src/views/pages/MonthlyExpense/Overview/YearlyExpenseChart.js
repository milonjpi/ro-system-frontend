import { Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import moment from 'moment';
import { useGetAreaWiseDashMonthlyReportQuery } from 'store/api/monthlyExpense/monthlyExpenseApi';

const YearlyExpenseChart = () => {
  const [year, setYear] = useState(moment().format('YYYY'));

  // filtering and pagination
  const query = {};

  if (year) {
    query['year'] = year;
  }

  const { data } = useGetAreaWiseDashMonthlyReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  const optionCat = allExpenses?.map((el) => el.expenseArea);
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
      text: `Monthly Expense Summary of ${year}`,
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

export default YearlyExpenseChart;
