import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, Link, Outlet } from 'react-router-dom';

const menuList = [
  {
    id: 1,
    label: 'Clients',
    path: '',
  },
  {
    id: 2,
    label: 'Vendors',
    path: 'vendors',
  },
  {
    id: 3,
    label: 'Products',
    path: 'ro-products',
  },
  {
    id: 4,
    label: 'Expense Heads',
    path: 'expense-heads',
  },
  {
    id: 5,
    label: 'Expense Details',
    path: 'expense-details',
  },
  {
    id: 6,
    label: 'Account Types',
    path: 'account-types',
  },
  {
    id: 7,
    label: 'Account Heads',
    path: 'account-heads',
  },
  {
    id: 8,
    label: 'Payment Methods',
    path: 'payment-methods',
  },
];

const RoLibrary = () => {
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

export default RoLibrary;
