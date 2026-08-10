import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Users, Stethoscope, Clock, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ReceptionistDashboard = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const receptionistToken = localStorage.getItem('receptionistToken');
    const receptionistName = localStorage.getItem('receptionist_name') || 'Receptionist';
    const receptionistEmail = localStorage.getItem('receptionist_email') || 'receptionist@medicare.com';

    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/receptionist/dashboard', {
                headers: { token: receptionistToken }
            });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load receptionist dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className='space-y-6 text-left w-full max-w-6xl m-auto'>
            {/* Account Profile Card showing exact Logged In Email & Name */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-16 h-16 rounded-2xl bg-blue-50 text-[#5F6FFF] border border-blue-200 flex items-center justify-center font-bold text-2xl shrink-0'>
                        {receptionistName.charAt(0).toUpperCase()}
                    </div>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl font-extrabold text-slate-900'>{receptionistName}</h1>
                            <span className='px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#5F6FFF] border border-blue-200'>
                                Front Desk Receptionist
                            </span>
                        </div>
                        <p className='text-xs text-slate-500 font-mono flex items-center gap-1.5'>
                            <Mail size={13} className='text-[#5F6FFF]' />
                            <span>Logged In Email: <strong className='text-slate-800'>{receptionistEmail}</strong></span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={getDashboardData}
                    className='px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#5F6FFF] border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer'
                >
                    <RefreshCw size={14} /> Refresh Schedule
                </button>
            </div>

            {/* Reception Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-blue-50 text-[#5F6FFF] border border-blue-200 flex items-center justify-center shrink-0'>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-medium'>Total Appointments</p>
                        <p className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalAppointments || 0}
                        </p>
                    </div>
                </div>

                <div className='bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0'>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-medium'>Active Doctors</p>
                        <p className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalDoctors || 0}
                        </p>
                    </div>
                </div>

                <div className='bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0'>
                        <Users size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-medium'>Registered Patients</p>
                        <p className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalPatients || 0}
                        </p>
                    </div>
                </div>

                <div className='bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0'>
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-medium'>Pending Check-ins</p>
                        <p className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.pendingCheckins || 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Latest Appointments Table */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4'>
                <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
                    <div>
                        <h2 className='text-lg font-bold text-slate-900'>Patient Check-ins & Bookings</h2>
                        <p className='text-slate-500 text-xs mt-0.5'>Real patient appointment schedule from database.</p>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-xs text-slate-700'>
                        <thead className='bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]'>
                            <tr>
                                <th className='p-3.5 rounded-l-xl'>Patient Name</th>
                                <th className='p-3.5'>Doctor</th>
                                <th className='p-3.5'>Date</th>
                                <th className='p-3.5'>Time</th>
                                <th className='p-3.5 rounded-r-xl'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {dashData?.latestAppointments && dashData.latestAppointments.length > 0 ? (
                                dashData.latestAppointments.map((apt, idx) => (
                                    <tr key={idx} className='hover:bg-slate-50/80 transition-colors'>
                                        <td className='p-3.5 font-bold text-slate-900'>{apt.userData?.name || "Patient"}</td>
                                        <td className='p-3.5 text-slate-600'>{apt.docData?.name || "Doctor"}</td>
                                        <td className='p-3.5 text-slate-500'>{apt.slotDate}</td>
                                        <td className='p-3.5 text-[#5F6FFF] font-bold'>{apt.slotTime}</td>
                                        <td className='p-3.5'>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                apt.cancelled
                                                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                                    : apt.isCompleted
                                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                                    : 'bg-blue-50 text-[#5F6FFF] border border-blue-200'
                                            }`}>
                                                {apt.cancelled ? 'Cancelled' : apt.isCompleted ? 'Completed' : 'Scheduled'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='p-8 text-center text-slate-400 font-medium'>
                                        No patient appointments recorded in database yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
