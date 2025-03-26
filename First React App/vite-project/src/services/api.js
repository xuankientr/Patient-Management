import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
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

export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/users?email=${email}`);
    return response.data.length > 0;
  } catch (error) {
    throw new Error('Error checking email existence');
  }
};

export const register = async (userData) => {
  try {
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

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
