import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Building } from 'lucide-react';

const HospitalProfile = () => {
    const [hospitalName, setHospitalName] = useState('MediCare Central Clinic');
    const [address, setAddress] = useState('17th Cross, Ring Road, London');

    const handleSave = (e) => {
        e.preventDefault();
        alert('Hospital profile saved!');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Hospital Profile Settings' subtitle='Update healthcare facility contact details.' />

                <form onSubmit={handleSave} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Hospital / Clinic Name</label>
                        <input
                            type='text'
                            required
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Address</label>
                        <input
                            type='text'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Building size={16} /> Save Profile
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default HospitalProfile;
