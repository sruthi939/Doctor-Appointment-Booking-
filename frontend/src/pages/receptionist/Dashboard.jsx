import React, { useEffect, useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { Calendar, Clock, CheckCircle2, XCircle, ListOrdered, ArrowRight, UserPlus, Users } from 'lucide-react';
import { fetchReceptionistDashboard } from '../../services/receptionistService';
import { useNavigate } from 'react-router-dom';

const ReceptionistDashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            const data = await fetchReceptionistDashboard();
            setDashboardData(data);
        };
        loadDashboard();
    }, []);

    const stats = dashboardData?.stats || {
        todayAppointments: 12,
        waitingInQueue: 3,
        confirmed: 8,
        cancelled: 1
    };

    const todayAppointments = [
        { id: 'APT101', patient: 'John Doe', doctor: 'Dr. Smith', time: '09:00 AM', type: 'Consulting', status: 'Confirmed' },
        { id: 'APT102', patient: 'Sarah Wilson', doctor: 'Dr. Brown', time: '10:30 AM', type: 'Follow Up', status: 'Confirmed' },
        { id: 'APT103', patient: 'Michael Brown', doctor: 'Dr. Davis', time: '11:30 AM', type: 'Consulting', status: 'Confirmed' }
    ];

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Welcome Header */}
                <div className='bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div>
                        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-block mb-2'>
                            Good Morning 👋
                        </span>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Olivia Smith</h1>
                        <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                            Here's what's happening at the clinic front desk today.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => navigate('/receptionist/add-appointment')}
                            className='px-4 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs shadow-lg shadow-pink-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <UserPlus size={16} /> + Add Appointment
                        </button>
                    </div>
                </div>

                {/* 4 Metric Stats Cards matching Step 2 diagram */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* Today's Appointments */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-rose-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20'>
                            <Calendar size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.todayAppointments}</p>
                        <p className='text-xs text-slate-400 font-medium'>Today's Appointments</p>
                    </div>

                    {/* Waiting in Queue */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-amber-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20'>
                            <ListOrdered size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.waitingInQueue}</p>
                        <p className='text-xs text-slate-400 font-medium'>Waiting in Queue</p>
                    </div>

                    {/* Confirmed */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-emerald-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20'>
                            <CheckCircle2 size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.confirmed}</p>
                        <p className='text-xs text-slate-400 font-medium'>Confirmed Visits</p>
                    </div>

                    {/* Cancelled */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-rose-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20'>
                            <XCircle size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.cancelled}</p>
                        <p className='text-xs text-slate-400 font-medium'>Cancelled Visits</p>
                    </div>
                </div>

                {/* Today's Appointments List Card matching Step 2 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                            <Calendar size={20} className='text-rose-400' />
                            Today's Appointments
                        </h2>
                        <button
                            onClick={() => navigate('/receptionist/appointments')}
                            className='text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer'
                        >
                            View All <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className='space-y-3'>
                        {todayAppointments.map((item) => (
                            <div
                                key={item.id}
                                className='p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-rose-400 text-sm'>
                                        {item.patient.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-white text-sm'>{item.patient}</h3>
                                        <p className='text-xs text-slate-400 flex items-center gap-2 mt-0.5'>
                                            <span>Doctor: <strong className='text-white'>{item.doctor}</strong></span>
                                            <span>&bull;</span>
                                            <span>Time: <strong className='text-rose-400'>{item.time}</strong></span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2 self-end sm:self-auto'>
                                    <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistDashboard;
