import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import moment from 'moment';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import { electricMonths, electricYears } from 'assets/data';
import { useGetElectricMonthSummaryQuery } from 'store/api/electricityBill/electricityBillApi';
import columnChart from 'views/dashboard/config/columnChart';

const MonthOverview = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [meter, setMeter] = useState(null);

  // library
  const { data: meterData, isLoading: meterLoading } = useGetMetersQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.meters || [];
  // end library

  // fetching and filtering
  const query = {};

  if (year) {
    query['year'] = year;
  }

  if (meter) {
    query['meterId'] = meter.id;
  }

  const { data } = useGetElectricMonthSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSummary = data?.data || [];

  const mappedData = electricMonths?.map((el) => {
    const findValue = allSummary?.find((fv) => fv.month === el);
    return findValue?._sum?.amount || 0;
  });
  const series = [
    {
      name: 'Month Bill',
      data: mappedData,
      color: '#fff',
    },
  ];

  return (
    <MainCard
      title={
        <Autocomplete
          value={meter}
          loading={meterLoading}
          size="small"
          sx={{ width: 180 }}
          options={allMeters}
          getOptionLabel={(option) =>
            option.label + (option.location ? ', ' + option?.location : '')
          }
          onChange={(e, newValue) => setMeter(newValue)}
          isOptionEqualToValue={(item, value) => item.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Select Meter" />
          )}
        />
      }
      secondary={
        <FormControl fullWidth size="small">
          <InputLabel id="select-year-id">Year</InputLabel>
          <Select
            labelId="select-year-id"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            {electricYears.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
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
      <Typography
        sx={{ textAlign: 'center', lineHeight: 1, pt: 1.5, fontWeight: 700 }}
      >
        Month Bills {year}
      </Typography>
    </MainCard>
  );
};

export default MonthOverview;
