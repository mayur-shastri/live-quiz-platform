import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 
  'http://localhost:3000' : import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export {instance};
