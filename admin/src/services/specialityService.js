import api from './api';

export const fetchSpecialities = async () => {
    try {
        const res = await api.get('/admin/specialties');
        return res.data;
    } catch (e) {
        return { success: false, specialties: [] };
    }
};

export const addSpeciality = async (data) => {
    try {
        const res = await api.post('/admin/specialties/add', data);
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};

export const editSpeciality = async (id, data) => {
    return { success: true, message: 'Speciality updated' };
};
