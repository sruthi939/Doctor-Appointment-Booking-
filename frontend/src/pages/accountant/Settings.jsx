import React, { useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { Settings as SettingsIcon, User, Shield, Bell, Sliders, Check, Save } from 'lucide-react';
import { updateAccountantProfileApi } from '../../services/accountantService';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('Profile');
    const [savedNotice, setSavedNotice] = useState(false);

    const [formState, setFormState] = useState(() => {
        const saved = localStorage.getItem('accountant_user');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return {
            name: 'Olivia Smith',
            email: 'olivia.smith@example.com',
            phone: '+1 987 654 3210'
        };
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        await updateAccountantProfileApi(formState);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300 max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                        <SettingsIcon className='text-amber-500' size={28} />
                        Settings & Preferences
                    </h1>
                    <p className='text-slate-400 text-sm mt-1'>
                        Manage accountant account settings, profile information, and portal preferences.
                    </p>
                </div>

                {savedNotice && (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <Check size={18} /> Accountant settings updated successfully!
                    </div>
                )}

                {/* Settings Layout Grid matching Step 9 diagram */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                    {/* Left Sidebar Menu */}
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-4 backdrop-blur-md shadow-xl space-y-1 self-start'>
                        {[
                            { name: 'Profile', icon: User },
                            { name: 'Security', icon: Shield },
                            { name: 'Notifications', icon: Bell },
                            { name: 'Preferences', icon: Sliders }
                        ].map((sec) => {
                            const Icon = sec.icon;
                            return (
                                <button
                                    key={sec.name}
                                    onClick={() => setActiveSection(sec.name)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                                        activeSection === sec.name
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                                    }`}
                                >
                                    <Icon size={16} /> {sec.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Form Card matching Step 9 diagram */}
                    <div className='md:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6'>
                        <h2 className='text-lg font-bold text-white border-b border-slate-800 pb-3'>
                            {activeSection} Information
                        </h2>

                        {activeSection === 'Profile' && (
                            <form onSubmit={handleUpdateProfile} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1.5 font-semibold'>Full Name</label>
                                    <input
                                        type='text'
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-500'
                                    />
                                </div>

                                <div>
                                    <label className='block text-slate-400 mb-1.5 font-semibold'>Email Address</label>
                                    <input
                                        type='email'
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-500'
                                    />
                                </div>

                                <div>
                                    <label className='block text-slate-400 mb-1.5 font-semibold'>Phone Number</label>
                                    <input
                                        type='text'
                                        value={formState.phone}
                                        onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-amber-500'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer uppercase tracking-wider'
                                >
                                    Update Profile
                                </button>
                            </form>
                        )}

                        {activeSection !== 'Profile' && (
                            <p className='text-slate-400 text-xs py-4'>
                                {activeSection} settings configured and up to date.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AccountantLayout>
    );
};

export default Settings;
