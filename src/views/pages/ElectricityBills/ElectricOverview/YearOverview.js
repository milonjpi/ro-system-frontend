import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import ReactApexChart from 'react-apexcharts';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import { useGetElectricYearSummaryQuery } from 'store/api/electricityBill/electricityBillApi';
import yearLineChart from './config/yearLineChart';
import { electricYears } from 'assets/data';

const YearOverview = () => {
  // library
  const { data: meterData } = useGetMetersQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.meters || [];
  // end library

  // fetching and filtering
  const query = {};

  const { data } = useGetElectricYearSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSummary = data?.data || [];

  const mappedData = allMeters?.map((el) => ({
    name: el.label,
    data: electricYears?.map((ey) => {
      const findValue = allSummary?.find(
        (as) => as.year === ey && as.meterId === el.id
      );

      return findValue?._sum?.amount || 0;
    }),
    offsetY: 0,
  }));

  const series = mappedData;
  return (
    <MainCard title="Yearly Summary" headerX={{ py: 2.4 }}>
      <Box>
        <ReactApexChart
          options={yearLineChart.options}
          series={series}
          className="line-chart"
          type="area"
          height={300}
          width={'100%'}
        />
      </Box>
      <Typography
        sx={{ textAlign: 'center', lineHeight: 1, pt: 1.5, fontWeight: 700 }}
      >
        Yearly Summary
      </Typography>
    </MainCard>
  );
};

export default YearOverview;
