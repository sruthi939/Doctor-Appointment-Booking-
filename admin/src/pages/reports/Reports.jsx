import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { BarChart3, Download } from 'lucide-react';
import { fetchReportsData } from '../../services/reportService';

const Reports = () => {
    const [month, setMonth] = useState('May 2024');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchReportsData();
            if (res.distribution) {
                setReportData(res);
            }
            setLoading(false);
        };
        load();
    }, []);

    const distribution = reportData?.distribution || {
        confirmed: 1856,
        cancelled: 320,
        pending: 260,
        total: 2436
    };

    const monthlyChart = reportData?.monthlyChart || [
        { week: 'Week 1', revenue: 40, expenses: 15 },
        { week: 'Week 2', revenue: 65, expenses: 22 },
        { week: 'Week 3', revenue: 52, expenses: 18 },
        { week: 'Week 4', revenue: 78, expenses: 30 }
    ];

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <BarChart3 className='text-purple-500' size={28} />
                            Reports & Analytics
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View and export system reports and financial analytics.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className='bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white'
                        >
                            <option value='May 2024'>May 2024</option>
                            <option value='April 2024'>April 2024</option>
                            <option value='March 2024'>March 2024</option>
                        </select>

                        <button
                            onClick={() => alert(`Exporting System Report for ${month}...`)}
                            className='px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Download size={16} /> Download Report
                        </button>
                    </div>
                </div>

                {/* 2 Charts Grid matching Diagram */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Appointments Pie/Distribution Chart */}
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                        <h2 className='text-base font-bold text-white border-b border-slate-800 pb-3'>
                            Appointments Breakdown
                        </h2>

                        <div className='flex flex-col sm:flex-row items-center justify-around gap-6 pt-4'>
                            <div className='relative w-40 h-40 rounded-full border-8 border-purple-500/30 flex items-center justify-center bg-slate-950/60 shadow-inner'>
                                <div className='text-center'>
                                    <span className='text-2xl font-extrabold text-white'>{distribution.total}</span>
                                    <p className='text-[10px] text-slate-400 font-bold uppercase tracking-wider'>Total</p>
                                </div>
                            </div>

                            <div className='space-y-3 text-xs'>
                                <div className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-emerald-500 inline-block'></span>
                                    <span className='text-slate-300 font-semibold'>Confirmed:</span>
                                    <strong className='text-white font-bold'>{distribution.confirmed}</strong>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-rose-500 inline-block'></span>
                                    <span className='text-slate-300 font-semibold'>Cancelled:</span>
                                    <strong className='text-white font-bold'>{distribution.cancelled}</strong>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='w-3 h-3 rounded-full bg-amber-500 inline-block'></span>
                                    <span className='text-slate-300 font-semibold'>Pending:</span>
                                    <strong className='text-white font-bold'>{distribution.pending || 260}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Revenue vs Expenses Bar Chart */}
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                        <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                            <h2 className='text-base font-bold text-white'>Revenue vs Expenses</h2>
                            <div className='flex items-center gap-3 text-xs font-semibold'>
                                <span className='flex items-center gap-1 text-blue-400'>
                                    <span className='w-3 h-3 bg-blue-500 rounded-sm inline-block'></span> Revenue
                                </span>
                                <span className='flex items-center gap-1 text-pink-400'>
                                    <span className='w-3 h-3 bg-pink-500 rounded-sm inline-block'></span> Expenses
                                </span>
                            </div>
                        </div>

                        <div className='h-48 w-full flex items-end justify-around gap-6 pt-6 pb-2 px-6 bg-slate-950/60 rounded-2xl border border-slate-800'>
                            {monthlyChart.map((item, idx) => (
                                <div key={idx} className='flex flex-col items-center gap-2 h-full justify-end flex-1 max-w-[50px]'>
                                    <div className='w-full flex items-end justify-center gap-1.5 h-36'>
                                        <div
                                            style={{ height: `${item.revenue}%` }}
                                            className='w-4 bg-blue-500 rounded-t-md transition-all hover:bg-blue-400'
                                        />
                                        <div
                                            style={{ height: `${item.expenses}%` }}
                                            className='w-4 bg-pink-500 rounded-t-md transition-all hover:bg-pink-400'
                                        />
                                    </div>
                                    <span className='text-[10px] text-slate-400 font-bold'>{item.week}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Reports;
