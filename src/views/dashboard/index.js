// material-ui
import Grid from '@mui/material/Grid';
import {
  IconCurrencyTaka,
  IconMinus,
  IconPercentage,
} from '@tabler/icons-react';
import './config/chart.css';

// project imports

import { gridSpacing } from 'store/constant';
import DashCard from './DashCard';
import {
  useBalanceSheetQuery,
  useSummaryReportQuery,
} from 'store/api/report/reportSlice';
import { totalSum } from 'views/utilities/NeedyFunction';
import SalesQuantityChart from './SalesQuantityChart';
import ProductAnalysisChart from './ProductAnalysisChart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { data, isLoading } = useSummaryReportQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: balanceSheetData, isLoading: balanceLoading } =
    useBalanceSheetQuery('', {
      refetchOnMountOrArgChange: true,
    });

  const allSummaryReports = data?.report || [];
  const allBalanceReport = balanceSheetData?.report;

  // calculation
  const totalQuantity = totalSum(allSummaryReports, 'totalQty');
  const totalAmount = totalSum(allSummaryReports, 'amount');

  // expense calculation
  const getExpenses = allBalanceReport?.expenses || [];
  const lessExpenses = getExpenses?.reduce(
    (acc, el) => acc + (el._sum?.amount || 0),
    0
  );
  const totalExpenses =
    lessExpenses + (allBalanceReport?.bills?._sum?.amount || 0);

  const profit = totalAmount - totalExpenses;
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6} md={3}>
        <DashCard
          title="Sales Quantity"
          value={totalQuantity}
          loading={isLoading || balanceLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashCard
          title="Sales Amount"
          value={`৳ ${totalAmount}`}
          loading={isLoading || balanceLoading}
          Icon={IconCurrencyTaka}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashCard
          title="Total Expenses"
          value={`৳ ${totalExpenses}`}
          loading={isLoading || balanceLoading}
          Icon={IconMinus}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashCard
          title="Net Profit"
          value={`৳ ${profit}`}
          loading={isLoading || balanceLoading}
          Icon={IconPercentage}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SalesQuantityChart data={allSummaryReports} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductAnalysisChart data={allSummaryReports[0]?.products || []} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
