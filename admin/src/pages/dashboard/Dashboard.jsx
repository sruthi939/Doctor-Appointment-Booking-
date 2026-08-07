import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import { Users, Stethoscope, Calendar, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { fetchAdminDashboard } from '../../services/adminApi';

const Dashboard = () => {
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchAdminDashboard();
            setDashData(data);
            setLoading(false);
        };
        load();
    }, []);

    const stats = dashData?.stats || {
        totalUsers: 0,
        totalDoctors: 0,
        totalAppointments: 0,
        totalRevenue: '$0.00',
        todayAppointments: 0,
        pendingPayments: '$0.00'
    };

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Dashboard</h1>
                    <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                        Overview of system statistics & activities.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <DashboardCard title='Total Users' value={loading ? '...' : stats.totalUsers} icon={Users} color='purple' />
                    <DashboardCard title='Total Doctors' value={loading ? '...' : stats.totalDoctors} icon={Stethoscope} color='indigo' />
                    <DashboardCard title='Total Appointments' value={loading ? '...' : stats.totalAppointments} icon={Calendar} color='pink' />
                    <DashboardCard title='Total Revenue' value={loading ? '...' : stats.totalRevenue} icon={DollarSign} color='emerald' />
                    <DashboardCard title="Today's Appointments" value={loading ? '...' : stats.todayAppointments} icon={Clock} color='amber' />
                    <DashboardCard title='Pending Payments' value={loading ? '...' : stats.pendingPayments} icon={AlertCircle} color='rose' />
                </div>

                <DashboardChart />
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
