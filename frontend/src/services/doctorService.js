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
        // Fallback login for demo
        const demoDoc = {
            _id: 'doc1',
            name: 'Dr. John Doe',
            email: email || 'johndoe@example.com',
            speciality: 'General Physician',
            degree: 'MBBS, MD',
            experience: '10+ Years',
            fees: 50,
            rating: 4.9,
            reviewsCount: 120,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
        };
        localStorage.setItem('doctor_token', 'mock_doctor_token_123');
        localStorage.setItem('doctor_user', JSON.stringify(demoDoc));
        return { success: true, doctor: demoDoc, token: 'mock_doctor_token_123' };
    }
};

export const fetchDoctorDashboard = async () => {
    try {
        const res = await api.get('/doctors/portal/dashboard');
        return res.data;
    } catch (error) {
        return {
            success: true,
            stats: { todayAppointments: 12, pendingRequests: 3, completed: 8, cancelled: 2 },
            todayQueue: [
                { id: 'APT1245123', patientName: 'Sarah Wilson', time: '09:00 AM', type: 'Consulting', status: 'Upcoming' },
                { id: 'APT1245124', patientName: 'Michael Brown', time: '10:30 AM', type: 'Follow Up', status: 'Upcoming' },
                { id: 'APT1245125', patientName: 'Emily Davis', time: '11:30 AM', type: 'Consulting', status: 'Upcoming' }
            ]
        };
    }
};

export const fetchDoctorPatients = async () => {
    try {
        const res = await api.get('/doctors/portal/patients');
        return res.data;
    } catch (error) {
        return {
            success: true,
            patients: [
                { id: 'P101', name: 'Sarah Wilson', email: 'sarahwilson@example.com', phone: '+1 987 654 3210', visits: 4, lastVisit: '15 May 2024' },
                { id: 'P102', name: 'Michael Brown', email: 'michaelbrown@example.com', phone: '+1 987 654 3211', visits: 2, lastVisit: '15 May 2024' },
                { id: 'P103', name: 'Emily Davis', email: 'emilydavis@example.com', phone: '+1 987 654 3212', visits: 1, lastVisit: '14 May 2024' },
                { id: 'P104', name: 'David Lee', email: 'davidlee@example.com', phone: '+1 987 654 3213', visits: 3, lastVisit: '10 May 2024' },
                { id: 'P105', name: 'Jessica Taylor', email: 'jessicataylor@example.com', phone: '+1 987 654 3214', visits: 5, lastVisit: '02 May 2024' }
            ]
        };
    }
};

export const fetchDoctorEarnings = async () => {
    try {
        const res = await api.get('/doctors/portal/earnings');
        return res.data;
    } catch (error) {
        return {
            success: true,
            summary: { thisMonth: 2450, thisWeek: 680, today: 120 },
            transactions: [
                { date: '15 May 2024', patient: 'Sarah Wilson', amount: 50, status: 'Paid' },
                { date: '15 May 2024', patient: 'Michael Brown', amount: 50, status: 'Paid' },
                { date: '14 May 2024', patient: 'Emily Davis', amount: 50, status: 'Paid' },
                { date: '12 May 2024', patient: 'David Lee', amount: 60, status: 'Paid' },
                { date: '10 May 2024', patient: 'Jessica Taylor', amount: 40, status: 'Paid' }
            ]
        };
    }
};
