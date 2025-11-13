// frontend/src/config/api.ts

export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000' : '');

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);