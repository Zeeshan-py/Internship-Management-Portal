import axios from 'axios';

// Create an instance of axios with the base URL of your backend
// Your Day 1 server is running on port 5000
let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

// Defensive check: If the URL starts with "internship" but lacks "https://", fix it.
if (baseURL && !baseURL.startsWith('http')) {
  baseURL = `https://${baseURL}`;
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
