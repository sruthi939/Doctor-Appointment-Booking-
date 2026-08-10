import api from './api';

export const receptionistLogin = async (email, password) => {
    try {
        const res = await api.post('/receptionist/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('receptionist_token', res.data.token);
            localStorage.setItem('receptionistToken', res.data.token);
            const userInfo = {
                name: res.data.name || res.data.user?.name || email.split('@')[0],
                email: res.data.email || res.data.user?.email || email
            };
            localStorage.setItem('receptionist_user', JSON.stringify(userInfo));
            localStorage.setItem('receptionist_name', userInfo.name);
            localStorage.setItem('receptionist_email', userInfo.email);
        }
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Receptionist login failed.'
        };
    }
};

export const fetchReceptionistDashboard = async () => {
    try {
        const res = await api.get('/receptionist/dashboard');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
};

export const fetchQueueList = async () => {
    try {
        const res = await api.get('/receptionist/queue');
        return res.data;
    } catch (error) {
        return {
            success: false,
            queue: []
        };
    }
};

export const markQueueServedApi = async (queueId) => {
    try {
        const res = await api.put(`/receptionist/queue/${queueId}/served`);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const addWalkInAppointmentApi = async (appointmentData) => {
    try {
        const res = await api.post('/receptionist/appointments/add', appointmentData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
