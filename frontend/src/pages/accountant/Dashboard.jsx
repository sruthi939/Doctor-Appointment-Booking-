import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { DollarSign, CreditCard, FileText, TrendingDown, ArrowUpRight, Plus, Download } from 'lucide-react';
import { fetchAccountantDashboard } from '../../services/accountantService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            const data = await fetchAccountantDashboard();
            setDashboardData(data);
            setLoading(false);
        };
        loadDashboard();
    }, []);

    const stats = dashboardData?.stats || {
        totalRevenue: '$45,231.00',
        totalPayments: '$38,921.00',
        totalInvoices: 128,
        totalExpenses: '$6,310.00'
    };

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Banner */}
                <div className='bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block mb-2'>
                            Welcome Back 👋
                        </span>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>Financial Dashboard</h1>
                        <p className='text-slate-400 text-xs sm:text-sm mt-1'>
                            Overview of total revenue, payments, invoices and clinic expenses.
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

                {/* 4 Stats Cards matching Step 2 diagram */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* Total Revenue */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-amber-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Revenue</span>
                            <div className='w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20'>
                                <DollarSign size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.totalRevenue}</p>
                        <p className='text-[11px] text-emerald-400 font-semibold flex items-center gap-1'>
                            <ArrowUpRight size={14} /> +12.4% from last month
                        </p>
                    </div>

                    {/* Total Payments */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-emerald-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Payments</span>
                            <div className='w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20'>
                                <CreditCard size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.totalPayments}</p>
                        <p className='text-[11px] text-slate-400 font-medium'>Processed via Card/UPI</p>
                    </div>

                    {/* Total Invoices */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-blue-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Invoices</span>
                            <div className='w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20'>
                                <FileText size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.totalInvoices}</p>
                        <p className='text-[11px] text-slate-400 font-medium'>Generated this month</p>
                    </div>

                    {/* Total Expenses */}
                    <div className='p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-rose-500/40 transition-colors'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Expenses</span>
                            <div className='w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20'>
                                <TrendingDown size={18} />
                            </div>
                        </div>
                        <p className='text-3xl font-extrabold text-white'>{stats.totalExpenses}</p>
                        <p className='text-[11px] text-rose-400 font-semibold'>Clinic utilities & equipment</p>
                    </div>
                </div>

                {/* Revenue Overview Chart Section matching Step 2 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-base font-bold text-white uppercase tracking-wider text-amber-400'>
                            Revenue Overview
                        </h2>
                        <span className='text-xs text-slate-400 font-semibold bg-slate-950 px-3 py-1 rounded-full border border-slate-800'>
                            This Month
                        </span>
                    </div>

                    {/* Custom SVG Wave Line Representation matching Step 2 diagram */}
                    <div className='h-48 w-full relative flex items-end pt-6 pb-2 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden'>
                        <svg className='w-full h-full overflow-visible' viewBox='0 0 500 120' preserveAspectRatio='none'>
                            <defs>
                                <linearGradient id='revenueGradient' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='0%' stopColor='#f59e0b' stopOpacity='0.4' />
                                    <stop offset='100%' stopColor='#f59e0b' stopOpacity='0.0' />
                                </linearGradient>
                            </defs>
                            <path
                                d='M0,80 Q50,20 100,70 T200,40 T300,90 T400,30 T500,60 L500,120 L0,120 Z'
                                fill='url(#revenueGradient)'
                            />
                            <path
                                d='M0,80 Q50,20 100,70 T200,40 T300,90 T400,30 T500,60'
                                fill='none'
                                stroke='#f59e0b'
                                strokeWidth='3'
                            />
                        </svg>
                        <div className='absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] text-slate-400 font-bold'>
                            <span>May 1</span>
                            <span>May 8</span>
                            <span>May 15</span>
                            <span>May 22</span>
                            <span>May 29</span>
                        </div>
                    </div>
                </div>
            </div>
        </AccountantLayout>
    );
};

export default Dashboard;
