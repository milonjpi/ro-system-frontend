import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, Link, Outlet } from 'react-router-dom';

const menuList = [
  {
    id: 1,
    label: 'Summary',
    path: '',
  },
  {
    id: 2,
    label: 'Daily Report',
    path: 'daily-report',
  },
  {
    id: 3,
    label: 'Balance Sheet',
    path: 'balance-sheet',
  },
  {
    id: 4,
    label: 'Due Report',
    path: 'due-report',
  },
  {
    id: 5,
    label: 'Advance Report',
    path: 'advance-report',
  },
];

const RoReport = () => {
  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[4] || '';

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={path}
          textColor="secondary"
          indicatorColor="secondary"
          size="small"
          variant="scrollable"
          scrollButtons="auto"
        >
          {menuList?.map((el) => (
            <Tab
              key={el.id}
              value={el.path}
              label={el.label}
              component={Link}
              to={`${el.path}`}
            />
          ))}
        </Tabs>
      </Paper>
      <Box sx={{ pt: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default RoReport;
