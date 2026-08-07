import api from './api';

export const fetchPayments = async () => {
    try {
        const res = await api.get('/admin/payments');
        return res.data;
    } catch (e) {
        return { success: false, payments: [] };
    }
};
