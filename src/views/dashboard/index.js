import './config/chart.css';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import DistDashboard from './DistDashboard';
import VendorDashboard from './VendorDashboard';

const Dashboard = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  if (userData?.distributor) {
    return <DistDashboard userData={userData} />;
  }
  return <VendorDashboard />;
};

export default Dashboard;
