import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { addSpeciality } from '../../services/specialityService';
import { Plus } from 'lucide-react';

const AddSpeciality = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addSpeciality({ name, description });
        alert('Speciality created successfully!');
        setName('');
        setDescription('');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Add New Speciality' subtitle='Onboard a new medical speciality category.' />

                <form onSubmit={handleSubmit} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Speciality Name</label>
                        <input
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='e.g. Cardiology'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description of clinical focus...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white'
                        ></textarea>
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Plus size={16} /> Save Speciality
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddSpeciality;
