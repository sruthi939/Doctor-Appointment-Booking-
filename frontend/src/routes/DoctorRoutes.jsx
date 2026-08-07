import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DoctorLogin from '../pages/doctor/DoctorLogin';
import Dashboard from '../pages/doctor/Dashboard';
import DoctorAppointments from '../pages/doctor/Appointments';
import Schedule from '../pages/doctor/Schedule';
import Patients from '../pages/doctor/Patients';
import Earnings from '../pages/doctor/Earnings';
import DoctorProfile from '../pages/doctor/Profile';
import ConsultationModal from '../pages/doctor/ConsultationModal';
import { ProtectedDoctorRoute } from '../components/RoleProtectedRoutes';

const DoctorLogoutSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-center font-sans'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200'>
                <div className='w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/20'>
                    <CheckCircle2 size={44} />
                </div>
                <div>
                    <h2 className='text-2xl font-extrabold text-white'>Logout Successful!</h2>
                    <p className='text-slate-400 text-xs mt-1'>You have been logged out securely from the system.</p>
                </div>
                <button
                    onClick={() => navigate('/doctor/login')}
                    className='w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer'
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

const DoctorRoutes = () => {
    const [selectedConsultationApt, setSelectedConsultationApt] = useState(null);

    return (
        <>
            <Routes>
                {/* Public Auth Routes */}
                <Route path='/doctor/login' element={<DoctorLogin />} />
                <Route path='/login' element={<DoctorLogin />} />
                <Route path='/doctor/logout-success' element={<DoctorLogoutSuccess />} />
                <Route path='/logout-success' element={<DoctorLogoutSuccess />} />

                {/* Protected Doctor Routes */}
                <Route element={<ProtectedDoctorRoute />}>
                    <Route path='/doctor/dashboard' element={<Dashboard onOpenConsultation={(apt) => setSelectedConsultationApt(apt)} />} />
                    <Route path='/doctor/appointments' element={<DoctorAppointments onOpenConsultation={(apt) => setSelectedConsultationApt(apt)} />} />
                    <Route path='/doctor/schedule' element={<Schedule />} />
                    <Route path='/doctor/patients' element={<Patients />} />
                    <Route path='/doctor/earnings' element={<Earnings />} />
                    <Route path='/doctor/profile' element={<DoctorProfile />} />

                    {/* Fallbacks for sub-router relative paths */}
                    <Route path='/dashboard' element={<Dashboard onOpenConsultation={(apt) => setSelectedConsultationApt(apt)} />} />
                    <Route path='/appointments' element={<DoctorAppointments onOpenConsultation={(apt) => setSelectedConsultationApt(apt)} />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path='/patients' element={<Patients />} />
                    <Route path='/earnings' element={<Earnings />} />
                    <Route path='/profile' element={<DoctorProfile />} />
                </Route>
            </Routes>

            {/* Global Doctor Consultation Modal */}
            <ConsultationModal
                isOpen={!!selectedConsultationApt}
                appointment={selectedConsultationApt}
                onClose={() => setSelectedConsultationApt(null)}
            />
        </>
    );
};

export default DoctorRoutes;
