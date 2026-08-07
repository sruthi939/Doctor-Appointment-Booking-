import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Stethoscope, Plus, Search, Star } from 'lucide-react';
import { fetchDoctors, toggleDoctorAvailability } from '../../services/doctorService';
import { useNavigate } from 'react-router-dom';

const DoctorsList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        const res = await fetchDoctors();
        if (res.doctors) {
            setDoctors(res.doctors);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleToggleAvailability = async (id) => {
        await toggleDoctorAvailability(id);
        setDoctors(prev => prev.map(d => (d._id === id || d.id === id) ? { ...d, available: !d.available } : d));
    };

    const filtered = doctors.filter(d =>
        (d.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.speciality || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header matching Diagram */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Stethoscope className='text-purple-500' size={28} />
                            Doctors Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Add, edit or deactivate system doctors and specialties.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search doctor...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => navigate('/admin/doctors/add')}
                            className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> + Add Doctor
                        </button>
                    </div>
                </div>

                {/* Table matching Diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading doctors...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No doctors found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Doctor</th>
                                        <th className='pb-3 px-2'>Specialty</th>
                                        <th className='pb-3 px-2'>Status</th>
                                        <th className='pb-3 px-2 text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((doc) => (
                                        <tr key={doc._id || doc.id} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-white flex items-center gap-3'>
                                                <img className='w-9 h-9 rounded-xl object-cover border border-slate-800' src={doc.image} alt='' />
                                                <div>
                                                    <p className='font-bold text-white'>{doc.name}</p>
                                                    <p className='text-[10px] text-slate-400 font-normal'>{doc.degree}</p>
                                                </div>
                                            </td>
                                            <td className='py-4 px-2 font-semibold text-slate-300'>{doc.speciality}</td>
                                            <td className='py-4 px-2'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                    doc.available !== false
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                }`}>
                                                    {doc.available !== false ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right'>
                                                <button
                                                    onClick={() => handleToggleAvailability(doc._id || doc.id)}
                                                    className='px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-300 font-semibold cursor-pointer'
                                                >
                                                    Toggle Status
                                                </button>
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

export default DoctorsList;
