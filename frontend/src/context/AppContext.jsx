import { createContext, useState, useEffect } from "react";
import { doctors as initialDoctors } from "../assets/assets";
import api from "../services/api";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';

    // Doctors state initialized with default assets, refreshed from Backend API
    const [doctors, setDoctors] = useState(() => {
        return initialDoctors.map(doc => ({
            ...doc,
            rating: doc.rating || 4.8,
            reviewsCount: doc.reviewsCount || 120,
            available: true
        }));
    });

    // Auth Token state
    const [token, setToken] = useState(() => {
        return localStorage.getItem('doc_token') || 'mock_token_12345';
    });

    // User Data profile state
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('doc_user_profile');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return {
            name: "John Smith",
            email: "johnsmith@example.com",
            phone: "+1 987 654 3210",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250",
            address: { line1: "57th Cross, Richmond", line2: "Circle, Ring Road, London" },
            gender: "Male",
            dob: "1995-07-20"
        };
    });

    // Appointments state
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('doc_appointments');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return [
            {
                id: "APT1245123",
                _id: "APT1245123",
                docId: "doc1",
                doctor: initialDoctors[0],
                slotDate: "15 May 2026",
                slotTime: "11:00 AM",
                amount: initialDoctors[0].fees,
                status: "Upcoming",
                paymentMethod: "Credit / Debit Card",
                paymentStatus: "Paid",
                patientDetails: {
                    fullName: "John Smith",
                    email: "johnsmith@example.com",
                    phone: "+1 987 654 3210",
                    reason: "Fever and headache"
                },
                createdAt: new Date().toISOString()
            },
            {
                id: "APT1239088",
                _id: "APT1239088",
                docId: "doc3",
                doctor: initialDoctors[2],
                slotDate: "10 May 2026",
                slotTime: "04:00 PM",
                amount: initialDoctors[2].fees,
                status: "Completed",
                paymentMethod: "UPI",
                paymentStatus: "Paid",
                patientDetails: {
                    fullName: "John Smith",
                    email: "johnsmith@example.com",
                    phone: "+1 987 654 3210",
                    reason: "Skin consultation"
                },
                reviewSubmitted: false,
                createdAt: new Date().toISOString()
            }
        ];
    });

    // 1. Fetch doctors from backend
    const fetchDoctors = async () => {
        try {
            const res = await api.get('/doctors');
            if (res.data?.success && res.data.doctors?.length > 0) {
                setDoctors(res.data.doctors);
            }
        } catch (error) {
            console.warn('[AppContext] Backend API offline or unreachable, using active client dataset');
        }
    };

    // 2. Fetch User Appointments from backend
    const fetchAppointments = async () => {
        if (!token) return;
        try {
            const res = await api.get('/appointments/my-appointments');
            if (res.data?.success && res.data.appointments) {
                setAppointments(res.data.appointments);
            }
        } catch (error) {
            console.warn('[AppContext] Could not sync appointments from backend API');
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('doc_token', token);
            fetchAppointments();
        } else {
            localStorage.removeItem('doc_token');
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('doc_user_profile', JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('doc_appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Book new appointment via API
    const bookAppointment = (docId, slotDate, slotTime, patientDetails, paymentMethod = "Credit Card") => {
        const doc = doctors.find(d => d._id === docId || d.id === docId) || initialDoctors[0];
        
        const newApt = {
            id: `APT${Math.floor(1000000 + Math.random() * 9000000)}`,
            _id: `APT${Math.floor(1000000 + Math.random() * 9000000)}`,
            docId,
            doctor: doc,
            doctorData: doc,
            slotDate,
            slotTime,
            amount: doc.fees,
            status: "Upcoming",
            paymentMethod,
            paymentStatus: "Paid",
            patientDetails,
            createdAt: new Date().toISOString()
        };

        // Async API post
        api.post('/appointments/book', {
            docId,
            slotDate,
            slotTime,
            patientDetails,
            paymentMethod
        }).catch(err => console.warn('[Backend Sync]', err.message));

        setAppointments(prev => [newApt, ...prev]);
        return newApt;
    };

    // Cancel appointment via API
    const cancelAppointment = (appointmentId) => {
        api.put(`/appointments/${appointmentId}/cancel`).catch(err => console.warn('[Backend Sync]', err.message));

        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId || apt._id === appointmentId) {
                return { ...apt, status: "Cancelled" };
            }
            return apt;
        }));
    };

    // Reschedule appointment via API
    const rescheduleAppointment = (appointmentId, newSlotDate, newSlotTime) => {
        api.put(`/appointments/${appointmentId}/reschedule`, { newSlotDate, newSlotTime })
            .catch(err => console.warn('[Backend Sync]', err.message));

        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId || apt._id === appointmentId) {
                return { 
                    ...apt, 
                    slotDate: newSlotDate, 
                    slotTime: newSlotTime, 
                    status: "Upcoming" 
                };
            }
            return apt;
        }));
    };

    // Add Doctor Review via API
    const addDoctorReview = (appointmentId, rating, reviewText) => {
        const apt = appointments.find(a => a.id === appointmentId || a._id === appointmentId);
        
        if (apt) {
            api.post('/reviews', {
                appointmentId,
                docId: apt.docId,
                rating,
                reviewText
            }).catch(err => console.warn('[Backend Sync]', err.message));
        }

        setAppointments(prev => prev.map(aptItem => {
            if (aptItem.id === appointmentId || aptItem._id === appointmentId) {
                return {
                    ...aptItem,
                    reviewSubmitted: true,
                    rating,
                    reviewText
                };
            }
            return aptItem;
        }));
    };

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        userData,
        setUserData,
        appointments,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        addDoctorReview,
        fetchDoctors
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
