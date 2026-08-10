import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { DollarSign, CreditCard, FileText, TrendingDown, ArrowUpRight, Plus, Mail } from 'lucide-react';
import { fetchAccountantDashboard } from '../../services/accountantService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const accountantUser = (() => {
        try {
            const saved = localStorage.getItem('accountant_user');
            if (saved) return JSON.parse(saved);
            const savedEmail = localStorage.getItem('accountant_email');
            const savedName = localStorage.getItem('accountant_name');
            if (savedEmail || savedName) {
                return { name: savedName || savedEmail.split('@')[0], email: savedEmail };
            }
            return { name: 'Accountant', email: '' };
        } catch (e) {
            return { name: 'Accountant', email: '' };
        }
    })();

    useEffect(() => {
        const loadDashboard = async () => {
            const data = await fetchAccountantDashboard();
            setDashboardData(data);
            setLoading(false);
        };
        loadDashboard();
    }, []);

    const stats = dashboardData?.stats || {
        totalRevenue: '$0.00',
        totalPayments: '$0.00',
        totalInvoices: 0,
        totalExpenses: '$0.00'
    };

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Banner */}
                <div className='bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block mb-2'>
                            Welcome Back 👋 {accountantUser.name}
                        </span>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Financial Dashboard</h1>
                        <p className='text-slate-400 text-xs sm:text-sm mt-1 flex items-center gap-1.5 font-mono'>
                            <Mail size={14} className='text-amber-400' />
                            <span>Logged In Email: <strong className='text-white'>{accountantUser.email}</strong></span>
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => navigate('/accountant/invoices')}
                            className='px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> New Invoice
                        </button>
                    </div>
                </div>

                {/* 4 Stats Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* Total Revenue */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-amber-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Revenue</span>
                            <div className='w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20'>
                                <DollarSign size={18} />
                            </div>
                        </div>
                        <p className='text-2xl sm:text-3xl font-black text-white tracking-tight'>
                            {stats.totalRevenue}
                        </p>
                        <p className='text-[11px] text-slate-400 font-medium'>From completed clinic bookings</p>
                    </div>

                    {/* Total Payments */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-amber-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Payments</span>
                            <div className='w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20'>
                                <CreditCard size={18} />
                            </div>
                        </div>
                        <p className='text-2xl sm:text-3xl font-black text-white tracking-tight'>
                            {stats.totalPayments}
                        </p>
                        <p className='text-[11px] text-slate-400 font-medium'>Processed patient transactions</p>
                    </div>

                    {/* Invoices */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-amber-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Invoices</span>
                            <div className='w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20'>
                                <FileText size={18} />
                            </div>
                        </div>
                        <p className='text-2xl sm:text-3xl font-black text-white tracking-tight'>
                            {stats.totalInvoices}
                        </p>
                        <p className='text-[11px] text-slate-400 font-medium'>Issued clinic billings</p>
                    </div>

                    {/* Expenses */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-amber-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Expenses</span>
                            <div className='w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20'>
                                <TrendingDown size={18} />
                            </div>
                        </div>
                        <p className='text-2xl sm:text-3xl font-black text-white tracking-tight'>
                            {stats.totalExpenses}
                        </p>
                        <p className='text-[11px] text-slate-400 font-medium'>Clinic operational costs</p>
                    </div>
                </div>
            </div>
        </AccountantLayout>
    );
};

export default Dashboard;
