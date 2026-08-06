import React, { useEffect, useState } from 'react';
import DoctorLayout from '../../components/doctor/DoctorLayout';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { fetchDoctorEarnings } from '../../services/doctorService';

const Earnings = () => {
    const [earningsData, setEarningsData] = useState(null);

    useEffect(() => {
        const loadEarnings = async () => {
            const res = await fetchDoctorEarnings();
            setEarningsData(res);
        };
        loadEarnings();
    }, []);

    const summary = earningsData?.summary || {
        thisMonth: 2450,
        thisWeek: 680,
        today: 120
    };

    const transactions = earningsData?.transactions || [
        { date: '15 May 2024', patient: 'Sarah Wilson', amount: 50, status: 'Paid' },
        { date: '15 May 2024', patient: 'Michael Brown', amount: 50, status: 'Paid' },
        { date: '14 May 2024', patient: 'Emily Davis', amount: 50, status: 'Paid' },
        { date: '12 May 2024', patient: 'David Lee', amount: 60, status: 'Paid' },
        { date: '10 May 2024', patient: 'Jessica Taylor', amount: 40, status: 'Paid' }
    ];

    return (
        <DoctorLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <DollarSign className='text-emerald-400' size={28} />
                            Doctor Earnings & Financials
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Track your consultation income, payout summaries, and transaction logs.
                        </p>
                    </div>

                    <div className='flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold self-start sm:self-auto'>
                        <ShieldCheck size={14} /> Automatic Direct Payouts Active
                    </div>
                </div>

                {/* 3 Summary Cards matching Step 8 diagram */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-3 relative overflow-hidden'>
                        <div className='flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider'>
                            <span>This Month</span>
                            <TrendingUp size={16} className='text-emerald-400' />
                        </div>
                        <p className='text-4xl font-extrabold text-white'>${summary.thisMonth.toLocaleString()}</p>
                        <p className='text-xs text-emerald-400 flex items-center gap-1 font-medium'>
                            <ArrowUpRight size={14} /> +14.2% increase from last month
                        </p>
                    </div>

                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-3 relative overflow-hidden'>
                        <div className='flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider'>
                            <span>This Week</span>
                            <Calendar size={16} className='text-pink-400' />
                        </div>
                        <p className='text-4xl font-extrabold text-white'>${summary.thisWeek.toLocaleString()}</p>
                        <p className='text-xs text-slate-400 font-medium'>14 Consultations completed</p>
                    </div>

                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-3 relative overflow-hidden'>
                        <div className='flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider'>
                            <span>Today</span>
                            <DollarSign size={16} className='text-indigo-400' />
                        </div>
                        <p className='text-4xl font-extrabold text-white'>${summary.today.toLocaleString()}</p>
                        <p className='text-xs text-slate-400 font-medium'>2 Paid visits processed</p>
                    </div>
                </div>

                {/* Transaction History Table Card matching Step 8 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <h2 className='text-base font-bold text-white uppercase tracking-wider text-pink-400 border-b border-slate-800 pb-3'>
                        Transaction History
                    </h2>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-left text-xs'>
                            <thead>
                                <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                    <th className='pb-3 px-2'>Date</th>
                                    <th className='pb-3 px-2'>Patient Name</th>
                                    <th className='pb-3 px-2'>Amount</th>
                                    <th className='pb-3 px-2 text-right'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-800/60'>
                                {transactions.map((t, idx) => (
                                    <tr key={idx} className='hover:bg-slate-800/40 transition-colors'>
                                        <td className='py-3.5 px-2 text-slate-300 font-medium'>{t.date}</td>
                                        <td className='py-3.5 px-2 text-white font-bold'>{t.patient}</td>
                                        <td className='py-3.5 px-2 text-emerald-400 font-bold'>${t.amount}.00</td>
                                        <td className='py-3.5 px-2 text-right'>
                                            <span className='px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default Earnings;
