import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { ShieldCheck } from 'lucide-react';

const SecuritySettings = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Security & Authentication Settings' subtitle='Configure JWT session timeout and security policies.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4 text-xs text-slate-300'>
                    <div className='flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider'>
                        <ShieldCheck size={18} /> Two-Factor Authentication (2FA)
                    </div>
                    <p>Enforce 2FA for all System Admin and Accountant logins.</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SecuritySettings;
