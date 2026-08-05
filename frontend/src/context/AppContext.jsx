import { createContext, useState, useEffect } from "react";
import { doctors as initialDoctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    
    // Doctors state with enhanced ratings & reviews
    const [doctors, setDoctors] = useState(() => {
        return initialDoctors.map(doc => ({
            ...doc,
            rating: doc.rating || (4.5 + (parseInt(doc._id.replace('doc', '')) % 5) * 0.1).toFixed(1),
            reviewsCount: doc.reviewsCount || 40 + (parseInt(doc._id.replace('doc', '')) * 12),
            available: true,
            availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }));
    });

    // Auth state
    const [token, setToken] = useState(() => {
        return localStorage.getItem('doc_token') || 'mock_token_12345';
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('doc_token', token);
        } else {
            localStorage.removeItem('doc_token');
        }
    }, [token]);

    // User profile state
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
            address: {
                line1: "57th Cross, Richmond",
                line2: "Circle, Ring Road, London"
            },
            gender: "Male",
            dob: "1995-07-20"
        };
    });

    useEffect(() => {
        localStorage.setItem('doc_user_profile', JSON.stringify(userData));
    }, [userData]);

    // Appointments state (Initial sample data to match the Step 8 diagram UI)
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('doc_appointments');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return [
            {
                id: "APT1245123",
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
            },
            {
                id: "APT1234566",
                docId: "doc5",
                doctor: initialDoctors[4],
                slotDate: "02 May 2026",
                slotTime: "10:00 AM",
                amount: initialDoctors[4].fees,
                status: "Completed",
                paymentMethod: "Net Banking",
                paymentStatus: "Paid",
                patientDetails: {
                    fullName: "John Smith",
                    email: "johnsmith@example.com",
                    phone: "+1 987 654 3210",
                    reason: "Migraine evaluation"
                },
                reviewSubmitted: true,
                rating: 5,
                reviewText: "Great doctor! Very friendly and explained everything clearly.",
                createdAt: new Date().toISOString()
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('doc_appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Book new appointment
    const bookAppointment = (docId, slotDate, slotTime, patientDetails, paymentMethod = "Credit Card") => {
        const doc = doctors.find(d => d._id === docId);
        const newApt = {
            id: `APT${Math.floor(1000000 + Math.random() * 9000000)}`,
            docId,
            doctor: doc,
            slotDate,
            slotTime,
            amount: doc.fees,
            status: "Upcoming",
            paymentMethod,
            paymentStatus: "Paid",
            patientDetails,
            createdAt: new Date().toISOString()
        };
        setAppointments(prev => [newApt, ...prev]);
        return newApt;
    };

    // Cancel appointment
    const cancelAppointment = (appointmentId) => {
        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId) {
                return { ...apt, status: "Cancelled" };
            }
            return apt;
        }));
    };

    // Reschedule appointment
    const rescheduleAppointment = (appointmentId, newSlotDate, newSlotTime) => {
        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId) {
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

    // Add Doctor Review
    const addDoctorReview = (appointmentId, rating, reviewText) => {
        setAppointments(prev => prev.map(apt => {
            if (apt.id === appointmentId) {
                return {
                    ...apt,
                    reviewSubmitted: true,
                    rating,
                    reviewText
                };
            }
            return apt;
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
        addDoctorReview
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;