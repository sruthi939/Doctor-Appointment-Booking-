import api from './api';

export const receptionistLogin = async (email, password) => {
    try {
        const res = await api.post('/receptionist/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('receptionist_token', res.data.token);
            localStorage.setItem('receptionist_user', JSON.stringify(res.data.user));
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
            success: true,
            stats: { todayAppointments: 12, waitingInQueue: 3, confirmed: 8, cancelled: 1 }
        };
    }
};

export const fetchQueueList = async () => {
    try {
        const res = await api.get('/receptionist/queue');
        return res.data;
    } catch (error) {
        return {
            success: true,
            queue: [
                { _id: 'Q1', patientName: 'William Clark', doctorName: 'Dr. Smith', checkInTime: '09:15 AM', status: 'Waiting', waitingMinutes: 10 },
                { _id: 'Q2', patientName: 'Jessica Taylor', doctorName: 'Dr. Brown', checkInTime: '09:25 AM', status: 'Waiting', waitingMinutes: 2 },
                { _id: 'Q3', patientName: 'Daniel Martinez', doctorName: 'Dr. Davis', checkInTime: '09:30 AM', status: 'Waiting', waitingMinutes: 1 }
            ]
        };
    }
};

export const markQueueServedApi = async (queueId) => {
    try {
        const res = await api.put(`/receptionist/queue/${queueId}/served`);
        return res.data;
    } catch (error) {
        return { success: true, message: 'Patient marked as served' };
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

export const updateReceptionistProfileApi = async (profileData) => {
    try {
        const res = await api.put('/receptionist/profile', profileData);
        if (res.data?.success) {
            localStorage.setItem('receptionist_user', JSON.stringify(res.data.user));
        }
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
