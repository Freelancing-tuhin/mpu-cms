import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const { user }: any = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
