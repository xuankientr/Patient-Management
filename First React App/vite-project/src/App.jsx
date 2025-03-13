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

          colorTextBase: darkMode ? '#e6f4ff' : '#000',
          colorBgBase: darkMode ? '#111827' : '#fff',
          colorBgContainer: darkMode ? '#1f2937' : '#fff',
          colorTextSecondary: darkMode ? '#cbd5e1' : '#666',
          colorBorder: darkMode ? '#374151' : '#d9d9d9',
          borderRadius: 6,
        },
        components: {
          Layout: {
            headerBg: darkMode ? '#0f172a' : '#fff',
            siderBg: darkMode ? '#111827' : '#fff',
            bodyBg: darkMode ? '#111827' : '#f0f2f5',
          },
          Card: {
            colorBgContainer: darkMode ? '#1f2937' : '#fff',
            boxShadow: darkMode
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)'
              : '0 1px 2px rgba(0, 0, 0, 0.1)',
          },
          Table: {
            colorBgContainer: darkMode ? '#1f2937' : '#fff',
            headerBg: darkMode ? '#374151' : '#fafafa',
          },
          Button: {
            colorText: darkMode ? '#e6f4ff' : '#000',
            colorBgTextHover: darkMode ? '#374151' : '#f0f0f0',
          },
          Input: {
            colorBgContainer: darkMode ? '#374151' : '#fff',
            colorBorder: darkMode ? '#4b5563' : '#d9d9d9',
          },
          Select: {
            colorBgContainer: darkMode ? '#374151' : '#fff',
            colorBorder: darkMode ? '#4b5563' : '#d9d9d9',
          },
          Menu: {
            colorItemBg: darkMode ? '#111827' : '#fff',
            colorItemText: darkMode ? '#e6f4ff' : '#000',
            colorItemTextSelected: '#1677ff',
            colorItemBgSelected: darkMode ? '#1e293b' : '#e6f4ff',
          },
          Drawer: {
            colorBgElevated: darkMode ? '#1f2937' : '#fff',
          },
          Modal: {
            colorBgElevated: darkMode ? '#1f2937' : '#fff',
          },
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
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

            <Route path='/' element={<Navigate to='/dashboard' replace />} />

            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
