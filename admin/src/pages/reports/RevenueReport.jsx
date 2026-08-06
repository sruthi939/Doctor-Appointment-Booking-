import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import StatsCard from '../../components/StatsCard';
import { DollarSign } from 'lucide-react';

const RevenueReport = () => {
    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Revenue Analytics Report' subtitle='Financial volume and gross consultation revenue.' />
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <StatsCard title='Gross Revenue' value='$45,231.00' subtitle='All-time total' icon={DollarSign} color='emerald' />
                    <StatsCard title='Monthly Net' value='$12,400.00' subtitle='May 2026' icon={DollarSign} color='purple' />
                    <StatsCard title='Pending Payouts' value='$3,821.00' subtitle='Pending settlement' icon={DollarSign} color='amber' />
                </div>
            </div>
        </AdminLayout>
    );
};

export default RevenueReport;
