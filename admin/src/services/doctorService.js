import api from './api';

export const fetchDoctors = async () => {
    try {
        const res = await api.get('/doctors');
        return res.data;
    } catch (e) {
        return { success: false, doctors: [] };
    }
};

export const addDoctor = async (doctorData) => {
    try {
        const res = await api.post('/doctors/add', doctorData);
        return res.data;
    } catch (e) {
        return { success: false, message: e.response?.data?.message || e.message };
    }
};

export const toggleDoctorAvailability = async (docId) => {
    try {
        const res = await api.post('/doctors/change-availability', { docId });
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};
