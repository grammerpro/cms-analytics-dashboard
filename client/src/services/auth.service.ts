import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';

const API_URL = '/api/auth/';

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response.data;
};

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}register`, credentials);
    return response.data;
};

const logout = async (): Promise<void> => {
    await axios.post(`${API_URL}logout`);
};

export default {
    login,
    register,
    logout,
};