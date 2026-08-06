import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('admin_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data?.success) {
                setToken(res.data.token);
                setUser(res.data.user);
                localStorage.setItem('admin_token', res.data.token);
                localStorage.setItem('admin_user', JSON.stringify(res.data.user));
                return { success: true };
            }
            return { success: false, message: res.data?.message || 'Login failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
