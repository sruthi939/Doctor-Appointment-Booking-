import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import StatsCard from '../../components/StatsCard';
import { Users } from 'lucide-react';

const PatientReport = () => {
    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Patient Demographic Report' subtitle='User registrations and retention analytics.' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <StatsCard title='Total Registered Patients' value='2,548' subtitle='Active patient accounts' icon={Users} color='purple' />
                    <StatsCard title='New This Month' value='210' subtitle='May 2026 registrations' icon={Users} color='emerald' />
                </div>
            </div>
        </AdminLayout>
    );
};

export default PatientReport;
