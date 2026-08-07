import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Mail } from 'lucide-react';

const EmailTemplate = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Email Notification Templates' subtitle='Preview automated transactional email layouts.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4 text-xs'>
                    <div className='flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider'>
                        <Mail size={16} /> Appointment Confirmation Email
                    </div>
                    <div className='p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-slate-300'>
                        <p className='font-bold text-white'>Subject: Your Consultation Appointment is Confirmed!</p>
                        <p>Dear Patient, your appointment with Dr. Richard James has been confirmed for 15 May 2026 at 10:30 AM.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EmailTemplate;
