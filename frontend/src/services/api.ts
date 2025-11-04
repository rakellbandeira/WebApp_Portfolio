import axios from 'axios';

// environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// axios module instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

export const fetchAboutMe = () => api.get('/about');
export const fetchProjects = () => api.get('/projects');
export const submitContactForm = (data: { email: string; message: string }) => 
  api.post('/contact', data);

export default api;