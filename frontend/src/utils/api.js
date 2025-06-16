import axios from 'axios';
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE ||
    'https://sawprice-hunter-backend-production.up.railway.app'
});
export default api;
