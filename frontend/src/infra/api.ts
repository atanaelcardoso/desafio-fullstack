import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://desafio-fullstack-lc5x.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TaskManager:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
