import React, { useState, useEffect } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { Calendar, UserPlus, Eye, XCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ReceptionistAppointments = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await api.get('/receptionist/appointments');
            if (res.data?.success && res.data.appointments) {
                setAppointmentsList(res.data.appointments);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const getStatus = (item) => {
        if (item.cancelled) return 'Cancelled';
        if (item.isCompleted) return 'Completed';
        return 'Upcoming';
    };

    const getPatientName = (item) => item.userData?.name || item.patientName || item.phone || 'Patient';
    const getDoctorName = (item) => item.docData?.name || item.doctorName || 'Doctor';

    const filtered = appointmentsList.filter(item => {
        const status = getStatus(item);
        const matchesTab = activeTab === 'All' || status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = getPatientName(item).toLowerCase().includes(searchQuery.toLowerCase()) ||
                              getDoctorName(item).toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleCancel = async (id) => {
        try {
            await api.post('/admin/cancel-appointment', { appointmentId: id });
            setAppointmentsList(prev => prev.map(a => (a._id === id || a.id === id) ? { ...a, cancelled: true } : a));
        } catch (err) {
            console.error('Error cancelling appointment:', err);
        }
    };

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Card */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Calendar className='text-rose-500' size={28} />
                            Appointments List
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Real-time view of patient appointments, walk-ins, and statuses.
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
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading real-time appointments...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No appointments found in database.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Patient</th>
                                        <th className='pb-3 px-2'>Doctor & Specialty</th>
                                        <th className='pb-3 px-2'>Date & Time</th>
                                        <th className='pb-3 px-2'>Fee</th>
                                        <th className='pb-3 px-2'>Status</th>
                                        <th className='pb-3 px-2 text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item, idx) => {
                                        const status = getStatus(item);
                                        const aptId = item._id || item.id;
                                        return (
                                            <tr key={aptId || idx} className='hover:bg-slate-800/40 transition-colors'>
                                                <td className='py-4 px-2 font-bold text-white'>{getPatientName(item)}</td>
                                                <td className='py-4 px-2 text-slate-300 font-medium'>
                                                    <p className='text-white font-semibold'>{getDoctorName(item)}</p>
                                                    <p className='text-rose-400 text-[11px]'>{item.docData?.speciality || 'General'}</p>
                                                </td>
                                                <td className='py-4 px-2 text-slate-300 font-medium'>
                                                    <p className='text-white font-semibold'>{item.slotDate}</p>
                                                    <p className='text-slate-400 text-[11px]'>{item.slotTime}</p>
                                                </td>
                                                <td className='py-4 px-2 font-bold text-emerald-400'>
                                                    ${item.amount || item.docData?.fees || 50}
                                                </td>
                                                <td className='py-4 px-2'>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                        status === 'Upcoming'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                            : status === 'Completed'
                                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                    }`}>
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className='py-4 px-2 text-right space-x-2'>
                                                    {status !== 'Cancelled' && (
                                                        <button 
                                                            onClick={() => handleCancel(aptId)} 
                                                            className='px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1'
                                                        >
                                                            <XCircle size={14} /> Cancel
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistAppointments;
