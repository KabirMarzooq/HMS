import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Laravel API URL 'http://backend.test/api',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// This Interceptor attaches the token to EVERY request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('oncura_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// This Interceptor catches 401 Expired Token and sends user to login
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                              originalRequest.url?.includes('/auth/register') ||
                              originalRequest.url?.includes('/auth/forgot-password');

        // If the error is a 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {

            if (isRefreshing) {
                // If it is already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const token = localStorage.getItem('oncura_token');

            if (!token) {
                // If no token, redirect to login
                localStorage.removeItem('oncura_token');
                localStorage.removeItem('oncura_user');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Try to refresh the token
                const response = await axios.post(
                    'http://backend.test/api/auth/refresh',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const newToken = response.data.access_token;
                localStorage.setItem('oncura_token', newToken);

                // Update the failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // Process all queued requests
                processQueue(null, newToken);
                isRefreshing = false;

                // Retry the original request
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh failed, logout the user
                processQueue(refreshError, null);
                isRefreshing = false;

                localStorage.removeItem('oncura_token');
                localStorage.removeItem('oncura_user');
                toast.error("Session expired. Please login again.");
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;