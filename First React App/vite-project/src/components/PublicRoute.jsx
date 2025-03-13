import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * PublicRoute component prevents authenticated users from accessing
 * public routes like login and register pages.
 * If user is authenticated, they are redirected to the dashboard.
 */
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // If still loading auth state, don't redirect yet
  if (loading) {
    return null;
  }

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  // Otherwise, render the children (login/register page)
  return children;
};

export default PublicRoute;
