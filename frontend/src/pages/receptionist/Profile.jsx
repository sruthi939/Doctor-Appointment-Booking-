import React, { useState, useEffect } from 'react';
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
        const savedEmail = localStorage.getItem('receptionist_email') || 'receptionist@medicare.com';
        const savedName = localStorage.getItem('receptionist_name') || savedEmail.split('@')[0];
        return {
            name: savedName,
            email: savedEmail,
            phone: '+1 987 654 3210',
            role: 'Front Desk Receptionist',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
        };
    });

    const [formState, setFormState] = useState(profileData);

    useEffect(() => {
        setFormState(profileData);
    }, [profileData]);

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setProfileData(formState);
        const res = await updateReceptionistProfileApi(formState);
        if (res?.user) {
            setProfileData(res.user);
        }
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
                            src={formState.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}
                            alt={formState.name}
                        />

                        <div className='text-center sm:text-left space-y-2 flex-1'>
                            {isEdit ? (
                                <input
                                    type='text'
                                    value={formState.name || ''}
                                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                    className='bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-xl font-bold w-full focus:outline-none focus:border-rose-500'
                                />
                            ) : (
                                <h1 className='text-2xl font-black text-white tracking-tight'>{profileData.name}</h1>
                            )}

                            <div className='inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-xs font-bold'>
                                <User size={13} />
                                <span>{profileData.role || 'Front Desk Receptionist'}</span>
                            </div>
                        </div>
                    </div>

                    {savedNotice && (
                        <div className='p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2'>
                            <Check size={16} />
                            <span>Profile details updated successfully!</span>
                        </div>
                    )}

                    {/* Profile Fields */}
                    <form onSubmit={handleSave} className='space-y-4'>
                        <div>
                            <label className='block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5'>
                                <Mail size={14} className='text-rose-400' /> Registered Email Address
                            </label>
                            {isEdit ? (
                                <input
                                    type='email'
                                    value={formState.email || ''}
                                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                    className='w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 font-mono'
                                />
                            ) : (
                                <p className='text-sm text-slate-200 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80'>
                                    {profileData.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5'>
                                <Phone size={14} className='text-rose-400' /> Phone Number
                            </label>
                            {isEdit ? (
                                <input
                                    type='text'
                                    value={formState.phone || ''}
                                    onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                                    className='w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500 font-mono'
                                />
                            ) : (
                                <p className='text-sm text-slate-200 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80'>
                                    {profileData.phone || '+1 987 654 3210'}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className='pt-4 flex justify-end gap-3'>
                            {isEdit ? (
                                <>
                                    <button
                                        type='button'
                                        onClick={() => { setIsEdit(false); setFormState(profileData); }}
                                        className='px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-rose-500/25 flex items-center gap-2 cursor-pointer'
                                    >
                                        <Save size={16} /> Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    type='button'
                                    onClick={() => setIsEdit(true)}
                                    className='px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 flex items-center gap-2 cursor-pointer'
                                >
                                    <Edit3 size={16} /> Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistProfile;
