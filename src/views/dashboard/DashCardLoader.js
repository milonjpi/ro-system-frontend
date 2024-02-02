import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const DashCardLoader = () => {
  return (
    <Paper
      sx={{
        p: 2,
        boxShadow: '0px 4px 6px #ede7f6',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={18}
            width={200}
            sx={{ mb: 1.5, width: '100%', borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={25}
            sx={{ width: '100%', borderRadius: 1 }}
          />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            height={40}
            width={40}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default DashCardLoader;
