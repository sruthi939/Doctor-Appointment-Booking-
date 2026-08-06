import React, { useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { Calendar, UserPlus, Eye, Edit3, XCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReceptionistAppointments = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [appointmentsList, setAppointmentsList] = useState([
        { id: 'APT101', patient: 'John Doe', doctor: 'Dr. Smith', date: '15 May 2024', time: '09:00 AM', status: 'Confirmed' },
        { id: 'APT102', patient: 'Sarah Wilson', doctor: 'Dr. Brown', date: '15 May 2024', time: '10:30 AM', status: 'Confirmed' },
        { id: 'APT103', patient: 'Michael Brown', doctor: 'Dr. Davis', date: '15 May 2024', time: '11:30 AM', status: 'Confirmed' },
        { id: 'APT104', patient: 'Emily Davis', doctor: 'Dr. Wilson', date: '15 May 2024', time: '01:00 PM', status: 'Pending' },
        { id: 'APT105', patient: 'David Lee', doctor: 'Dr. Smith', date: '16 May 2024', time: '09:30 AM', status: 'Cancelled' }
    ]);

    const filtered = appointmentsList.filter(item => {
        const matchesTab = activeTab === 'All' || item.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.doctor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleCancel = (id) => {
        setAppointmentsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    };

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Card matching Step 3 diagram */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Calendar className='text-rose-500' size={28} />
                            Appointments
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View, search, add, reschedule or cancel patient appointments.
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search by patient or doctor...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500'
                            />
                        </div>

                        <button
                            onClick={() => navigate('/receptionist/add-appointment')}
                            className='px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5'
                        >
                            <UserPlus size={16} /> + Add Appointment
                        </button>
                    </div>
                </div>

                {/* Filter Tabs & Appointments Table */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl w-fit overflow-x-auto'>
                        {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-md'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-left text-xs'>
                            <thead>
                                <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                    <th className='pb-3 px-2'>Patient</th>
                                    <th className='pb-3 px-2'>Doctor</th>
                                    <th className='pb-3 px-2'>Date & Time</th>
                                    <th className='pb-3 px-2'>Status</th>
                                    <th className='pb-3 px-2 text-right'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-800/60'>
                                {filtered.map((item) => (
                                    <tr key={item.id} className='hover:bg-slate-800/40 transition-colors'>
                                        <td className='py-4 px-2 font-bold text-white'>{item.patient}</td>
                                        <td className='py-4 px-2 text-slate-300 font-medium'>{item.doctor}</td>
                                        <td className='py-4 px-2 text-slate-300 font-medium'>
                                            <p className='text-white font-semibold'>{item.date}</p>
                                            <p className='text-rose-400 text-[11px]'>{item.time}</p>
                                        </td>
                                        <td className='py-4 px-2'>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                item.status === 'Confirmed'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                    : item.status === 'Pending'
                                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='py-4 px-2 text-right space-x-2'>
                                            <button className='p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors inline-flex cursor-pointer' title='View Info'>
                                                <Eye size={14} />
                                            </button>
                                            <button className='p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors inline-flex cursor-pointer' title='Reschedule'>
                                                <Edit3 size={14} />
                                            </button>
                                            {item.status !== 'Cancelled' && (
                                                <button onClick={() => handleCancel(item.id)} className='p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors inline-flex cursor-pointer' title='Cancel'>
                                                    <XCircle size={14} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistAppointments;
