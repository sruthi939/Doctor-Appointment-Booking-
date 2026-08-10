import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, Camera, Check } from 'lucide-react';

const MyProfile = () => {
    const { userData, setUserData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const [formState, setFormState] = useState(userData);

    const handleSave = (e) => {
        e.preventDefault();
        setUserData(formState);
        setIsEdit(false);
    };

    return (
        <div className='max-w-3xl mx-auto my-6 space-y-6 text-left animate-in fade-in duration-300'>
            {/* Main Profile Card */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 relative overflow-hidden'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-6 relative z-10'>
                    {/* Avatar with edit icon */}
                    <div className='relative group shrink-0'>
                        <img
                            className='w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-blue-50 shadow-xs bg-blue-50'
                            src={formState.image}
                            alt='Patient avatar'
                        />
                        {isEdit && (
                            <div className='absolute inset-0 bg-slate-900/40 rounded-3xl flex items-center justify-center text-white cursor-pointer opacity-90 transition-opacity'>
                                <Camera size={24} />
                            </div>
                        )}
                    </div>

                    {/* Name & Title */}
                    <div className='text-center sm:text-left space-y-2 flex-1'>
                        {isEdit ? (
                            <input
                                type='text'
                                value={formState.name}
                                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                className='bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 text-xl font-bold w-full max-w-md focus:outline-none focus:border-[#5F6FFF]'
                            />
                        ) : (
                            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>{userData.name}</h1>
                        )}
                        <p className='text-xs font-semibold px-3 py-1 bg-blue-50 text-[#5F6FFF] border border-blue-200 rounded-full inline-block'>
                            Verified Patient Profile
                        </p>
                    </div>

                    {/* Action button */}
                    <button
                        type='button'
                        onClick={isEdit ? handleSave : () => { setFormState(userData); setIsEdit(true); }}
                        className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                            isEdit
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-[#5F6FFF] hover:bg-indigo-600 text-white'
                        }`}
                    >
                        {isEdit ? (
                            <>
                                <Save size={16} /> Save Changes
                            </>
                        ) : (
                            <>
                                <Edit3 size={16} /> Edit Profile
                            </>
                        )}
                    </button>
                </div>

                {/* Information Sections */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-2'>
                    {/* Contact Info */}
                    <div className='space-y-4 bg-blue-50/60 border border-blue-100 p-5 rounded-2xl'>
                        <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider text-[#5F6FFF] flex items-center gap-2'>
                            <Mail size={16} /> Contact Information
                        </h2>

                        <div className='space-y-3 text-xs'>
                            <div>
                                <span className='text-slate-500 block mb-1'>Email Address</span>
                                {isEdit ? (
                                    <input
                                        type='email'
                                        value={formState.email}
                                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                        className='w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800'
                                    />
                                ) : (
                                    <span className='text-slate-800 font-semibold text-sm'>{userData.email}</span>
                                )}
                            </div>

                            <div>
                                <span className='text-slate-500 block mb-1'>Phone Number</span>
                                {isEdit ? (
                                    <input
                                        type='text'
                                        value={formState.phone}
                                        onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                                        className='w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800'
                                    />
                                ) : (
                                    <span className='text-slate-800 font-semibold text-sm'>{userData.phone}</span>
                                )}
                            </div>

                            <div>
                                <span className='text-slate-500 block mb-1'>Address</span>
                                {isEdit ? (
                                    <div className='space-y-2'>
                                        <input
                                            type='text'
                                            value={formState.address.line1}
                                            onChange={(e) => setFormState(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                            className='w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800'
                                            placeholder='Line 1'
                                        />
                                        <input
                                            type='text'
                                            value={formState.address.line2}
                                            onChange={(e) => setFormState(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                            className='w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800'
                                            placeholder='Line 2'
                                        />
                                    </div>
                                ) : (
                                    <span className='text-slate-800 font-medium leading-relaxed block'>
                                        {userData.address.line1} <br /> {userData.address.line2}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className='space-y-4 bg-blue-50/60 border border-blue-100 p-5 rounded-2xl'>
                        <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider text-[#5F6FFF] flex items-center gap-2'>
                            <User size={16} /> Basic Details
                        </h2>

                        <div className='space-y-3 text-xs'>
                            <div>
                                <span className='text-slate-500 block mb-1'>Gender</span>
                                {isEdit ? (
                                    <select
                                        value={formState.gender}
                                        onChange={(e) => setFormState(prev => ({ ...prev, gender: e.target.value }))}
                                        className='w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800'
                                    >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                ) : (
                                    <span className='text-slate-800 font-semibold text-sm'>{userData.gender}</span>
                                )}
                            </div>

                            <div>
                                <span className='text-slate-500 block mb-1'>Date of Birth</span>
                                {isEdit ? (
                                    <input
                                        type='date'
                                        value={formState.dob}
                                        onChange={(e) => setFormState(prev => ({ ...prev, dob: e.target.value }))}
                                        className='w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800'
                                    />
                                ) : (
                                    <span className='text-slate-800 font-semibold text-sm'>{userData.dob}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;