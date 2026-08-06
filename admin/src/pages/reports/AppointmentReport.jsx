import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import StatsCard from '../../components/StatsCard';
import { Calendar } from 'lucide-react';

const AppointmentReport = () => {
    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Appointment Analytics Report' subtitle='Booking ratios, completion and cancellation metrics.' />
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <StatsCard title='Total Booked' value='3,892' subtitle='System consultations' icon={Calendar} color='purple' />
                    <StatsCard title='Completed' value='3,450' subtitle='Successful appointments' icon={Calendar} color='emerald' />
                    <StatsCard title='Cancelled' value='442' subtitle='Cancelled slots' icon={Calendar} color='rose' />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AppointmentReport;
