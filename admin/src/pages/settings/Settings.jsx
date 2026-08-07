import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Settings as SettingsIcon, Save, Check } from 'lucide-react';
import { fetchSettings, updateSettingsApi } from '../../services/reportService';

const Settings = () => {
    const [siteName, setSiteName] = useState('MediCare');
    const [adminEmail, setAdminEmail] = useState('admin@medicare.com');
    const [phoneNumber, setPhoneNumber] = useState('+1 987 654 3210');
    const [currency, setCurrency] = useState('USD ($)');
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const load = async () => {
            const res = await fetchSettings();
            if (res.setting) {
                setSiteName(res.setting.siteName || 'MediCare');
                setAdminEmail(res.setting.adminEmail || 'admin@medicare.com');
                setPhoneNumber(res.setting.phoneNumber || '+1 987 654 3210');
                setCurrency(res.setting.currency || 'USD ($)');
            }
        };
        load();
    }, []);

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        await updateSettingsApi({ siteName, adminEmail, phoneNumber, currency, smsEnabled: true });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                        <SettingsIcon className='text-purple-500' size={28} />
                        System Settings
                    </h1>
                    <p className='text-slate-400 text-sm mt-1'>
                        Manage global platform configurations and contact info.
                    </p>
                </div>

                {savedNotice && (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <Check size={18} /> System settings saved successfully!
                    </div>
                )}

                {/* Form matching Diagram */}
                <form onSubmit={handleSaveSettings} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <h2 className='text-base font-bold text-white border-b border-slate-800 pb-3'>
                        General Settings
                    </h2>

                    <div>
                        <label className='block font-semibold text-slate-300 mb-1.5'>Site Name</label>
                        <input
                            type='text'
                            required
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold text-slate-300 mb-1.5'>Admin Email</label>
                        <input
                            type='email'
                            required
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold text-slate-300 mb-1.5'>Phone Number</label>
                        <input
                            type='text'
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold text-slate-300 mb-1.5'>Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                        >
                            <option value='USD ($)'>USD ($)</option>
                            <option value='EUR (€)'>EUR (€)</option>
                            <option value='GBP (£)'>GBP (£)</option>
                            <option value='INR (₹)'>INR (₹)</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='px-6 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-purple-500/25 cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2'
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Settings;
