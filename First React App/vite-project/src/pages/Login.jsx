import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Checkbox, Alert, Spin } from 'antd';
import { MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

const { Text, Title } = Typography;

const Login = () => {
  const { login, loading: authLoading } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    type: '',
    message: '',
  });
  const navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState('');

  useEffect(() => {
    const message = localStorage.getItem('registerMessage');
    if (message) {
      setRegisterMessage(message);
      localStorage.removeItem('registerMessage');
    }
  }, []);

  const onFinish = async (values) => {
    setLoginStatus({ type: '', message: '' });

    try {
      setLoginStatus({
        type: 'info',
        message: 'Authenticating...',
      });

      const success = await login(values.email, values.password);

      if (success) {
        setLoginStatus({
          type: 'success',
          message: 'Login successful! Redirecting to dashboard...',
        });

        setIsRedirecting(true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setLoginStatus({
        type: 'error',
        message: error.message || 'Login failed. Please try again.',
      });
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const isLoading = authLoading || isRedirecting;

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-900'>
      {isRedirecting && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 loading-overlay'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center loading-content'>
            <Spin indicator={antIcon} />
            <p className='mt-3'>Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      <div className='bg-white relative z-10 flex flex-col md:flex-row items-center justify-center w-[90%] max-w-4xl rounded-3xl shadow-xl p-6 md:p-10 login-container'>
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

          {loginStatus.type && (
            <Alert
              message={loginStatus.message}
              type={loginStatus.type}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            name='login_form'
            onFinish={onFinish}
            layout='vertical'
            className='space-y-4 login-form'
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item>
              <div className='flex justify-between'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox disabled={isLoading}>Remember me</Checkbox>
                </Form.Item>
                <a
                  href='#'
                  className={
                    isLoading ? 'text-gray-400 pointer-events-none' : ''
                  }
                >
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                loading={isLoading}
              >
                {authLoading
                  ? 'Signing In...'
                  : isRedirecting
                  ? 'Redirecting...'
                  : 'Sign In'}
              </Button>
            </Form.Item>

            <div className='text-center'>
              <Text>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className={`text-blue-500 ${
                    isLoading ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
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
