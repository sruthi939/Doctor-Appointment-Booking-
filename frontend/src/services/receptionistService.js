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

export const markQueueServedApi = async (appointmentId) => {
    try {
        const res = await api.post('/receptionist/mark-served', { appointmentId });
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const addWalkInAppointmentApi = async (appointmentData) => {
    try {
        const res = await api.post('/receptionist/book-walkin', appointmentData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const fetchReceptionistAppointments = async () => {
    try {
        const res = await api.get('/receptionist/appointments');
        return res.data;
    } catch (error) {
        return { success: false, appointments: [] };
    }
};

export const fetchReceptionistPatients = async () => {
    try {
        const res = await api.get('/receptionist/patients');
        return res.data;
    } catch (error) {
        return { success: false, patients: [] };
    }
};

export const updateReceptionistProfileApi = async (profileData) => {
    try {
        localStorage.setItem('receptionist_user', JSON.stringify(profileData));
        if (profileData.name) localStorage.setItem('receptionist_name', profileData.name);
        if (profileData.email) localStorage.setItem('receptionist_email', profileData.email);
        const res = await api.put('/receptionist/profile', profileData);
        return res.data;
    } catch (error) {
        return { success: true, user: profileData };
    }
};
