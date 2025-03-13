import { Table, Button, Popconfirm, Space, Tag, Avatar, Tooltip } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';

const PatientTable = ({
  patients,
  loading,
  showViewDrawer,
  showEditDrawer,
  handleDeletePatient,
  darkMode,
}) => {
  const columns = [
    {
      title: 'Avatar',
      key: 'avatar',
      width: 80,
      render: (_, record) => (
        <Avatar
          src={record.avatar}
          icon={!record.avatar && <UserOutlined />}
          size='large'
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <span
          className={darkMode ? 'dark-mode-text font-medium' : 'font-medium'}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className={darkMode ? 'text-gray-300' : ''}>{text}</span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => (
        <span className={darkMode ? 'text-gray-300' : ''}>{text}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'Active'
            ? 'green'
            : status === 'Inactive'
            ? 'red'
            : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='small'>
          <Tooltip title='View Details'>
            <Button
              icon={<EyeOutlined />}
              size='small'
              onClick={() => showViewDrawer(record)}
              className={darkMode ? 'hover:text-blue-400' : ''}
            />
          </Tooltip>
          <Tooltip title='Edit Patient'>
            <Button
              icon={<EditOutlined />}
              size='small'
              onClick={() => showEditDrawer(record)}
              className={darkMode ? 'hover:text-green-400' : ''}
            />
          </Tooltip>
          <Tooltip title='Delete Patient'>
            <Popconfirm
              title='Are you sure you want to delete this patient?'
              onConfirm={() => handleDeletePatient(record.id)}
              okText='Yes'
              cancelText='No'
            >
              <Button
                icon={<DeleteOutlined />}
                size='small'
                danger
                className={darkMode ? 'hover:text-red-400' : ''}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={patients}
      rowKey='id'
      loading={loading}
      pagination={{ pageSize: 10 }}
      className={darkMode ? 'dark-mode-table' : ''}
      rowClassName={darkMode ? () => 'dark-row' : ''}
    />
  );
};

export default PatientTable;
