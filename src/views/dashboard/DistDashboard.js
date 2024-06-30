import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  IconInfoSquareRounded,
  IconLicense,
  IconServer,
} from '@tabler/icons-react';
import { gridSpacing } from 'store/constant';
import MainDashCard from './MainDashCard';
import { useGetDistDashboardQuery } from 'store/api/distReport/distReportApi';

const DistDashboard = ({ userData }) => {
  const { data } = useGetDistDashboardQuery(
    { distributorId: userData?.distributorId || '123' },
    { refetchOnMountOrArgChange: true }
  );
  const allReport = data?.report;

  const profitLoss =
    (allReport?.saleAmount || 0) -
    (allReport?.buyAmount || 0) -
    (allReport?.expense || 0);

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Purchase"
            value={allReport?.buyAmount || 0}
            variant="dark"
            base={
              <span>
                Purchase Quantity:{' '}
                <span style={{ fontWeight: 500 }}>
                  {allReport?.buyQuantity || 0}
                </span>
              </span>
            }
            icon={IconInfoSquareRounded}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Sales"
            value={allReport?.saleAmount || 0}
            variant="primary"
            base={
              <span>
                Sales Quantity:{' '}
                <span style={{ fontWeight: 500 }}>
                  {allReport?.saleQuantity || 0}
                </span>
              </span>
            }
            icon={IconInfoSquareRounded}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Expense"
            value={allReport?.expense || 0}
            variant="error"
            base="Total Expenses"
            icon={IconLicense}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Profit/Loss"
            value={profitLoss}
            variant={profitLoss >= 0 ? 'profit' : 'loss'}
            base={
              <span style={{ fontSize: 11, paddingTop: 3, fontWeight: 500 }}>
                Correct When Purchase = Sales
              </span>
            }
            icon={IconServer}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DistDashboard;
