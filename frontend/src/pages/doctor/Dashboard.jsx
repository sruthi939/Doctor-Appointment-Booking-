import React, { useEffect, useState } from 'react';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
import { fetchDoctorDashboard } from '../../services/doctorService';

const Dashboard = ({ onOpenConsultation }) => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            const data = await fetchDoctorDashboard();
            setDashboardData(data);
        };
        loadDashboard();
    }, []);

    const stats = dashboardData?.stats || {
        todayAppointments: 12,
        pendingRequests: 3,
        completed: 8,
        cancelled: 2
    };

    const queue = dashboardData?.todayQueue || [
        { id: 'APT1245123', patientName: 'Sarah Wilson', time: '09:00 AM', type: 'Consulting', status: 'Upcoming' },
        { id: 'APT1245124', patientName: 'Michael Brown', time: '10:30 AM', type: 'Follow Up', status: 'Upcoming' },
        { id: 'APT1245125', patientName: 'Emily Davis', time: '11:30 AM', type: 'Consulting', status: 'Upcoming' }
    ];

    return (
        <DoctorLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Welcome Banner matching diagram */}
                <div className='bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div>
                        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-block mb-2'>
                            Good Morning 👋
                        </span>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Dr. John Doe</h1>
                        <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                            Here's what's happening with your appointments today.
                        </p>
                    </div>

                    <div className='flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs text-slate-300'>
                        <Clock size={16} className='text-pink-400' />
                        <span>Today: <strong>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span>
                    </div>
                </div>

                {/* 4 Metric Stats Cards matching diagram */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* Today's Appointments */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-pink-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20'>
                            <Calendar size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.todayAppointments}</p>
                        <p className='text-xs text-slate-400 font-medium'>Today's Appointments</p>
                    </div>

                    {/* Pending Requests */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-amber-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20'>
                            <AlertCircle size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.pendingRequests}</p>
                        <p className='text-xs text-slate-400 font-medium'>Pending Requests</p>
                    </div>

                    {/* Completed */}
                    <div className='p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2 shadow-lg hover:border-emerald-500/40 transition-colors'>
                        <div className='w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20'>
                            <CheckCircle2 size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.completed}</p>
                        <p className='text-xs text-slate-400 font-medium'>Completed Visits</p>
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

                {/* Today's Appointments List Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                            <UserCheck size={20} className='text-pink-400' />
                            Today's Appointments Queue
                        </h2>
                        <a href='/doctor/appointments' className='text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1'>
                            View All <ArrowRight size={12} />
                        </a>
                    </div>

                    <div className='space-y-3'>
                        {queue.map((item) => (
                            <div
                                key={item.id}
                                className='p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-pink-400 text-sm'>
                                        {item.patientName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-white text-sm'>{item.patientName}</h3>
                                        <p className='text-xs text-slate-400 flex items-center gap-2 mt-0.5'>
                                            <span>Time: <strong className='text-slate-300'>{item.time}</strong></span>
                                            <span>&bull;</span>
                                            <span>Type: <strong className='text-indigo-400'>{item.type}</strong></span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2 self-end sm:self-auto'>
                                    <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'>
                                        {item.status}
                                    </span>
                                    <button
                                        onClick={() => onOpenConsultation && onOpenConsultation(item)}
                                        className='px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-pink-500/20 flex items-center gap-1 cursor-pointer'
                                    >
                                        <Stethoscope size={14} /> Start Consultation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default Dashboard;
