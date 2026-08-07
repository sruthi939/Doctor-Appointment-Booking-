import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import StatusBadge from '../../components/StatusBadge';
import { fetchSpecialities } from '../../services/specialityService';

const SpecialityList = () => {
    const [search, setSearch] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchSpecialities();
            if (res.specialties) setSpecialties(res.specialties);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = specialties.filter(s =>
        (s.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Specialities Directory'
                    subtitle='View active medical specialities.'
                    action={<SearchBar value={search} onChange={setSearch} placeholder='Search speciality...' />}
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filtered.map((item) => (
                        <div key={item._id || item.name} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-md shadow-xl space-y-3'>
                            <div className='flex items-center justify-between'>
                                <h3 className='font-extrabold text-white text-base text-purple-400'>{item.name}</h3>
                                <StatusBadge status='Active' />
                            </div>
                            <p className='text-xs text-slate-400 line-clamp-2'>{item.description || 'Clinical specialty focus.'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SpecialityList;
