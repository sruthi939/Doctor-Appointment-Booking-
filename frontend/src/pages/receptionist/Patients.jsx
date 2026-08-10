import React, { useState, useEffect } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { Users, Search, Mail, Phone, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const ReceptionistPatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const res = await api.get('/receptionist/patients');
                if (res.data?.success && res.data.patients) {
                    setPatientsList(res.data.patients);
                }
            } catch (err) {
                console.error('Error fetching patients:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filtered = patientsList.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.phone || '').includes(searchQuery)
    );

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300 max-w-4xl mx-auto'>
                {/* Header & Search */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Users className='text-rose-500' size={28} />
                            Patients Directory
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Real-time patient directory and registered contact records in database.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-72'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search patient...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500'
                        />
                    </div>
                </div>

                {/* Patient Cards List */}
                <div className='space-y-3'>
                    {loading ? (
                        <p className='text-slate-400 text-xs py-8 text-center'>Loading patients from database...</p>
                    ) : filtered.length === 0 ? (
                        <p className='text-slate-400 text-xs py-8 text-center'>No registered patients found in database.</p>
                    ) : (
                        filtered.map((item, idx) => (
                            <div
                                key={item._id || item.id || idx}
                                className='bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex items-center justify-between gap-4 hover:border-slate-700 transition-colors group cursor-pointer'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0 uppercase'>
                                        {item.name ? item.name.substring(0, 2) : 'PT'}
                                    </div>

                                    <div>
                                        <h3 className='font-bold text-white text-sm group-hover:text-rose-400 transition-colors'>{item.name}</h3>
                                        <div className='flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5'>
                                            <span className='flex items-center gap-1'><Mail size={12} className='text-rose-400' /> {item.email || 'N/A'}</span>
                                            <span>&bull;</span>
                                            <span className='flex items-center gap-1'><Phone size={12} className='text-amber-400' /> {item.phone || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <ChevronRight size={18} className='text-slate-500 group-hover:text-white transition-colors' />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistPatients;
