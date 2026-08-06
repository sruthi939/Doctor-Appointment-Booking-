import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Calendar, Search } from 'lucide-react';
import { fetchAppointments, cancelAppointment } from '../../services/appointmentService';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        const res = await fetchAppointments();
        if (res.appointments) {
            setAppointments(res.appointments);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCancel = async (id) => {
        await cancelAppointment(id);
        setAppointments(prev => prev.map(a => (a._id === id || a.id === id) ? { ...a, status: 'Cancelled' } : a));
    };

    const filtered = appointments.filter(a => {
        const matchesStatus = statusFilter === 'All Status' || a.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch = (a.patientDetails?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (a.doctorData?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header matching Diagram */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Calendar className='text-purple-500' size={28} />
                            Appointments Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View, confirm and cancel system appointments.
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className='bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2 text-xs text-white'
                        >
                            <option value='All Status'>All Status</option>
                            <option value='Upcoming'>Upcoming</option>
                            <option value='Completed'>Completed</option>
                            <option value='Cancelled'>Cancelled</option>
                        </select>

                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search patient or doctor...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>
                    </div>
                </div>

                {/* Table matching Diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading appointments...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No appointments found.</p>
                        ) : (
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
                                        <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-white'>{item.patientDetails?.fullName || 'Patient'}</td>
                                            <td className='py-4 px-2 font-semibold text-slate-300'>{item.doctorData?.name || 'Doctor'}</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>
                                                <p className='text-white font-semibold'>{item.slotDate}</p>
                                                <p className='text-purple-400 text-[11px]'>{item.slotTime}</p>
                                            </td>
                                            <td className='py-4 px-2'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                    item.status === 'Upcoming'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : item.status === 'Completed'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right'>
                                                {item.status === 'Upcoming' && (
                                                    <button
                                                        onClick={() => handleCancel(item._id || item.id)}
                                                        className='px-3 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer'
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Appointments;
