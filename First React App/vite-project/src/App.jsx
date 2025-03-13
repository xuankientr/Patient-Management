import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          // Improved dark mode colors
          colorTextBase: darkMode ? '#e6f4ff' : '#000', // Slightly bluer white for better readability
          colorBgBase: darkMode ? '#111827' : '#fff', // Softer dark background with blue tint
          colorBgContainer: darkMode ? '#1f2937' : '#fff', // Lighter container background
          colorTextSecondary: darkMode ? '#cbd5e1' : '#666', // Higher contrast secondary text
          colorBorder: darkMode ? '#374151' : '#d9d9d9', // More visible borders
          borderRadius: 6, // Slightly rounded corners for all components
        },
        components: {
          Layout: {
            headerBg: darkMode ? '#0f172a' : '#fff', // Darker header for contrast
            siderBg: darkMode ? '#111827' : '#fff', // Matching sidebar
            bodyBg: darkMode ? '#111827' : '#f0f2f5', // Main content area
          },
          Card: {
            colorBgContainer: darkMode ? '#1f2937' : '#fff', // Card background
            boxShadow: darkMode
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)'
              : '0 1px 2px rgba(0, 0, 0, 0.1)', // Enhanced shadows for depth
          },
          Table: {
            colorBgContainer: darkMode ? '#1f2937' : '#fff',
            headerBg: darkMode ? '#374151' : '#fafafa', // Distinct header
          },
          Button: {
            colorText: darkMode ? '#e6f4ff' : '#000', // Button text
            colorBgTextHover: darkMode ? '#374151' : '#f0f0f0', // Text button hover
          },
          Input: {
            colorBgContainer: darkMode ? '#374151' : '#fff', // Input background
            colorBorder: darkMode ? '#4b5563' : '#d9d9d9', // Input border
          },
          Select: {
            colorBgContainer: darkMode ? '#374151' : '#fff', // Select background
            colorBorder: darkMode ? '#4b5563' : '#d9d9d9', // Select border
          },
          Menu: {
            colorItemBg: darkMode ? '#111827' : '#fff', // Menu background
            colorItemText: darkMode ? '#e6f4ff' : '#000', // Menu text
            colorItemTextSelected: '#1677ff', // Selected menu item text
            colorItemBgSelected: darkMode ? '#1e293b' : '#e6f4ff', // Selected menu background
          },
          Drawer: {
            colorBgElevated: darkMode ? '#1f2937' : '#fff', // Drawer background
          },
          Modal: {
            colorBgElevated: darkMode ? '#1f2937' : '#fff', // Modal background
          },
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - redirect to dashboard if already logged in */}
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected routes - require authentication */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/patients'
              element={
                <ProtectedRoute>
                  <PatientList
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                  />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route path='/' element={<Navigate to='/dashboard' replace />} />

            {/* Catch-all route for undefined routes */}
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
