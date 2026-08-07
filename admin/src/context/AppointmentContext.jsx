import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAppointments } from '../services/appointmentService';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAppointments = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token || token === 'false') {
            setLoading(false);
            return;
        }
        setLoading(true);
        const res = await fetchAppointments();
        if (res.appointments) setAppointments(res.appointments);
        setLoading(false);
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    return (
        <AppointmentContext.Provider value={{ appointments, loading, refreshAppointments: loadAppointments }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointmentContext = () => useContext(AppointmentContext);
export default AppointmentContext;
