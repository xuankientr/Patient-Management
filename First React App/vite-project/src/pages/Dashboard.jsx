import { useState, useEffect, useContext } from 'react';
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Switch,
} from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  MedicineBoxOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = ({ toggleDarkMode, darkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalPatients: 0,
    newPatients: 0,
    activePatients: 0,
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/patients');
        const patients = response.data;

        const totalPatients = patients.length;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newPatients = patients.filter(
          (patient) => new Date(patient.createdAt) > thirtyDaysAgo
        ).length;
        const activePatients = patients.filter(
          (patient) => !patient.archived
        ).length;

        setStats({
          totalPatients,
          newPatients,
          activePatients,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className='min-h-screen'>
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        darkMode={darkMode}
      />

      <Layout>
        <Header
          className='flex items-center justify-between px-6 py-4'
          style={{
            background: darkMode ? '#141414' : '#fff', // Đảm bảo màu nền Header
          }}
        >
          <Title
            level={4}
            className='m-0'
            style={{ color: darkMode ? '#e6f7ff' : '#000' }}
          >
            Dashboard
          </Title>
          <div>
            <Switch
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
              checked={darkMode}
              onChange={toggleDarkMode}
              className='ml-4'
            />
          </div>
        </Header>
        <Content
          className='p-6'
          style={{
            background: darkMode ? '#111827' : '#f0f2f5',
          }}
        >
          <div className='mb-6'>
            <Title level={3} style={{ color: darkMode ? '#e6f7ff' : '#000' }}>
              Welcome, {user?.fullName}
            </Title>
            <p style={{ color: darkMode ? '#b0b0b0' : '#666' }}>
              Here's an overview of your patient management system
            </p>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title='Total Patients'
                  value={stats.totalPatients}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: darkMode ? '#e6f7ff' : '#000' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title='New Patients (30 days)'
                  value={stats.newPatients}
                  prefix={<UserAddOutlined />}
                  valueStyle={{ color: darkMode ? '#e6f7ff' : '#000' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title='Active Patients'
                  value={stats.activePatients}
                  prefix={<MedicineBoxOutlined />}
                  valueStyle={{ color: darkMode ? '#e6f7ff' : '#000' }}
                />
              </Card>
            </Col>
          </Row>

          <div className='mt-6'>
            <Button type='primary' size='large' href='/patients'>
              Manage Patients
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
