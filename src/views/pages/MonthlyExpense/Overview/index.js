import { Grid } from '@mui/material';
import MonthlyExpenseChart from './MonthlyExpenseChart';
import YearlyExpenseChart from './YearlyExpenseChart';
import HeadWiseExpenseChart from './HeadWiseExpenseChart';

const Overview = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <MonthlyExpenseChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <YearlyExpenseChart />
      </Grid>
      <Grid item xs={12}>
        <HeadWiseExpenseChart />
      </Grid>
    </Grid>
  );
};

export default Overview;
