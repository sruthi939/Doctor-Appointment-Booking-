import React, { useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { User, Mail, Phone, Save, Edit3, Check } from 'lucide-react';
import { updateReceptionistProfileApi } from '../../services/receptionistService';

const ReceptionistProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('receptionist_user');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return {
            name: 'Olivia Smith',
            email: 'olivia.smith@example.com',
            phone: '+1 987 654 3210',
            role: 'Receptionist',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
        };
    });

    const [formState, setFormState] = useState(profileData);

    const handleSave = async (e) => {
        e.preventDefault();
        setProfileData(formState);
        await updateReceptionistProfileApi(formState);
        setIsEdit(false);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <ReceptionistLayout>
            <div className='max-w-2xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-800 pb-6'>
                        <img
                            className='w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-slate-800 shadow-xl shrink-0'
                            src={formState.image}
                            alt={formState.name}
                        />

                        <div className='text-center sm:text-left space-y-2 flex-1'>
                            {isEdit ? (
                                <input
                                    type='text'
                                    value={formState.name}
                                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                    className='bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-xl font-bold w-full focus:outline-none focus:border-rose-500'
                                />
                            ) : (
                                <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>{profileData.name}</h1>
                            )}
                            <p className='text-xs font-semibold px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full inline-block'>
                                {profileData.role}
                            </p>
                        </div>

                        <button
                            type='button'
                            onClick={isEdit ? handleSave : () => { setFormState(profileData); setIsEdit(true); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                                isEdit
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20'
                                    : 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-500/20'
                            }`}
                        >
                            {isEdit ? <Save size={16} /> : <Edit3 size={16} />}
                            {isEdit ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    {savedNotice && (
                        <div className='p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2'>
                            <Check size={16} /> Receptionist profile updated!
                        </div>
                    )}

                    {/* Details Form Grid matching Step 8 diagram */}
                    <div className='space-y-4 text-xs text-slate-300'>
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
                            <label className='block text-slate-400 mb-1'>Role</label>
                            <span className='font-bold text-rose-400 text-sm block p-2.5 bg-slate-950 rounded-xl border border-slate-800'>{profileData.role}</span>
                        </div>

                        <button
                            type='button'
                            onClick={handleSave}
                            className='w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer uppercase tracking-wider mt-4'
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistProfile;
