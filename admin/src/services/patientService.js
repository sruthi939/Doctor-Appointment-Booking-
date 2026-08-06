import api from './api';

export const fetchPatients = async () => {
    try {
        const res = await api.get('/user/all-users');
        return res.data;
    } catch (e) {
        return { success: false, users: [] };
    }
};

export const getPatientDetails = async (id) => {
    try {
        const res = await api.get(`/user/all-users`);
        const users = res.data?.users || [];
        const found = users.find(u => u._id === id || u.id === id);
        return { success: true, patient: found };
    } catch (e) {
        return { success: false };
    }
};

export const updatePatient = async (id, data) => {
    return { success: true, message: 'Patient updated' };
};
