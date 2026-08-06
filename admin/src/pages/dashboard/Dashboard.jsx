import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Stethoscope, Calendar, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { fetchAdminDashboard } from '../../services/adminApi';

const Dashboard = () => {
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchAdminDashboard();
            setDashData(data);
            setLoading(false);
        };
        load();
    }, []);

    const stats = dashData?.stats || {
        totalUsers: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        totalRevenue: '$0.00',
        todayAppointments: 0,
        pendingPayments: '$0.00'
    };

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Title */}
                <div>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Dashboard</h1>
                    <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                        Overview of system statistics & activities.
                    </p>
                </div>

                {/* 6 Metric Cards matching Diagram */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Users</span>
                            <Users className='text-purple-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalUsers}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Doctors</span>
                            <Stethoscope className='text-indigo-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalDoctors}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Appointments</span>
                            <Calendar className='text-pink-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalAppointments}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Revenue</span>
                            <DollarSign className='text-emerald-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-emerald-400'>{loading ? '...' : stats.totalRevenue}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Today's Appointments</span>
                            <Clock className='text-amber-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.todayAppointments}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Pending Payments</span>
                            <AlertCircle className='text-rose-400' size={20} />
                        </div>
                        <p className='text-3xl font-extrabold text-rose-400'>{loading ? '...' : stats.pendingPayments}</p>
                    </div>
                </div>

                {/* Appointments Overview Graph matching Diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-base font-bold text-white uppercase tracking-wider text-purple-400'>
                            Appointments Overview
                        </h2>
                        <span className='text-xs text-slate-400 font-semibold bg-slate-950 px-3 py-1 rounded-full border border-slate-800'>
                            This Week
                        </span>
                    </div>

                    <div className='h-48 w-full relative flex items-end pt-6 pb-2 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden'>
                        <svg className='w-full h-full overflow-visible' viewBox='0 0 500 120' preserveAspectRatio='none'>
                            <defs>
                                <linearGradient id='aptGradient' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='0%' stopColor='#a855f7' stopOpacity='0.4' />
                                    <stop offset='100%' stopColor='#a855f7' stopOpacity='0.0' />
                                </linearGradient>
                            </defs>
                            <path
                                d='M0,80 Q50,30 100,75 T200,35 T300,85 T400,25 T500,55 L500,120 L0,120 Z'
                                fill='url(#aptGradient)'
                            />
                            <path
                                d='M0,80 Q50,30 100,75 T200,35 T300,85 T400,25 T500,55'
                                fill='none'
                                stroke='#a855f7'
                                strokeWidth='3'
                            />
                        </svg>
                        <div className='absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] text-slate-400 font-bold'>
                            <span>May 10</span>
                            <span>May 11</span>
                            <span>May 12</span>
                            <span>May 13</span>
                            <span>May 14</span>
                            <span>May 15</span>
                            <span>May 16</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
