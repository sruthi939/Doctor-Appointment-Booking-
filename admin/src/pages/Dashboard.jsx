import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users, Calendar, UserCheck, DollarSign, UserPlus, ArrowRight } from 'lucide-react';
import { fetchAdminDashboard } from '../services/adminApi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchAdminDashboard();
            setDashboardData(data);
            setLoading(false);
        };
        load();
    }, []);

    const stats = dashboardData?.stats || {
        totalDoctors: 0,
        totalAppointments: 0,
        totalPatients: 0,
        totalEarnings: '$0.00'
    };

    const recentAppointments = dashboardData?.recentAppointments || [];

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Banner */}
                <div className='bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-block mb-2'>
                            System Administrator Dashboard 🛡️
                        </span>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Platform Overview</h1>
                        <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                            Monitor doctors, appointments, patient registrations and system metrics.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/admin/add-doctor')}
                        className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto'
                    >
                        <UserPlus size={16} /> + Add Doctor
                    </button>
                </div>

                {/* 4 Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-purple-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Doctors</span>
                            <div className='w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20'>
                                <Users size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalDoctors}</p>
                        <p className='text-[11px] text-slate-400 font-medium'>Active Specialists</p>
                    </div>

                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-indigo-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Appointments</span>
                            <div className='w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20'>
                                <Calendar size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalAppointments}</p>
                        <p className='text-[11px] text-slate-400 font-medium'>Booked Consultations</p>
                    </div>

                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-pink-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Patients</span>
                            <div className='w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20'>
                                <UserCheck size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalPatients}</p>
                        <p className='text-[11px] text-slate-400 font-medium'>Registered Users</p>
                    </div>

                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-emerald-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Platform Volume</span>
                            <div className='w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20'>
                                <DollarSign size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{loading ? '...' : stats.totalEarnings}</p>
                        <p className='text-[11px] text-emerald-400 font-semibold'>Total Consultation Value</p>
                    </div>
                </div>

                {/* Latest Bookings List Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-lg font-bold text-white flex items-center gap-2'>
                            <Calendar size={20} className='text-purple-400' />
                            Latest Appointments
                        </h2>
                        <button
                            onClick={() => navigate('/admin/appointments')}
                            className='text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer'
                        >
                            View All <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className='space-y-3'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-4 text-center'>Loading latest bookings...</p>
                        ) : recentAppointments.length === 0 ? (
                            <p className='text-slate-400 text-xs py-4 text-center'>No recent appointments booked.</p>
                        ) : (
                            recentAppointments.map((apt) => (
                                <div
                                    key={apt.id || apt._id}
                                    className='p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white'
                                >
                                    <div>
                                        <p className='font-bold text-white'>{apt.patientDetails?.fullName || 'Patient'}</p>
                                        <p className='text-slate-400 text-[11px]'>Slot: <span className='text-purple-400'>{apt.slotDate} ({apt.slotTime})</span></p>
                                    </div>
                                    <span className='px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]'>
                                        {apt.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
