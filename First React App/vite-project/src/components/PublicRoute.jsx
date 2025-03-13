import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

export default PublicRoute;
