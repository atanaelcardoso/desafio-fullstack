import axios from 'axios';
const isLocal = import.meta.env.DEV;

export const api = axios.create({
  baseURL: isLocal ? 'http://localhost:3000' : '/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TaskManager:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
