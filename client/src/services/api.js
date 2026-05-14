import axios from 'axios';

// Create an instance of axios with the base URL of your backend
// Your Day 1 server is running on port 5000
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
