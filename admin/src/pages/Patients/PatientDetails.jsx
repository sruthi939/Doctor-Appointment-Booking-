import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { UserCheck, Mail, Phone, Calendar } from 'lucide-react';

const PatientDetails = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Patient Overview' subtitle='Detailed patient profile information.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4 text-xs'>
                    <div className='flex items-center gap-4 border-b border-slate-800 pb-4'>
                        <div className='w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center font-bold text-white text-lg'>
                            JS
                        </div>
                        <div>
                            <h2 className='text-xl font-bold text-white'>John Smith</h2>
                            <p className='text-slate-400'>Patient ID: #P101</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300'>
                        <p><strong className='text-white'>Email:</strong> johnsmith@example.com</p>
                        <p><strong className='text-white'>Phone:</strong> +1 987 654 3210</p>
                        <p><strong className='text-white'>Gender:</strong> Male</p>
                        <p><strong className='text-white'>DOB:</strong> 1995-08-12</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PatientDetails;
