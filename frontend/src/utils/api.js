import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sawprice-hunter-backend-production.up.railway.app/',
  withCredentials: true
});

export default api;
