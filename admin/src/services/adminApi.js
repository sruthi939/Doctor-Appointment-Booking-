import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const adminApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

adminApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token && token !== 'false') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const adminLoginApi = async (email, password) => {
    try {
        const res = await adminApi.post('/auth/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('admin_token', res.data.token);
            localStorage.setItem('admin_user', JSON.stringify(res.data.user));
        }
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Admin login failed'
        };
    }
};

export const fetchAdminDashboard = async () => {
    try {
        const doctorsRes = await adminApi.get('/doctors');
        const appointmentsRes = await adminApi.get('/appointments/my-appointments');
        const usersRes = await adminApi.get('/user/all-users');

        const doctors = doctorsRes.data?.doctors || [];
        const appointments = appointmentsRes.data?.appointments || [];
        const users = usersRes.data?.users || [];

        const totalVol = appointments.reduce((sum, a) => sum + (a.amount || 50), 0);

        return {
            success: true,
            stats: {
                totalDoctors: doctors.length,
                totalAppointments: appointments.length,
                totalPatients: users.length,
                totalEarnings: `$${totalVol.toLocaleString()}.00`
            },
            recentAppointments: appointments.slice(0, 5)
        };
    } catch (error) {
        return {
            success: false,
            stats: { totalDoctors: 0, totalAppointments: 0, totalPatients: 0, totalEarnings: '$0.00' },
            recentAppointments: []
        };
    }
};

export const addDoctorApi = async (doctorData) => {
    try {
        const res = await adminApi.post('/doctors/add', doctorData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const fetchAllDoctors = async () => {
    try {
        const res = await adminApi.get('/doctors');
        return res.data;
    } catch (error) {
        return { success: false, doctors: [] };
    }
};

export const fetchAllPatients = async () => {
    try {
        const res = await adminApi.get('/user/all-users');
        return res.data;
    } catch (error) {
        return { success: false, users: [] };
    }
};

export default adminApi;
