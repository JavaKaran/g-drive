import Cookies from 'js-cookie';
import { api } from '@/lib/config';
import type { RegisterData, LoginData, User, TokenResponse } from '@/lib/types';

/**
 * Authentication service
 * Handles all authentication-related API calls
 */
export const authService = {
    /**
     * Register a new user and automatically log them in
     */
    register: async (data: RegisterData): Promise<TokenResponse> => {
        const response = await api.post<TokenResponse>('/auth/register', data);

        // Store token in cookie
        if (response.data.access_token) {
            Cookies.set('access_token', response.data.access_token, { expires: 7 });
        }

        return response.data;
    },

    /**
     * Login user and store token
     */
    login: async (data: LoginData): Promise<TokenResponse> => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);

        const response = await api.post<TokenResponse>('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Store token in cookie
        if (response.data.access_token) {
            Cookies.set('access_token', response.data.access_token, { expires: 7 });
        }

        return response.data;
    },

    /**
     * Get current authenticated user
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
        Cookies.remove('access_token');
    },
};

