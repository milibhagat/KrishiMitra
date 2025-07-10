import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('vfr_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          toast.error(data.error || 'Bad request');
          break;
        case 401:
          toast.error('Unauthorized access');
          // Clear user session
          localStorage.removeItem('vfr_user_id');
          localStorage.removeItem('vfr_token');
          break;
        case 403:
          toast.error('Access forbidden');
          break;
        case 404:
          toast.error(data.error || 'Resource not found');
          break;
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data.error || 'An unexpected error occurred');
      }
      
      // Return a more user-friendly error
      return Promise.reject(new Error(data.error || `Request failed with status ${status}`));
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
      return Promise.reject(new Error('Network error'));
    } else {
      // Something else happened
      toast.error('An unexpected error occurred');
      return Promise.reject(error);
    }
  }
);

// Helper function for file uploads
export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  
  return formData;
};

export default api;