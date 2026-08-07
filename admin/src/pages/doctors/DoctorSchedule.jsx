import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Clock } from 'lucide-react';

const DoctorSchedule = () => {
    const slots = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'];

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Doctor Shift Schedule' subtitle='Manage available consultation hours.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4'>
                    <h2 className='text-sm font-bold text-white uppercase tracking-wider text-purple-400 flex items-center gap-2'>
                        <Clock size={18} /> Active Time Slots
                    </h2>

                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                        {slots.map((slot) => (
                            <div key={slot} className='p-3 bg-slate-950 border border-slate-800 rounded-2xl text-center text-xs font-bold text-slate-200'>
                                {slot}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DoctorSchedule;
