import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://backend.test/api', // Your Laravel API URL
});

// This "Interceptor" attaches the token to EVERY request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('oncura_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// This "Interceptor" catches 401 (Expired Token) and kicks user to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('oncura_token');
            toast.error("Session expired. Please login again.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;