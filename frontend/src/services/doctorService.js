import api from './api';

export const doctorLogin = async (email, password) => {
    try {
        const res = await api.post('/doctors/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('doctor_token', res.data.token);
            localStorage.setItem('doctor_user', JSON.stringify(res.data.doctor));
        }
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed. Please check credentials.'
        };
    }
};

export const fetchDoctorDashboard = async () => {
    try {
        const docUser = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        const res = await api.get('/doctors/portal/dashboard', {
            headers: { doc_id: docUser._id }
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            stats: { todayAppointments: 0, pendingRequests: 0, completed: 0, cancelled: 0 },
            todayQueue: []
        };
    }
};

export const fetchDoctorPatients = async () => {
    try {
        const docUser = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        const res = await api.get('/doctors/portal/patients', {
            headers: { doc_id: docUser._id }
        });
        return res.data;
    } catch (error) {
        return { success: false, patients: [] };
    }
};

export const saveConsultation = async (consultationData) => {
    try {
        const res = await api.post('/doctors/portal/consultation', consultationData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateScheduleApi = async (scheduleData) => {
    try {
        const docUser = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        const res = await api.put('/doctors/portal/schedule', {
            ...scheduleData,
            docId: docUser._id
        });
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchDoctorEarnings = async () => {
    try {
        const docUser = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        const res = await api.get('/doctors/portal/earnings', {
            headers: { doc_id: docUser._id }
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            summary: { thisMonth: 0, thisWeek: 0, today: 0 },
            transactions: []
        };
    }
};

export const updateDoctorProfileApi = async (profileData) => {
    try {
        const docUser = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        const res = await api.put('/doctors/portal/profile', {
            ...profileData,
            docId: docUser._id
        });
        if (res.data?.success) {
            localStorage.setItem('doctor_user', JSON.stringify(res.data.doctor));
        }
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
