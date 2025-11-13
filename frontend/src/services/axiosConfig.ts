import axios from 'axios';

// base URL based on environment
const getBaseURL = () => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      // Local development
      return 'http://localhost:5000';
    } else {
      // Production (Vercel) same origin
      return window.location.origin;
    }
  }
  
  // Server-side fallback
  return '';
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log for debugging
if (typeof window !== 'undefined') {
  console.log('Axios Base URL:', apiClient.defaults.baseURL);
  console.log('Environment:', window.location.hostname);
}

export default apiClient;