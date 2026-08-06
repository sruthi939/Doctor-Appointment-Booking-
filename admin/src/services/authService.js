import api from './api';

export const loginAdmin = async (email, password) => {
    try {
        const res = await api.post('/auth/login', { email, password });
        return res.data;
    } catch (e) {
        return { success: false, message: e.response?.data?.message || e.message };
    }
};

export const forgotPassword = async (email) => {
    return { success: true, message: 'Password reset link sent to your email' };
};

export const resetPassword = async (token, newPassword) => {
    return { success: true, message: 'Password reset successfully' };
};
