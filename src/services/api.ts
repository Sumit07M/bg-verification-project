import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string, role: 'employee' | 'manager') => {
  const response = await api.post('/auth/login', { email, password, role });
  return response.data;
};

export const register = async (email: string, password: string, role: 'employee' | 'manager') => {
  const response = await api.post('/auth/register', { email, password, role });
  return response.data;
};

export default api; 