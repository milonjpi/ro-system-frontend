import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import columnChart from './config/columnChart';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import moment from 'moment';
import { monthsOfYear } from 'constants/globals';

const SalesQuantityChart = ({ data }) => {
  const [year, setYear] = useState(moment().format('YYYY'));

  const filterReports = data?.filter((el) => el.year === year);

  const mappedData = monthsOfYear?.map((el) => {
    const findValue = filterReports?.find((fv) => fv.month === el.toString());
    return findValue?.totalQty || 0;
  });
  const series = [
    {
      name: 'Sales Quantity',
      data: mappedData,
      color: '#fff',
    },
  ];

  return (
    <MainCard
      title={`Sales Summary ${year}`}
      secondary={
        <FormControl fullWidth size="small">
          <InputLabel id="select-year-id">Year</InputLabel>
          <Select
            labelId="select-year-id"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((el) => (
              <MenuItem key={el} value={`${2023 + el}`}>
                {2023 + el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
      headerX={{ py: 1.5 }}
    >
      <Box>
        <ReactApexChart
          className="bar-chart"
          options={columnChart.options}
          series={series}
          type="bar"
          height={300}
        />
      </Box>
    </MainCard>
  );
};

export default SalesQuantityChart;
