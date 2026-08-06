import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users, Search, Stethoscope, Star } from 'lucide-react';
import { fetchAllDoctors } from '../services/adminApi';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchAllDoctors();
            if (res.doctors) {
                setDoctors(res.doctors);
            }
            setLoading(false);
        };
        load();
    }, []);

    const filtered = doctors.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Users className='text-purple-500' size={28} />
                            Doctors Directory
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Manage registered medical specialists and availability status.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-64'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search doctor or speciality...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
                        />
                    </div>
                </div>

                {/* Doctors Grid */}
                {loading ? (
                    <p className='text-slate-400 text-xs py-8 text-center'>Loading doctors directory...</p>
                ) : filtered.length === 0 ? (
                    <p className='text-slate-400 text-xs py-8 text-center'>No doctors found.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filtered.map((doc) => (
                            <div
                                key={doc._id || doc.id}
                                className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-md shadow-xl space-y-4 hover:border-purple-500/40 transition-colors group'
                            >
                                <div className='flex items-center gap-4'>
                                    <img
                                        className='w-16 h-16 rounded-2xl object-cover border-2 border-slate-800 shrink-0 group-hover:border-purple-500 transition-colors'
                                        src={doc.image}
                                        alt={doc.name}
                                    />
                                    <div>
                                        <h3 className='font-bold text-white text-base group-hover:text-purple-400 transition-colors'>{doc.name}</h3>
                                        <p className='text-xs text-slate-400 font-medium'>{doc.speciality} &bull; {doc.degree}</p>
                                        <div className='flex items-center gap-1 text-[11px] text-amber-400 mt-1 font-bold'>
                                            <Star size={12} fill='currentColor' /> {doc.rating || 4.8} ({doc.reviewsCount || 120})
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-3 border-t border-slate-800 flex items-center justify-between text-xs'>
                                    <span className='font-bold text-white'>Fee: <span className='text-emerald-400'>${doc.fees}</span></span>
                                    <span className='px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]'>
                                        Available
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default DoctorsList;
