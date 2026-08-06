import React, { useEffect, useState } from 'react';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { Users, Search, Mail, Phone, Calendar, History, ArrowRight } from 'lucide-react';
import { fetchDoctorPatients } from '../../services/doctorService';

const Patients = ({ onOpenDetails }) => {
    const [patientsList, setPatientsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadPatients = async () => {
            const res = await fetchDoctorPatients();
            if (res?.patients) {
                setPatientsList(res.patients);
            }
        };
        loadPatients();
    }, []);

    const filtered = patientsList.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DoctorLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header & Search */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Users className='text-pink-500' size={28} />
                            Patients Directory
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View patient medical records, contact information, and consultation history.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-72'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search patients...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500'
                        />
                    </div>
                </div>

                {/* Patients List Grid matching diagram */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4 hover:border-pink-500/50 transition-all group'
                        >
                            <div className='flex items-center gap-4 border-b border-slate-800 pb-3'>
                                <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center font-bold text-white text-base shadow-md shrink-0'>
                                    {item.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className='font-bold text-white text-base group-hover:text-pink-400 transition-colors'>{item.name}</h3>
                                    <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'>
                                        Patient ID: #{item.id}
                                    </span>
                                </div>
                            </div>

                            <div className='space-y-2 text-xs text-slate-300'>
                                <p className='flex items-center gap-2 text-slate-400'>
                                    <Mail size={14} className='text-pink-400' />
                                    <span className='text-slate-200'>{item.email}</span>
                                </p>
                                <p className='flex items-center gap-2 text-slate-400'>
                                    <Phone size={14} className='text-indigo-400' />
                                    <span className='text-slate-200'>{item.phone}</span>
                                </p>
                                <div className='flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]'>
                                    <span className='text-slate-400'>Total Consultations: <strong className='text-white'>{item.visits}</strong></span>
                                    <span className='text-emerald-400 font-semibold'>Last Visit: {item.lastVisit}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onOpenDetails && onOpenDetails(item)}
                                className='w-full py-2.5 bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md'
                            >
                                <History size={14} /> View Patient History
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </DoctorLayout>
    );
};

export default Patients;
