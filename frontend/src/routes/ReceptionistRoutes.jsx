import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ReceptionistLogin from '../pages/receptionist/ReceptionistLogin';
import ReceptionistDashboard from '../pages/receptionist/Dashboard';
import ReceptionistAppointments from '../pages/receptionist/Appointments';
import ReceptionistSchedule from '../pages/receptionist/Schedule';
import ReceptionistPatients from '../pages/receptionist/Patients';
import AddAppointment from '../pages/receptionist/AddAppointment';
import ReceptionistQueue from '../pages/receptionist/Queue';
import ReceptionistProfile from '../pages/receptionist/Profile';
import { ProtectedReceptionistRoute } from '../components/RoleProtectedRoutes';

const ReceptionistLogoutSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-center font-sans'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200'>
                <div className='w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/20'>
                    <CheckCircle2 size={44} />
                </div>
                <div>
                    <h2 className='text-2xl font-extrabold text-white'>Logged Out Successfully!</h2>
                    <p className='text-slate-400 text-xs mt-1'>You have been logged out securely from the receptionist portal.</p>
                </div>
                <button
                    onClick={() => navigate('/receptionist/login')}
                    className='w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer'
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

const ReceptionistRoutes = () => {
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path='/receptionist/login' element={<ReceptionistLogin />} />
            <Route path='/login' element={<ReceptionistLogin />} />
            <Route path='/receptionist/logout-success' element={<ReceptionistLogoutSuccess />} />
            <Route path='/logout-success' element={<ReceptionistLogoutSuccess />} />

            {/* Protected Receptionist Routes */}
            <Route element={<ProtectedReceptionistRoute />}>
                <Route path='/receptionist/dashboard' element={<ReceptionistDashboard />} />
                <Route path='/receptionist/appointments' element={<ReceptionistAppointments />} />
                <Route path='/receptionist/schedule' element={<ReceptionistSchedule />} />
                <Route path='/receptionist/patients' element={<ReceptionistPatients />} />
                <Route path='/receptionist/add-appointment' element={<AddAppointment />} />
                <Route path='/receptionist/queue' element={<ReceptionistQueue />} />
                <Route path='/receptionist/profile' element={<ReceptionistProfile />} />

                {/* Fallbacks */}
                <Route path='/dashboard' element={<ReceptionistDashboard />} />
                <Route path='/appointments' element={<ReceptionistAppointments />} />
                <Route path='/schedule' element={<ReceptionistSchedule />} />
                <Route path='/patients' element={<ReceptionistPatients />} />
                <Route path='/add-appointment' element={<AddAppointment />} />
                <Route path='/queue' element={<ReceptionistQueue />} />
                <Route path='/profile' element={<ReceptionistProfile />} />
            </Route>
        </Routes>
    );
};

export default ReceptionistRoutes;
