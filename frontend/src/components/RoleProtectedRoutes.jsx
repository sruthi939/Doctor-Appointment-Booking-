import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedDoctorRoute = ({ children }) => {
    const token = localStorage.getItem('doctor_token');
    if (!token) {
        return <Navigate to='/doctor/login' replace />;
    }
    return children ? children : <Outlet />;
};

export const ProtectedReceptionistRoute = ({ children }) => {
    const token = localStorage.getItem('receptionist_token');
    if (!token) {
        return <Navigate to='/receptionist/login' replace />;
    }
    return children ? children : <Outlet />;
};

export const ProtectedAccountantRoute = ({ children }) => {
    const token = localStorage.getItem('accountant_token');
    if (!token) {
        return <Navigate to='/accountant/login' replace />;
    }
    return children ? children : <Outlet />;
};

export const ProtectedUserRoute = ({ children }) => {
    const token = localStorage.getItem('token') || localStorage.getItem('user_token');
    if (!token) {
        return <Navigate to='/login' replace />;
    }
    return children ? children : <Outlet />;
};
