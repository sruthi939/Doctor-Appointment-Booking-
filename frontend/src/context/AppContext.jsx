import { createContext, useState, useEffect } from "react";
import { doctors as initialDoctors } from "../assets/assets";
import api from "../services/api";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState(() => {
        return initialDoctors.map(doc => ({
            ...doc,
            rating: doc.rating || 4.8,
            reviewsCount: doc.reviewsCount || 120,
            available: doc.available !== undefined ? doc.available : true
        }));
    });

    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem('token') || localStorage.getItem('user_token') || localStorage.getItem('doc_token');
        return (stored && stored !== 'mock_token_12345' && stored !== 'false' && stored !== 'null') ? stored : false;
    });

    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('doc_user_profile');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return false;
    });

    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('doc_appointments');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return [];
    });

    // Getting Doctors Data from Backend API
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success && data.doctors?.length > 0) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Getting User Profile Data from Backend
    const loadUserProfileData = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAppointments = async () => {
        if (!token) return;
        try {
            const res = await api.get('/appointments/my-appointments');
            if (res.data?.success && res.data.appointments) {
                setAppointments(res.data.appointments);
            }
        } catch (error) {
            // Silently handle unauthenticated state gracefully
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            loadUserProfileData();
            fetchAppointments();
        } else {
            localStorage.removeItem('token');
            setUserData(false);
        }
    }, [token]);

    useEffect(() => {
        if (userData) {
            localStorage.setItem('doc_user_profile', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        if (appointments) {
            localStorage.setItem('doc_appointments', JSON.stringify(appointments));
        }
    }, [appointments]);

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

    const cancelAppointment = (appointmentId) => {
        api.put(`/appointments/${appointmentId}/cancel`).catch(err => console.warn('[Backend Sync]', err.message));

        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId || apt._id === appointmentId) {
                return { ...apt, status: "Cancelled" };
            }
            return apt;
        }));
    };

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
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        appointments,
        setAppointments,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        addDoctorReview
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
