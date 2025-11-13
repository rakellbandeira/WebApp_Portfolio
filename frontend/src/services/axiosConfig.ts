import axios from 'axios';

// Setting the base URL based on environment
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
      // Vercel production:: same origin
      return window.location.origin;
      
    } else {
      // For local development
      return 'http://localhost:5000';
    }
  }
  return '';
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;