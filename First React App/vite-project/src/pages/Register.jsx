import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { register } from '../services/api'; // API đăng ký người dùng

const { Text, Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        createdAt: new Date().toISOString(),
      };

      console.log('Registering user with data:', userData);

      const response = await register(userData);

      console.log('Registration response:', response);

      localStorage.setItem(
        'registerMessage',
        'Registration successful! Please log in.'
      );

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message === 'Email already exists') {
        setErrorMessage(
          '❌ Email is already registered. Please use another one.'
        );
      } else {
        setErrorMessage(
          `❌ Registration failed: ${error.message || 'Please try again.'}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-white relative z-10 flex flex-col md:flex-row items-center justify-center w-[90%] max-w-4xl rounded-3xl shadow-xl p-6 md:p-10'>
        <div className='hidden md:flex flex-col items-center w-1/2'>
          <img
            src='https://codegeekz.com/wp-content/uploads/reactjs.png'
            alt='Register Illustration'
            className='w-[350px] h-auto rounded-lg'
          />
          <div className='mt-4'>
            <p className='text-xs'>© 2025 VTC. All rights reserved.</p>
          </div>
        </div>

        <div className='w-full md:w-1/2 rounded-2xl p-6 md:p-8'>
          <div className='flex justify-center mb-6 space-x-4'>
            <Link
              to='/login'
              className='text-lg font-semibold text-gray-400 hover:text-blue-500'
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className='text-lg font-semibold border-b-2 border-blue-500 pb-1'
            >
              Sign Up
            </Link>
          </div>

          <Title level={4} className='text-center mb-6'>
            Create an Account
          </Title>

          <Form
            name='register_form'
            onFinish={onFinish}
            layout='vertical'
            className='space-y-4'
          >
            <Form.Item
              name='fullName'
              label='Full Name'
              rules={[
                { required: true, message: 'Please input your full name!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='Your Full Name'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder='Your Email'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Your Password'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Confirm Your Password'
                size='large'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                loading={loading}
              >
                Sign Up
              </Button>
            </Form.Item>

            <div className='text-center'>
              <Text>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-500'>
                  Sign In
                </Link>
              </Text>
            </div>
          </Form>

          {errorMessage && (
            <Alert
              message={errorMessage}
              type='error'
              showIcon
              style={{ marginTop: 16 }}
            />
          )}

          {successMessage && (
            <Alert
              message={successMessage}
              type={successMessage.startsWith('🎉') ? 'success' : 'error'}
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
