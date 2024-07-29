import '../../../dashboard/config/chart.css';
// material-ui
import Grid from '@mui/material/Grid';

// project imports

import { gridSpacing } from 'store/constant';
import MonthOverview from './MonthOverview';
import YearOverview from './YearOverview';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ElectricOverview = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={6}>
        <MonthOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <YearOverview />
      </Grid>
    </Grid>
  );
};

export default ElectricOverview;
