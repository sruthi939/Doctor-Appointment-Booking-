import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Calendar, Users, Stethoscope, Clock, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const ReceptionistDashboard = () => {
    const { aToken, backendUrl: adminBackendUrl } = useContext(AdminContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || adminBackendUrl || 'http://localhost:5000';
    const receptionistToken = localStorage.getItem('receptionistToken') || aToken;
    const receptionistName = localStorage.getItem('receptionist_name') || 'Receptionist';
    const receptionistEmail = localStorage.getItem('receptionist_email') || 'receptionist@medicare.com';

    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/receptionist/dashboard', {
                headers: { atoken: aToken, rtoken: receptionistToken, token: receptionistToken }
            });
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, [aToken]);

    return (
        <div className='space-y-6 text-left w-full max-w-6xl m-auto'>
            {/* Account Profile Card */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold text-2xl shrink-0'>
                        {receptionistName.charAt(0).toUpperCase()}
                    </div>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl font-extrabold text-slate-900'>{receptionistName}</h1>
                            <span className='px-3 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200'>
                                Front Desk Operations
                            </span>
                        </div>
                        <p className='text-xs text-slate-500 font-mono flex items-center gap-1.5'>
                            <Mail size={13} className='text-rose-500' />
                            <span>Logged In Email: <strong className='text-slate-800'>{receptionistEmail}</strong></span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={getDashboardData}
                    className='px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer'
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Desk Data
                </button>
            </div>

            {/* Reception Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0'>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Total Appointments</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalAppointments || 0}
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0'>
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Pending Check-ins</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.pendingCheckins || 0}
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0'>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>On-Duty Doctors</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalDoctors || 0}
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0'>
                        <Users size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Registered Patients</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalPatients || 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Recent Desk Bookings */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4'>
                <div>
                    <h2 className='text-lg font-bold text-slate-900'>Recent Front Desk Appointments</h2>
                    <p className='text-slate-500 text-xs mt-0.5'>Walk-in and scheduled patient bookings recorded in database.</p>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-xs'>
                        <thead className='bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]'>
                            <tr>
                                <th className='p-4 rounded-tl-2xl'>#</th>
                                <th className='p-4'>Patient Name</th>
                                <th className='p-4'>Doctor & Specialty</th>
                                <th className='p-4'>Date & Time</th>
                                <th className='p-4'>Fee</th>
                                <th className='p-4 rounded-tr-2xl'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {dashData?.latestAppointments && dashData.latestAppointments.length > 0 ? (
                                dashData.latestAppointments.map((apt, index) => (
                                    <tr key={apt._id || index} className='hover:bg-slate-50/80 transition-colors'>
                                        <td className='p-4 font-bold text-slate-400'>{index + 1}</td>
                                        <td className='p-4 font-bold text-slate-900'>{apt.userData?.name || apt.patientName || 'Patient'}</td>
                                        <td className='p-4 text-slate-600'>
                                            <p className='font-semibold text-slate-800'>{apt.docData?.name || 'Doctor'}</p>
                                            <p className='text-[#5F6FFF] text-[11px]'>{apt.docData?.speciality || 'General'}</p>
                                        </td>
                                        <td className='p-4 text-slate-500 font-mono'>{apt.slotDate} ({apt.slotTime})</td>
                                        <td className='p-4 font-extrabold text-slate-900'>${apt.amount || 50}.00</td>
                                        <td className='p-4'>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                apt.isCompleted
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    : apt.cancelled
                                                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                                                    : 'bg-amber-50 text-amber-600 border-amber-200'
                                            }`}>
                                                {apt.isCompleted ? 'Completed' : apt.cancelled ? 'Cancelled' : 'Waiting Check-in'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className='p-8 text-center text-slate-400 font-medium'>
                                        No front desk appointments recorded in database yet.
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
