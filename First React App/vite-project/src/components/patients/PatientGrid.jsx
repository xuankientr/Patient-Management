import { Row, Col, Card, Avatar, Tag, Popconfirm, Tooltip } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';

const PatientGrid = ({
  patients,
  showViewDrawer,
  showEditDrawer,
  handleDeletePatient,
  darkMode,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {patients.map((patient) => (
        <Col xs={24} sm={12} md={8} lg={6} key={patient.id}>
          <Card
            hoverable
            className={darkMode ? 'border border-gray-700' : ''}
            actions={[
              <Tooltip title='View Details' key='view'>
                <EyeOutlined
                  key='view'
                  onClick={() => showViewDrawer(patient)}
                  className={darkMode ? 'hover:text-blue-400' : ''}
                />
              </Tooltip>,
              <Tooltip title='Edit Patient' key='edit'>
                <EditOutlined
                  key='edit'
                  onClick={() => showEditDrawer(patient)}
                  className={darkMode ? 'hover:text-green-400' : ''}
                />
              </Tooltip>,
              <Tooltip title='Delete Patient' key='delete'>
                <Popconfirm
                  title='Are you sure you want to delete this patient?'
                  onConfirm={() => handleDeletePatient(patient.id)}
                  okText='Yes'
                  cancelText='No'
                  key='delete'
                >
                  <DeleteOutlined
                    className={darkMode ? 'hover:text-red-400' : ''}
                  />
                </Popconfirm>
              </Tooltip>,
            ]}
          >
            <div className='flex flex-col items-center'>
              <Avatar
                src={patient.avatar}
                icon={!patient.avatar && <UserOutlined />}
                className='w-16 h-16 mb-2 border-2 border-gray-200'
                size={64}
              />
              <h3
                className={`font-semibold ${darkMode ? 'text-gray-100' : ''}`}
              >
                {patient.name}
              </h3>
              <p className={darkMode ? 'text-gray-300' : ''}>{patient.email}</p>
              <p className={darkMode ? 'text-gray-300' : ''}>{patient.phone}</p>
              <Tag
                color={
                  patient.status === 'Active'
                    ? 'green'
                    : patient.status === 'Inactive'
                    ? 'red'
                    : 'blue'
                }
                className='mt-2'
              >
                {patient.status}
              </Tag>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PatientGrid;
