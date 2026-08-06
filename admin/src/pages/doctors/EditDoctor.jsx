import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Save } from 'lucide-react';

const EditDoctor = () => {
    const [name, setName] = useState('Dr. Richard James');
    const [fees, setFees] = useState('50');

    const handleSave = (e) => {
        e.preventDefault();
        alert('Doctor profile updated successfully!');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Edit Doctor Profile' subtitle='Update doctor information and consultation fee.' />

                <form onSubmit={handleSave} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Doctor Name</label>
                        <input
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Consultation Fee ($)</label>
                        <input
                            type='number'
                            required
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Save size={16} /> Save Changes
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditDoctor;
