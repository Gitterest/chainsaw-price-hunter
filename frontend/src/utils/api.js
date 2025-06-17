import axios from 'axios';

const rawBase =
  process.env.NEXT_PUBLIC_API_BASE ||
  'https://sawprice-hunter-backend-production.up.railway.app';

const baseURL = rawBase.replace(/\/api\/?$/, '').replace(/\/$/, '');

const api = axios.create({
  baseURL
});

export default api;
