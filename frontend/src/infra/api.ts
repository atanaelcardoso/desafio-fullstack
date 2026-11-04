import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://desafio-backend-4srr.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TaskManager:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
