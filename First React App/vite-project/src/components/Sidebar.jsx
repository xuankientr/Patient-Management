import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed, darkMode }) => {
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to='/dashboard'>Dashboard</Link>,
    },
    {
      key: '/patients',
      icon: <TeamOutlined />,
      label: <Link to='/patients'>List Patients</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => logout(),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='h-screen'
      width={220}
      style={{
        boxShadow: darkMode ? '1px 0 5px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className='p-4'>
        {collapsed ? (
          <div
            className={`text-lg font-bold text-center ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >
            VTC
          </div>
        ) : (
          <div
            className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >
            VTC Academy
          </div>
        )}
      </div>

      <div className='px-4'>
        {!collapsed && user && (
          <div className='flex items-center mb-4'>
            <UserOutlined
              className={`text-xl mr-2 ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            />
            <div
              className={`text-base ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {user.fullName || 'Guest'}
            </div>
          </div>
        )}
      </div>

      <Menu
        mode='inline'
        selectedKeys={[location.pathname]}
        items={menuItems}
        className='flex-1'
        style={{
          background: darkMode ? '#111827' : '#fff',
          color: darkMode ? '#e6f4ff' : '#000',
        }}
      />

      <div className='absolute bottom-0 w-full flex justify-center p-2'>
        <Button
          type='text'
          icon={
            collapsed ? (
              <MenuUnfoldOutlined
                className={darkMode ? 'text-white' : 'text-black'}
              />
            ) : (
              <MenuFoldOutlined
                className={darkMode ? 'text-white' : 'text-black'}
              />
            )
          }
          onClick={toggleCollapsed}
          className={`w-full text-left ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
