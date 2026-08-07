import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to attach JWT auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || 
                      localStorage.getItem('user_token') || 
                      localStorage.getItem('doc_token') || 
                      localStorage.getItem('doctor_token') || 
                      localStorage.getItem('receptionist_token') || 
                      localStorage.getItem('accountant_token') ||
                      localStorage.getItem('admin_token');
        if (token && token !== 'false' && token !== 'mock_token_12345' && token !== 'null' && token !== 'undefined') {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.token = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
