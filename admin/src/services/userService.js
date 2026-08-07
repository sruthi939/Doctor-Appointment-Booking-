import api from './api';

export const fetchUsers = async () => {
    try {
        const res = await api.get('/admin/users');
        return res.data;
    } catch (e) {
        return { success: false, users: [] };
    }
};

export const addUser = async (userData) => {
    try {
        const res = await api.post('/admin/users/add', userData);
        return res.data;
    } catch (e) {
        return { success: false, message: e.response?.data?.message || e.message };
    }
};

export const updateUserRoleApi = async (userId, role) => {
    try {
        const res = await api.put('/admin/users/role', { userId, role });
        return res.data;
    } catch (e) {
        return { success: false, message: e.response?.data?.message || e.message };
    }
};
