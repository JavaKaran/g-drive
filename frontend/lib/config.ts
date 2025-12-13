import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// API Base URL configuration
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:8000';

// Create axios instance with base configuration
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Add JWT token to requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: Handle 401 errors (unauthorized)
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            const requestUrl = error.config?.url || '';
            
            // Don't redirect on login/register failures - let the component handle the error
            const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');
            
            // Only redirect if it's not an auth endpoint and we're not already on the login page
            if (!isAuthEndpoint && typeof window !== 'undefined') {
                const isOnLoginPage = window.location.pathname === '/login';
                
                if (!isOnLoginPage) {
                    Cookies.remove('access_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

