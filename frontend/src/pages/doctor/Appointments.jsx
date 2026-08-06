import React, { useState } from 'react';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { Calendar, Filter, Stethoscope, Eye, XCircle, CheckCircle } from 'lucide-react';

const DoctorAppointments = ({ onOpenConsultation, onOpenDetails }) => {
    const [activeTab, setActiveTab] = useState('All');

    const [appointmentsList, setAppointmentsList] = useState([
        { id: 'APT1245123', patientName: 'Sarah Wilson', email: 'sarahwilson@example.com', phone: '+1 987 654 3210', date: '15 May 2024', time: '09:00 AM', type: 'Consulting', status: 'Upcoming', reason: 'Fever and headache' },
        { id: 'APT1245124', patientName: 'Michael Brown', email: 'michaelbrown@example.com', phone: '+1 987 654 3211', date: '15 May 2024', time: '10:30 AM', type: 'Consulting', status: 'Upcoming', reason: 'General checkup' },
        { id: 'APT1245125', patientName: 'Emily Davis', email: 'emilydavis@example.com', phone: '+1 987 654 3212', date: '15 May 2024', time: '11:30 AM', type: 'Consulting', status: 'Upcoming', reason: 'Routine blood test consultation' },
        { id: 'APT1245126', patientName: 'David Lee', email: 'davidlee@example.com', phone: '+1 987 654 3213', date: '16 May 2024', time: '09:00 AM', type: 'Consulting', status: 'Pending', reason: 'Back pain consultation' },
        { id: 'APT1245127', patientName: 'Jessica Taylor', email: 'jessicataylor@example.com', phone: '+1 987 654 3214', date: '14 May 2024', time: '10:00 AM', type: 'Follow Up', status: 'Completed', reason: 'Post treatment review' },
        { id: 'APT1245128', patientName: 'Robert Johnson', email: 'robertjohnson@example.com', phone: '+1 987 654 3215', date: '14 May 2024', time: '02:00 PM', type: 'Consulting', status: 'Cancelled', reason: 'Cancelled by patient' }
    ]);

    const filtered = appointmentsList.filter(item => {
        if (activeTab === 'All') return true;
        return item.status.toLowerCase() === activeTab.toLowerCase();
    });

    const handleCancel = (id) => {
        setAppointmentsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    };

    return (
        <DoctorLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Calendar className='text-pink-500' size={28} />
                            Manage Appointments
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View all upcoming patient appointments, launch consultations & manage status.
                        </p>
                    </div>

                    {/* Filter Tabs matching diagram */}
                    <div className='flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto'>
                        {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointments Table Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl overflow-x-auto'>
                    <table className='w-full text-left text-xs'>
                        <thead>
                            <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                <th className='pb-3 px-2'>Patient</th>
                                <th className='pb-3 px-2'>Date & Time</th>
                                <th className='pb-3 px-2'>Type</th>
                                <th className='pb-3 px-2'>Status</th>
                                <th className='pb-3 px-2 text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-800/60'>
                            {filtered.map((item) => (
                                <tr key={item.id} className='hover:bg-slate-800/40 transition-colors'>
                                    <td className='py-4 px-2'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-pink-400 text-xs shrink-0'>
                                                {item.patientName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className='font-bold text-white text-sm'>{item.patientName}</p>
                                                <p className='text-[11px] text-slate-400'>#{item.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-4 px-2 text-slate-300 font-medium'>
                                        <p className='text-white font-semibold'>{item.date}</p>
                                        <p className='text-pink-400 text-[11px]'>{item.time}</p>
                                    </td>
                                    <td className='py-4 px-2 text-slate-300 font-medium'>
                                        <span className='px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px]'>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className='py-4 px-2'>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                            item.status === 'Upcoming'
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                                : item.status === 'Completed'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                : item.status === 'Pending'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className='py-4 px-2 text-right space-x-2'>
                                        {item.status === 'Upcoming' && (
                                            <button
                                                onClick={() => onOpenConsultation && onOpenConsultation(item)}
                                                className='px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-1'
                                            >
                                                <Stethoscope size={12} /> Consultation
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onOpenDetails && onOpenDetails(item)}
                                            className='px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors inline-flex items-center gap-1 cursor-pointer'
                                        >
                                            <Eye size={12} /> Details
                                        </button>
                                        {item.status === 'Upcoming' && (
                                            <button
                                                onClick={() => handleCancel(item.id)}
                                                className='px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs transition-colors inline-flex items-center gap-1 cursor-pointer'
                                            >
                                                <XCircle size={12} /> Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default DoctorAppointments;
