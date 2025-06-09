import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://sawprice-hunter-backend-production.up.railway.app/',
  withCredentials: true,
});

export default API;
