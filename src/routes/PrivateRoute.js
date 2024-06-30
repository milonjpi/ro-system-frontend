import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from 'services/auth.service';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { selectRefresh } from 'store/refreshSlice';
import LoadingPage from 'ui-component/LoadingPage';
import Login from 'views/login';

const PrivateRoute = () => {
  const refresh = useSelector(selectRefresh);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isLoading } = useGetProfileQuery(
    { isLogin },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setLoading(false);
  }, [refresh]);

  if (loading || (isLogin && isLoading)) {
    return <LoadingPage />;
  }

  return isLogin ? <Outlet /> : <Login />;
};

export default PrivateRoute;
