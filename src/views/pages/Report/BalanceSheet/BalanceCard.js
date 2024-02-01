import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import Skeleton from '@mui/material/Skeleton';

const BalanceCard = ({
  title = 'Title',
  value = 0,
  loading = false,
  loadItem = 2,
  children,
}) => {
  return (
    <MainCard
      title={title}
      sx={{ borderColor: '#3641521c' }}
      headerX={{ py: 1.5, background: '#3641521a' }}
      secondary={
        <Typography sx={{ fontWeight: 700, pt: 1 }}>{value}</Typography>
      }
    >
      {loading ? (
        <>
          <Skeleton animation="wave" height={60} />
          {loadItem > 1 && <Skeleton animation="wave" height={60} />}
        </>
      ) : (
        children
      )}
    </MainCard>
  );
};

export default BalanceCard;
