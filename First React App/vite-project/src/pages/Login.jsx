import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Checkbox, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

const { Text, Title } = Typography;

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState('');

  // Kiểm tra thông báo từ localStorage khi component được mount
  useEffect(() => {
    const message = localStorage.getItem('registerMessage');
    if (message) {
      setRegisterMessage(message);
      localStorage.removeItem('registerMessage'); // Xóa thông báo sau khi hiển thị
    }
  }, []);

  const onFinish = async (values) => {
    const success = await login(values.email, values.password);
    if (success) {
      setIsRedirecting(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-900'>
      <div className='bg-white relative z-10 flex flex-col md:flex-row items-center justify-center w-[90%] max-w-4xl rounded-3xl shadow-xl p-6 md:p-10'>
        <div className='hidden md:flex flex-col items-center w-1/2 '>
          <img
            src='https://codegeekz.com/wp-content/uploads/reactjs.png'
            alt='Login Illustration'
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
              className='text-lg font-semibold border-b-2 border-blue-500 pb-1'
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className='text-lg font-semibold text-gray-400 hover:text-blue-500'
            >
              Sign Up
            </Link>
          </div>

          <Title level={4} className='text-center mb-6'>
            Welcome Back
          </Title>

          {registerMessage && (
            <Alert
              message={registerMessage}
              type='success'
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            name='login_form'
            onFinish={onFinish}
            layout='vertical'
            className='space-y-4'
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
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
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Your Password'
                size='large'
              />
            </Form.Item>

            <Form.Item>
              <div className='flex justify-between'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href='#'>Forgot password?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                loading={loading || isRedirecting} // Hiển thị loading khi đang chuyển hướng
              >
                {isRedirecting ? 'Redirecting...' : 'Sign In'}
              </Button>
            </Form.Item>

            <div className='text-center'>
              <Text>
                Don't have an account?{' '}
                <Link to='/register' className='text-blue-500'>
                  Sign Up
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
