import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Calendar, Save } from 'lucide-react';

const RescheduleAppointment = () => {
    const [date, setDate] = useState('2026-05-18');
    const [time, setTime] = useState('11:00 AM');

    const handleReschedule = (e) => {
        e.preventDefault();
        alert(`Appointment rescheduled to ${date} at ${time}`);
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Reschedule Appointment' subtitle='Modify appointment date & time.' />

                <form onSubmit={handleReschedule} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>New Slot Date</label>
                        <input
                            type='date'
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>New Slot Time</label>
                        <input
                            type='text'
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder='11:00 AM'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Save size={16} /> Confirm Reschedule
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default RescheduleAppointment;
