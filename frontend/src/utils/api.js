import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sawprice-hunter-backend-production.up.railway.app/api/scraper',
  withCredentials: true
});

export default API;
