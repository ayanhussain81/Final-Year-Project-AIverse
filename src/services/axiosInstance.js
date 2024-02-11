import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ai-verse-backend.vercel.app/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosInstance;
