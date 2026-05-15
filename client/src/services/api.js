import axios from 'axios';

// Create an instance of axios with the base URL of your backend
// Your Day 1 server is running on port 5000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
