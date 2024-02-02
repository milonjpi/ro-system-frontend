import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconShoppingBag } from '@tabler/icons-react';
import DashCardLoader from './DashCardLoader';

const DashCard = ({
  title = 'Title',
  value = 0,
  Icon = IconShoppingBag,
  loading = false,
}) => {
  if (loading) {
    return <DashCardLoader />;
  }

  return (
    <Paper
      sx={{
        p: 2,
        boxShadow: '0px 4px 6px #ede7f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ pr: 1 }}>
        <Typography sx={{ color: '#8c8c8c', fontSize: 14, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography
          sx={{
            color: '#111',
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 2,
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          background: '#5e35b1',
          height: 40,
          width: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Icon
          style={{
            background: '#fff',
            color: '#5e35b1',
            borderRadius: '50%',
            padding: 2,
          }}
          size={22}
        />
      </Box>
    </Paper>
  );
};

export default DashCard;
