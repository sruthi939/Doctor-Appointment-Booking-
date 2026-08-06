import api from './api';

export const fetchReportsData = async () => {
    try {
        const res = await api.get('/admin/reports');
        return res.data;
    } catch (e) {
        return { success: false };
    }
};

export const fetchSpecialties = async () => {
    try {
        const res = await api.get('/admin/specialties');
        return res.data;
    } catch (e) {
        return { success: false, specialties: [] };
    }
};

export const addSpecialtyApi = async (specialtyData) => {
    try {
        const res = await api.post('/admin/specialties/add', specialtyData);
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};

export const fetchCoupons = async () => {
    try {
        const res = await api.get('/admin/coupons');
        return res.data;
    } catch (e) {
        return { success: false, coupons: [] };
    }
};

export const addCouponApi = async (couponData) => {
    try {
        const res = await api.post('/admin/coupons/add', couponData);
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};

export const fetchSettings = async () => {
    try {
        const res = await api.get('/admin/settings');
        return res.data;
    } catch (e) {
        return { success: false };
    }
};

export const updateSettingsApi = async (settingsData) => {
    try {
        const res = await api.put('/admin/settings', settingsData);
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};
