import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { useLocation, Link, Outlet } from 'react-router-dom';

const NavItem = styled(ButtonBase)`
  border-radius: 5px 5px 0 0;
  min-width: 125px;
`;

const paymentReportList = [
  {
    id: 1,
    label: 'Summary',
    path: '',
  },
  {
    id: 2,
    label: 'Due Report',
    path: 'due-payment',
  },
  {
    id: 3,
    label: 'Advance Report',
    path: 'advance-report',
  },
];

const PaymentReport = () => {
  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[4] || '';

  return (
    <>
      <Box
        sx={{
          px: 2,
          pt: 2,
          background: 'linear-gradient(195deg, #42424a, #191919)',
          borderRadius: '5px 5px 0 0',
        }}
      >
        <Typography sx={{ fontSize: 18, color: '#fff', lineHeight: 1 }}>
          Payment Report
        </Typography>

        <Box sx={{ mt: 1.5 }}>
          {paymentReportList?.map((el) => (
            <NavItem
              key={el.id}
              component={Link}
              to={`${el.path}`}
              sx={{
                py: 0.6,
                px: 1.5,
                minWidth: 80,
                color: path === el.path ? '#191919' : '#fff',
                background: path === el.path ? '#fff' : 'transparent',
              }}
            >
              {el.label}
            </NavItem>
          ))}
        </Box>
      </Box>
      <Box sx={{ pt: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default PaymentReport;
