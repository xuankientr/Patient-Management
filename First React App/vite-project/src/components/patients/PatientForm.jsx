'use client';

import { Form, Input, Select, Switch, Row, Col, Tabs } from 'antd';
import AvatarUpload from './AvatarUpload';

const { TabPane } = Tabs;

const PatientForm = ({
  form,
  onFinish,
  initialValues = {},
  mode = 'add',
  activeTab,
  setActiveTab,
}) => {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={initialValues}
      className='space-y-4'
    >
      {mode === 'edit' ? (
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab='Basic Info' key='1'>
            <div className='mb-4 flex justify-center'>
              <AvatarUpload
                avatarUrl={initialValues.avatar}
                onAvatarChange={(url) => form.setFieldsValue({ avatar: url })}
              />
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='name'
                  label='Full Name'
                  rules={[
                    { required: true, message: 'Please enter patient name' },
                  ]}
                >
                  <Input placeholder='Enter full name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='email'
                  label='Email'
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder='Enter email address' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='phone'
                  label='Phone'
                  rules={[
                    { required: true, message: 'Please enter phone number' },
                  ]}
                >
                  <Input placeholder='Enter phone number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='gender'
                  label='Gender'
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Select placeholder='Select gender'>
                    <Select.Option value='male'>Male</Select.Option>
                    <Select.Option value='female'>Female</Select.Option>
                    <Select.Option value='other'>Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='status'
                  label='Status'
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder='Select status'>
                    <Select.Option value='New'>New</Select.Option>
                    <Select.Option value='Active'>Active</Select.Option>
                    <Select.Option value='Inactive'>Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='active' label='Active' valuePropName='checked'>
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name='address' label='Address'>
              <Input.TextArea rows={2} placeholder='Enter address' />
            </Form.Item>
          </TabPane>
          <TabPane tab='Additional Info' key='2'>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='company' label='Company'>
                  <Input placeholder='Enter company name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='title' label='Title'>
                  <Input placeholder='Enter title' />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name='timezone' label='Timezone'>
              <Input
                placeholder='Enter timezone'
                defaultValue='UTC (Coordinated Universal Time)'
              />
            </Form.Item>
            <Form.Item name='notes' label='Notes'>
              <Input.TextArea rows={4} placeholder='Enter notes' />
            </Form.Item>
          </TabPane>
        </Tabs>
      ) : (
        <>
          <div className='mb-4 flex justify-center'>
            <AvatarUpload
              onAvatarChange={(url) => form.setFieldsValue({ avatar: url })}
            />
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='name'
                label='Full Name'
                rules={[
                  { required: true, message: 'Please enter patient name' },
                ]}
              >
                <Input placeholder='Enter full name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='email'
                label='Email'
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder='Enter email address' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phone'
                label='Phone'
                rules={[
                  { required: true, message: 'Please enter phone number' },
                ]}
              >
                <Input placeholder='Enter phone number' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='gender'
                label='Gender'
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Select placeholder='Select gender'>
                  <Select.Option value='male'>Male</Select.Option>
                  <Select.Option value='female'>Female</Select.Option>
                  <Select.Option value='other'>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='status'
                label='Status'
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder='Select status'>
                  <Select.Option value='New'>New</Select.Option>
                  <Select.Option value='Active'>Active</Select.Option>
                  <Select.Option value='Inactive'>Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='active' label='Active' valuePropName='checked'>
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='address' label='Address'>
            <Input.TextArea rows={2} placeholder='Enter address' />
          </Form.Item>
          <Form.Item name='notes' label='Notes'>
            <Input.TextArea rows={3} placeholder='Enter notes' />
          </Form.Item>
        </>
      )}
      <Form.Item name='avatar' hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
