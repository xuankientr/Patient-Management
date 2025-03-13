import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàm kiểm tra xem email đã tồn tại hay chưa
export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/users?email=${email}`);
    return response.data.length > 0; // Trả về true nếu email đã tồn tại
  } catch (error) {
    throw new Error('Error checking email existence');
  }
};

// Hàm đăng ký với kiểm tra email trước
export const register = async (userData) => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Nếu email chưa tồn tại, tiến hành đăng ký
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.get(
      `/users?email=${email}&password=${password}`
    );
    if (response.data.length > 0) {
      const user = response.data[0];
      user.token = `fake-jwt-token-${user.id}`;
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw error;
  }
};

export default api;
