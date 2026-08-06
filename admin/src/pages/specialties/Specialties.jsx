import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { UserPlus, Plus, Search, X } from 'lucide-react';
import { fetchSpecialties, addSpecialtyApi } from '../../services/reportService';

const Specialties = () => {
    const [specialties, setSpecialties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const load = async () => {
        setLoading(true);
        const res = await fetchSpecialties();
        if (res.specialties) {
            setSpecialties(res.specialties);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateSpecialty = async (e) => {
        e.preventDefault();
        await addSpecialtyApi({ name, description });
        setIsModalOpen(false);
        setName('');
        setDescription('');
        load();
    };

    const filtered = specialties.filter(s =>
        (s.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <UserPlus className='text-purple-500' size={28} />
                            Specialties Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Add and manage medical specialties for doctor categorization.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search specialty...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> + Add Specialty
                        </button>
                    </div>
                </div>

                {/* Specialties Grid */}
                {loading ? (
                    <p className='text-slate-400 text-xs py-8 text-center'>Loading specialties...</p>
                ) : filtered.length === 0 ? (
                    <p className='text-slate-400 text-xs py-8 text-center'>No specialties found.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filtered.map((item) => (
                            <div
                                key={item._id || item.name}
                                className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 backdrop-blur-md shadow-xl space-y-3 hover:border-purple-500/40 transition-colors'
                            >
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-extrabold text-white text-base text-purple-400'>{item.name}</h3>
                                    <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                                        Active
                                    </span>
                                </div>
                                <p className='text-xs text-slate-400 line-clamp-2'>{item.description || 'Medical clinical specialty.'}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal "+ Add Specialty" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <UserPlus className='text-purple-500' size={20} /> Add New Specialty
                            </h2>

                            <form onSubmit={handleCreateSpecialty} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Specialty Name</label>
                                    <input
                                        type='text'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='e.g. Cardiology'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Description</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder='Specialty focus and details...'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white'
                                    ></textarea>
                                </div>

                                <button
                                    type='submit'
                                    className='w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-purple-500/25 cursor-pointer uppercase tracking-wider'
                                >
                                    Save Specialty
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Specialties;
