import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your actual base URL
const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHFsb25lLmNvbSIsInBob25lIjoiNzc4MTEzMTc2MyIsImlkIjoiNjZlOTZiNjA3MmNmNmNiY2M3ZGJlNWQ0IiwiZGV2aWNlIjoidGVzdERldmljZSIsImlhdCI6MTcyNzIwNjY1OSwiZXhwIjoxNzU4NzY0MjU5fQ.-tEHPc5qu799q6uvA_Y9No0odmd6CkiJCaGgXOcdaDw';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchConfigs = async () => {
  return await apiClient.get('/config');
};

export const deleteConfig = async (id) => {
  return await apiClient.delete(`/config/${id}`);
};

export const updateConfig = async (id, updatedConfig) => {
  return await apiClient.put(`/config/${id}`, updatedConfig);
};

export const addConfig = async (config) => {
  return await apiClient.post('/config', config);
};
