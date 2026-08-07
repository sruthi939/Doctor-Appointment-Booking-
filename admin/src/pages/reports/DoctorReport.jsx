import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import StatsCard from '../../components/StatsCard';
import { Stethoscope } from 'lucide-react';

const DoctorReport = () => {
    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Doctor Performance Report' subtitle='Specialist consultations and ratings performance.' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <StatsCard title='Total Active Doctors' value='156' subtitle='Verified specialists' icon={Stethoscope} color='indigo' />
                    <StatsCard title='Average Rating' value='4.85 / 5' subtitle='Patient feedback average' icon={Stethoscope} color='amber' />
                </div>
            </div>
        </AdminLayout>
    );
};

export default DoctorReport;
