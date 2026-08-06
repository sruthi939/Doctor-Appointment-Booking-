import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to='/admin/login' replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
