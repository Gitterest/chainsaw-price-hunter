import axios from 'axios';
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE ||
    'http://localhost:5000'
});
export default api;
