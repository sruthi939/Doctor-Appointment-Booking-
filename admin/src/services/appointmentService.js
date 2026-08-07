import api from './api';

export const fetchAppointments = async () => {
    try {
        const res = await api.get('/appointments/my-appointments');
        return res.data;
    } catch (e) {
        return { success: false, appointments: [] };
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        const res = await api.post('/appointments/cancel', { appointmentId });
        return res.data;
    } catch (e) {
        return { success: false, message: e.message };
    }
};
