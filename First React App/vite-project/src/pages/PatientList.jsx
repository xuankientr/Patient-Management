import { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Button,
  Modal,
  Drawer,
  Form,
  Switch,
  message,
} from 'antd';
import { UserAddOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import PatientSearch from '../components/patients/PatientSearch';
import PatientTable from '../components/patients/PatientTable';
import PatientGrid from '../components/patients/PatientGrid';
import PatientForm from '../components/patients/PatientForm';
import PatientDetail from '../components/patients/PatientDetail';
import useDebounce from '../hooks/useDebounce';
import api from '../services/api';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const PatientList = ({ toggleDarkMode, darkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalForm] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState('view');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [editForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [filteredPatients, setFilteredPatients] = useState([]);

  
  const debouncedSearchText = useDebounce(searchText, 1500);

  useEffect(() => {
    fetchPatients();
  }, []);

  
  useEffect(() => {
    if (patients.length > 0) {
      setIsSearching(true);

      
      const filtered = patients.filter(
        (patient) =>
          (patient.name?.toLowerCase() || '').includes(
            debouncedSearchText.toLowerCase()
          ) ||
          (patient.email?.toLowerCase() || '').includes(
            debouncedSearchText.toLowerCase()
          ) ||
          (patient.phone?.toLowerCase() || '').includes(
            debouncedSearchText.toLowerCase()
          )
      );

      setFilteredPatients(filtered);
      setIsSearching(false);
    }
  }, [debouncedSearchText, patients]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/patients');
      const data = response.data || [];
      setPatients(data);
      setFilteredPatients(data); 
    } catch (error) {
      console.error('Error fetching patients:', error);
      message.error('Failed to fetch patients');
      setPatients([]);
      setFilteredPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    setIsSearching(true); 
  };

  const showAddModal = () => {
    modalForm.resetFields();
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    modalForm.submit();
  };

  const handleAddFormSubmit = async (values) => {
    try {
      const newPatient = {
        ...values,
        createdAt: new Date().toISOString(),
        archived: false,
        id: Date.now().toString(),
      };
      await api.post('/patients', newPatient);
      message.success('Patient added successfully');
      setIsModalVisible(false);
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
      message.error('Failed to add patient');
    }
  };

  const showViewDrawer = (patient) => {
    setDrawerMode('view');
    setCurrentPatient(patient);
    setDrawerVisible(true);
    setActiveTab('1');
  };

  const showEditDrawer = (patient) => {
    setDrawerMode('edit');
    setCurrentPatient(patient);
    editForm.setFieldsValue({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      status: patient.status,
      company: patient.company || '',
      title: patient.title || '',
      address: patient.address || '',
      notes: patient.notes || '',
      active: patient.active,
      timezone: patient.timezone || 'UTC (Coordinated Universal Time)',
      avatar: patient.avatar || '',
    });
    setDrawerVisible(true);
    setActiveTab('1');
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleEditFormSubmit = async (values) => {
    try {
      await api.put(`/patients/${currentPatient.id}`, {
        ...currentPatient,
        ...values,
        updatedAt: new Date().toISOString(),
      });
      message.success('Patient updated successfully');
      setDrawerVisible(false);
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
      message.error('Failed to update patient');
    }
  };

  const handleFieldEdit = async (field, value) => {
    if (!currentPatient) return;
    try {
      const updatedPatient = {
        ...currentPatient,
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
      await api.put(`/patients/${currentPatient.id}`, updatedPatient);
      setCurrentPatient(updatedPatient);
      message.success('Patient updated successfully');
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
      message.error('Failed to update patient');
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      message.success('Patient deleted successfully');
      fetchPatients();
      if (drawerVisible) closeDrawer();
    } catch (error) {
      console.error('Error deleting patient:', error);
      message.error('Failed to delete patient');
    }
  };

  const getDrawerTitle = () =>
    drawerMode === 'view' ? 'Patient Details' : 'Edit Patient';

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
            background: darkMode ? '#141414' : '#fff',
          }}
        >
          <Title level={4} className='m-0'>
            Patient Management
          </Title>
          <Switch
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
            checked={darkMode}
            onChange={toggleDarkMode}
            className='ml-4'
          />
        </Header>
        <Content
          className='p-6'
          style={{
            background: darkMode ? '#111827' : '#f0f2f5',
          }}
        >
          <div className='flex justify-between items-center mb-6'>
            <div>
              <Title level={3}>Patients</Title>
              <Text type='secondary'>
                Manage your patients
                {isSearching && searchText && (
                  <span className='ml-2 text-gray-400 text-sm italic'>
                    Searching will begin after 3 seconds of inactivity...
                  </span>
                )}
              </Text>
            </div>
            <Button
              type='primary'
              icon={<UserAddOutlined />}
              onClick={showAddModal}
            >
              Add new patient
            </Button>
          </div>

          <PatientSearch
            searchText={searchText}
            handleSearchInputChange={handleSearchInputChange}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isSearching={isSearching}
          />

          {viewMode === 'table' ? (
            <PatientTable
              patients={filteredPatients}
              loading={loading || isSearching}
              showViewDrawer={showViewDrawer}
              showEditDrawer={showEditDrawer}
              handleDeletePatient={handleDeletePatient}
              darkMode={darkMode}
            />
          ) : (
            <PatientGrid
              patients={filteredPatients}
              showViewDrawer={showViewDrawer}
              showEditDrawer={showEditDrawer}
              handleDeletePatient={handleDeletePatient}
              darkMode={darkMode}
            />
          )}

          <Modal
            title='Add New Patient'
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            width={700}
          >
            <PatientForm
              form={modalForm}
              onFinish={handleAddFormSubmit}
              mode='add'
            />
          </Modal>

          <Drawer
            title={getDrawerTitle()}
            placement='right'
            onClose={closeDrawer}
            open={drawerVisible}
            width={drawerMode === 'view' ? 520 : 720}
            footer={
              drawerMode === 'view' ? (
                <div className='flex justify-end space-x-2'>
                  <Button onClick={closeDrawer}>Close</Button>
                  <Button
                    type='primary'
                    onClick={() => {
                      closeDrawer();
                      showEditDrawer(currentPatient);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ) : (
                <div className='flex justify-end space-x-2'>
                  <Button onClick={closeDrawer}>Cancel</Button>
                  <Button type='primary' onClick={() => editForm.submit()}>
                    Save Changes
                  </Button>
                </div>
              )
            }
          >
            {drawerMode === 'view' && currentPatient ? (
              <PatientDetail
                patient={currentPatient}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleFieldEdit={handleFieldEdit}
                handleDeletePatient={handleDeletePatient}
                closeDrawer={closeDrawer}
                showEditDrawer={showEditDrawer}
                darkMode={darkMode}
              />
            ) : drawerMode === 'edit' && currentPatient ? (
              <PatientForm
                form={editForm}
                onFinish={handleEditFormSubmit}
                initialValues={currentPatient}
                mode='edit'
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ) : null}
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PatientList;
