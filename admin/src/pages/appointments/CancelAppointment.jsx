import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { AlertCircle } from 'lucide-react';

const CancelAppointment = () => {
    const [reason, setReason] = useState('');

    const handleCancel = (e) => {
        e.preventDefault();
        alert('Appointment cancelled successfully!');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Cancel Appointment' subtitle='Provide cancellation details and notify patient.' />

                <form onSubmit={handleCancel} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Reason for Cancellation</label>
                        <textarea
                            rows={3}
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder='Doctor unavailable or patient request...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white'
                        ></textarea>
                    </div>

                    <button type='submit' className='px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <AlertCircle size={16} /> Confirm Cancellation
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CancelAppointment;
