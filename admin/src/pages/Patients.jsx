import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { UserCheck, Search, Mail, Phone, ChevronRight } from 'lucide-react';
import { fetchAllPatients } from '../services/adminApi';

const Patients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchAllPatients();
            if (res.users) {
                setPatients(res.users);
            }
            setLoading(false);
        };
        load();
    }, []);

    const filtered = patients.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.phone || '').includes(searchQuery)
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300 max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <UserCheck className='text-purple-500' size={28} />
                            Registered Patients
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Master patient accounts and registration directory.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-64'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search patient...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
                        />
                    </div>
                </div>

                {/* Patient Cards List */}
                <div className='space-y-3'>
                    {loading ? (
                        <p className='text-slate-400 text-xs py-8 text-center'>Loading patient directory...</p>
                    ) : filtered.length === 0 ? (
                        <p className='text-slate-400 text-xs py-8 text-center'>No registered patients found.</p>
                    ) : (
                        filtered.map((item) => (
                            <div
                                key={item._id || item.id}
                                className='bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl flex items-center justify-between gap-4 hover:border-slate-700 transition-colors group cursor-pointer'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0'>
                                        {item.name ? item.name.split(' ').map(n => n[0]).join('') : 'P'}
                                    </div>

                                    <div>
                                        <h3 className='font-bold text-white text-sm group-hover:text-purple-400 transition-colors'>{item.name}</h3>
                                        <div className='flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5'>
                                            <span className='flex items-center gap-1'><Mail size={12} className='text-purple-400' /> {item.email}</span>
                                            <span>&bull;</span>
                                            <span className='flex items-center gap-1'><Phone size={12} className='text-pink-400' /> {item.phone || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <ChevronRight size={18} className='text-slate-500 group-hover:text-white transition-colors' />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Patients;
