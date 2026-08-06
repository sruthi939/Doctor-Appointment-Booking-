import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDoctors } from '../services/doctorService';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDoctors = async () => {
        setLoading(true);
        const res = await fetchDoctors();
        if (res.doctors) setDoctors(res.doctors);
        setLoading(false);
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    return (
        <DoctorContext.Provider value={{ doctors, loading, refreshDoctors: loadDoctors }}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => useContext(DoctorContext);
export default DoctorContext;
