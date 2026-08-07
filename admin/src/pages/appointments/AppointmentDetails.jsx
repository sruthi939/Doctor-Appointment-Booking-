import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';

const AppointmentDetails = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Appointment Details' subtitle='Complete details of consultation slot.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4 text-xs'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-sm font-bold text-purple-400 uppercase tracking-wider'>Booking Info</h2>
                        <StatusBadge status='Upcoming' />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300'>
                        <p><strong className='text-white'>Patient:</strong> John Smith</p>
                        <p><strong className='text-white'>Doctor:</strong> Dr. Richard James</p>
                        <p><strong className='text-white'>Slot Date:</strong> 15 May 2026</p>
                        <p><strong className='text-white'>Slot Time:</strong> 10:30 AM</p>
                        <p><strong className='text-white'>Consultation Fee:</strong> $50.00</p>
                        <p><strong className='text-white'>Payment Status:</strong> Paid</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AppointmentDetails;
