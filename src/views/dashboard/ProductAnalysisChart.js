import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MainCard from 'ui-component/cards/MainCard';
import ReactApexChart from 'react-apexcharts';
import lineChart from './config/lineChart';
import { useState } from 'react';
import moment from 'moment';
import { useGetProductsQuery } from 'store/api/product/productApi';
import { monthsOfYear } from 'constants/globals';

const ProductAnalysisChart = ({ data }) => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const filterReports = data?.filter((el) => el.year === year);

  // library
  const { data: productData } = useGetProductsQuery(
    { limit: 5, isActive: true, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allProducts = productData?.products || [];
  // end library

  const mappedData = allProducts?.map((el) => ({
    name: el.label,
    data: monthsOfYear?.map((month) => {
      const findValue = filterReports?.find(
        (fv) => fv.month === month.toString() && fv.productId === el.id
      );
      return findValue?.quantity || 0;
    }),
    offsetY: 0,
  }));

  const series = mappedData;
  return (
    <MainCard
      title={`Product Analysis ${year}`}
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
          options={lineChart.options}
          series={series}
          className="line-chart"
          type="area"
          height={300}
          width={'100%'}
        />
      </Box>
    </MainCard>
  );
};

export default ProductAnalysisChart;
