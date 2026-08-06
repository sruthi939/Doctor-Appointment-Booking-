import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Star, ShieldCheck, Calendar, DollarSign } from 'lucide-react';

const DoctorProfile = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Doctor Profile' subtitle='View detailed medical profile and ratings.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6'>
                    <div className='flex items-center gap-6'>
                        <img
                            src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
                            alt=''
                            className='w-24 h-24 rounded-3xl object-cover border-2 border-purple-500/40 shadow-xl'
                        />
                        <div>
                            <h2 className='text-2xl font-extrabold text-white'>Dr. Richard James</h2>
                            <p className='text-xs text-purple-400 font-bold mt-1'>General physician &bull; MBBS</p>
                            <p className='text-xs text-slate-400 mt-1 flex items-center gap-1 font-bold'>
                                <Star size={14} className='text-amber-400 fill-amber-400' /> 4.8 Rating (120 reviews)
                            </p>
                        </div>
                    </div>

                    <div className='p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2'>
                        <h3 className='font-bold text-white uppercase tracking-wider text-[11px] text-purple-400'>About Doctor</h3>
                        <p>Dr. Richard James has over 4+ years of clinical experience in preventive medicine, patient diagnosis, and primary care healthcare solutions.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DoctorProfile;
