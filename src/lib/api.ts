import axios from 'axios';

let API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

if (typeof window !== 'undefined') {
  if (window.location.hostname !== 'localhost' && API_BASE_URL.includes('localhost')) {
    API_BASE_URL = API_BASE_URL.replace('localhost', window.location.hostname);
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Request interceptor — attach JWT
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('agriconnect_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 (token expired / invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear all auth storage
      localStorage.removeItem('agriconnect_token');
      localStorage.removeItem('agriconnect_user');
      localStorage.removeItem('agriconnect-auth');
      sessionStorage.clear();
      // Clear the middleware-readable cookie
      document.cookie = 'agriconnect_authenticated=; path=/; SameSite=Lax; max-age=0';
      // Hard redirect to landing page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
