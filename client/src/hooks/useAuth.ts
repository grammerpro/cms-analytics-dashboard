import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { User } from '../types/auth.types';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await authService.getCurrentUser();
                setUser(fetchedUser);
            } catch (err) {
                setError('Failed to fetch user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        setLoading(true);
        try {
            const fetchedUser = await authService.login(credentials);
            setUser(fetchedUser);
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } catch (err) {
            setError('Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, login, logout };
};