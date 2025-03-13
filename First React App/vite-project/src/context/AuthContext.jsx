import { createContext, useState, useEffect, useContext } from 'react';
import { message } from 'antd';
import { login } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    if (storedUser && loginTime) {
      const parsedUser = JSON.parse(storedUser);
      const now = new Date().getTime();

      // Changed from 1 hour to 5 minutes (300000 ms) for token expiration
      const fiveMinutes = 5 * 60 * 1000;

      if (now - Number.parseInt(loginTime) < fiveMinutes) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        setUser(null);
        message.info('Your session has expired. Please log in again.');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const userData = await login(email, password);
      setUser(userData);
      const loginTime = new Date().getTime();
      localStorage.setItem('loginTime', loginTime.toString());
      localStorage.setItem('user', JSON.stringify(userData));
      message.success('Login successful!');
      return true;
    } catch (error) {
      message.error(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    message.success('Logout successful!');
  };

  // Add a method to refresh the token/session
  const refreshSession = () => {
    if (user) {
      const loginTime = new Date().getTime();
      localStorage.setItem('loginTime', loginTime.toString());
      message.success('Session refreshed successfully!');
      return true;
    }
    return false;
  };

  const value = {
    user,
    login: loginUser,
    logout,
    loading,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };
