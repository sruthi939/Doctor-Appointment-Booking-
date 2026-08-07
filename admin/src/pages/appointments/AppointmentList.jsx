import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import StatusBadge from '../../components/StatusBadge';
import { fetchAppointments, cancelAppointment } from '../../services/appointmentService';

const AppointmentList = () => {
    const [search, setSearch] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchAppointments();
            if (res.appointments) setAppointments(res.appointments);
            setLoading(false);
        };
        load();
    }, []);

    const handleCancel = async (id) => {
        await cancelAppointment(id);
        setAppointments(prev => prev.map(a => (a._id === id || a.id === id) ? { ...a, status: 'Cancelled' } : a));
    };

    const filtered = appointments.filter(a =>
        (a.patientDetails?.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.doctorData?.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Master Appointments'
                    subtitle='View and manage system bookings.'
                    action={<SearchBar value={search} onChange={setSearch} placeholder='Search appointment...' />}
                />

                <Table headers={['Patient', 'Doctor', 'Date & Time', 'Status', 'Action']}>
                    {loading ? (
                        <tr><td colSpan={5} className='py-6 text-center text-slate-400'>Loading appointments...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={5} className='py-6 text-center text-slate-400'>No appointments found.</td></tr>
                    ) : (
                        filtered.map((item) => (
                            <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                <td className='py-4 px-2 font-bold text-white'>{item.patientDetails?.fullName || 'Patient'}</td>
                                <td className='py-4 px-2 font-semibold text-slate-300'>{item.doctorData?.name || 'Doctor'}</td>
                                <td className='py-4 px-2 text-slate-300 font-medium'>
                                    <p className='text-white font-semibold'>{item.slotDate}</p>
                                    <p className='text-purple-400 text-[11px]'>{item.slotTime}</p>
                                </td>
                                <td className='py-4 px-2'><StatusBadge status={item.status} /></td>
                                <td className='py-4 px-2 text-right'>
                                    {item.status === 'Upcoming' && (
                                        <button
                                            onClick={() => handleCancel(item._id || item.id)}
                                            className='px-3 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-xs font-bold cursor-pointer'
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            </div>
        </AdminLayout>
    );
};

export default AppointmentList;
