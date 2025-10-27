import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/login', credentials);
    return response.data;
};

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/register', credentials);
    return response.data;
};

const logout = async (): Promise<void> => {
    await authApi.post('/auth/logout');
};

export default {
    login,
    register,
    logout,
};