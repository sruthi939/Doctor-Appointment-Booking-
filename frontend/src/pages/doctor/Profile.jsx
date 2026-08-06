import React, { useState } from 'react';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { User, Mail, Phone, Save, Edit3, Camera, Check } from 'lucide-react';
import { updateDoctorProfileApi } from '../../services/doctorService';

const DoctorProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('doctor_user');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return {
            name: 'Dr. Richard James',
            email: 'richard@medicare.com',
            phone: '+1 987 654 3210',
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '4 Years',
            fees: 50,
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
            about: 'Dr. James has a strong commitment to delivering comprehensive medical care.'
        };
    });

    const [formState, setFormState] = useState(profileData);

    const handleSave = async (e) => {
        e.preventDefault();
        setProfileData(formState);
        await updateDoctorProfileApi(formState);
        setIsEdit(false);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <DoctorLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800 pb-6'>
                        <div className='relative group shrink-0'>
                            <img
                                className='w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-slate-800 shadow-xl'
                                src={formState.image}
                                alt={formState.name}
                            />
                        </div>

                        <div className='text-center sm:text-left space-y-2 flex-1'>
                            {isEdit ? (
                                <input
                                    type='text'
                                    value={formState.name}
                                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                    className='bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-xl font-bold w-full focus:outline-none focus:border-pink-500'
                                />
                            ) : (
                                <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>{profileData.name}</h1>
                            )}
                            <p className='text-xs font-semibold px-3 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full inline-block'>
                                {profileData.speciality} &bull; {profileData.degree}
                            </p>
                        </div>

                        <button
                            type='button'
                            onClick={isEdit ? handleSave : () => { setFormState(profileData); setIsEdit(true); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                                isEdit
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20'
                                    : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-pink-500/20'
                            }`}
                        >
                            {isEdit ? <Save size={16} /> : <Edit3 size={16} />}
                            {isEdit ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    {savedNotice && (
                        <div className='p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2'>
                            <Check size={16} /> Profile updated in database!
                        </div>
                    )}

                    {/* Details Form Grid */}
                    <div className='space-y-4 text-xs text-slate-300'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-slate-400 mb-1'>Full Name</label>
                                {isEdit ? (
                                    <input
                                        type='text'
                                        value={formState.name}
                                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white'
                                    />
                                ) : (
                                    <span className='font-bold text-white text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>{profileData.name}</span>
                                )}
                            </div>

                            <div>
                                <label className='block text-slate-400 mb-1'>Email Address</label>
                                {isEdit ? (
                                    <input
                                        type='email'
                                        value={formState.email}
                                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white'
                                    />
                                ) : (
                                    <span className='font-bold text-white text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>{profileData.email}</span>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <div>
                                <label className='block text-slate-400 mb-1'>Phone Number</label>
                                {isEdit ? (
                                    <input
                                        type='text'
                                        value={formState.phone}
                                        onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white'
                                    />
                                ) : (
                                    <span className='font-bold text-white text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>{profileData.phone}</span>
                                )}
                            </div>

                            <div>
                                <label className='block text-slate-400 mb-1'>Specialization</label>
                                {isEdit ? (
                                    <input
                                        type='text'
                                        value={formState.speciality}
                                        onChange={(e) => setFormState(prev => ({ ...prev, speciality: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white'
                                    />
                                ) : (
                                    <span className='font-bold text-white text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>{profileData.speciality}</span>
                                )}
                            </div>

                            <div>
                                <label className='block text-slate-400 mb-1'>Consultation Fee ($)</label>
                                {isEdit ? (
                                    <input
                                        type='number'
                                        value={formState.fees}
                                        onChange={(e) => setFormState(prev => ({ ...prev, fees: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white'
                                    />
                                ) : (
                                    <span className='font-bold text-white text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>${profileData.fees}.00</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default DoctorProfile;
