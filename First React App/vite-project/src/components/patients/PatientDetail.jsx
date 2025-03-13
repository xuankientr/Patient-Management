import { Tabs, Avatar, Tag, Button, Divider, Popconfirm } from 'antd';
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

// Update the PatientDetail component for better dark mode styling
// Add darkMode to the props
const PatientDetail = ({
  patient,
  activeTab,
  setActiveTab,
  handleFieldEdit,
  handleDeletePatient,
  closeDrawer,
  showEditDrawer,
  darkMode,
}) => {
  if (!patient) return null;

  return (
    <div>
      <div className='flex items-center mb-6'>
        <Avatar
          size={80}
          src={patient.avatar}
          icon={!patient.avatar && <UserOutlined />}
          className='border-2 border-gray-200'
        />
        <div className='ml-4'>
          <Title level={4} className={`m-0 ${darkMode ? 'text-gray-100' : ''}`}>
            {patient.name}
          </Title>
          <Tag
            color={
              patient.status === 'Active'
                ? 'green'
                : patient.status === 'Inactive'
                ? 'red'
                : 'blue'
            }
            className='mt-1'
          >
            {patient.status}
          </Tag>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab='Basic Info' key='1'>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <MailOutlined
                className={`mr-2 ${
                  darkMode ? 'text-blue-400' : 'text-blue-500'
                }`}
              />
              <div className='flex-1 flex justify-between items-center'>
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Email
                  </div>
                  <div className={darkMode ? 'text-gray-200' : ''}>
                    {patient.email}
                  </div>
                </div>
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  size='small'
                  className={
                    darkMode ? 'text-gray-300 hover:text-blue-400' : ''
                  }
                  onClick={() => {
                    const newEmail = prompt('Enter new email:', patient.email);
                    if (newEmail && newEmail !== patient.email) {
                      handleFieldEdit('email', newEmail);
                    }
                  }}
                />
              </div>
            </div>

            {/* Apply similar styling to other fields */}
            <div className='flex items-center'>
              <PhoneOutlined
                className={`mr-2 ${
                  darkMode ? 'text-green-400' : 'text-green-500'
                }`}
              />
              <div className='flex-1 flex justify-between items-center'>
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Phone
                  </div>
                  <div className={darkMode ? 'text-gray-200' : ''}>
                    {patient.phone}
                  </div>
                </div>
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  size='small'
                  className={
                    darkMode ? 'text-gray-300 hover:text-blue-400' : ''
                  }
                  onClick={() => {
                    const newPhone = prompt('Enter new phone:', patient.phone);
                    if (newPhone && newPhone !== patient.phone) {
                      handleFieldEdit('phone', newPhone);
                    }
                  }}
                />
              </div>
            </div>

            <div className='flex items-center'>
              <UserOutlined
                className={`mr-2 ${
                  darkMode ? 'text-purple-400' : 'text-purple-500'
                }`}
              />
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Gender
                </div>
                <div className={darkMode ? 'text-gray-200' : ''}>
                  {patient.gender}
                </div>
              </div>
            </div>

            {/* Continue with similar styling for other fields */}
            <div className='flex items-center'>
              <HomeOutlined
                className={`mr-2 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-500'
                }`}
              />
              <div className='flex-1 flex justify-between items-center'>
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Address
                  </div>
                  <div className={darkMode ? 'text-gray-200' : ''}>
                    {patient.address || 'N/A'}
                  </div>
                </div>
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  size='small'
                  className={
                    darkMode ? 'text-gray-300 hover:text-blue-400' : ''
                  }
                  onClick={() => {
                    const newAddress = prompt(
                      'Enter new address:',
                      patient.address || ''
                    );
                    handleFieldEdit('address', newAddress);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center'>
              <TagOutlined
                className={`mr-2 ${
                  darkMode ? 'text-orange-400' : 'text-orange-500'
                }`}
              />
              <div className='flex-1 flex justify-between items-center'>
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Company
                  </div>
                  <div className={darkMode ? 'text-gray-200' : ''}>
                    {patient.company || 'N/A'}
                  </div>
                </div>
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  size='small'
                  className={
                    darkMode ? 'text-gray-300 hover:text-blue-400' : ''
                  }
                  onClick={() => {
                    const newCompany = prompt(
                      'Enter new company:',
                      patient.company || ''
                    );
                    handleFieldEdit('company', newCompany);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center'>
              <TagOutlined
                className={`mr-2 ${
                  darkMode ? 'text-pink-400' : 'text-pink-500'
                }`}
              />
              <div className='flex-1 flex justify-between items-center'>
                <div>
                  <div
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Title
                  </div>
                  <div className={darkMode ? 'text-gray-200' : ''}>
                    {patient.title || 'N/A'}
                  </div>
                </div>
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  size='small'
                  className={
                    darkMode ? 'text-gray-300 hover:text-blue-400' : ''
                  }
                  onClick={() => {
                    const newTitle = prompt(
                      'Enter new title:',
                      patient.title || ''
                    );
                    handleFieldEdit('title', newTitle);
                  }}
                />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab='Notes' key='2'>
          <div className='flex justify-between mb-2'>
            <div className={`font-semibold ${darkMode ? 'text-gray-200' : ''}`}>
              Notes
            </div>
            <Button
              type='text'
              icon={<EditOutlined />}
              size='small'
              className={darkMode ? 'text-gray-300 hover:text-blue-400' : ''}
              onClick={() => {
                const newNotes = prompt(
                  'Enter new notes:',
                  patient.notes || ''
                );
                handleFieldEdit('notes', newNotes);
              }}
            />
          </div>
          <div className={darkMode ? 'text-gray-200' : ''}>
            {patient.notes || 'No notes available'}
          </div>
        </TabPane>
        <TabPane tab='History' key='3'>
          <div className='space-y-2'>
            <div>
              <div
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Created
              </div>
              <div className={darkMode ? 'text-gray-200' : ''}>
                {new Date(patient.createdAt).toLocaleString()}
              </div>
            </div>
            {patient.updatedAt && (
              <div>
                <div
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Last Updated
                </div>
                <div className={darkMode ? 'text-gray-200' : ''}>
                  {new Date(patient.updatedAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </TabPane>

        {/* Apply similar styling to other tabs */}
      </Tabs>

      <Divider className={darkMode ? 'border-gray-700' : ''} />

      <div>
        <Title level={5} className={darkMode ? 'text-gray-200' : ''}></Title>
        <Popconfirm
          title='Are you sure you want to delete this patient?'
          onConfirm={() => handleDeletePatient(patient.id)}
          okText='Yes'
          cancelText='No'
        >
          <Button danger>Delete Patient</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default PatientDetail;
