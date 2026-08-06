import React, { useState, useEffect } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { BarChart3, Download, Calendar, DollarSign } from 'lucide-react';
import { fetchReports } from '../../services/accountantService';

const Reports = () => {
    const [reportType, setReportType] = useState('Monthly Financial Report');
    const [selectedMonth, setSelectedMonth] = useState('May 2024');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchReports();
            if (res?.success) {
                setReportData(res);
            }
            setLoading(false);
        };
        load();
    }, []);

    const summary = reportData?.summary || {
        totalRevenue: '$0.00',
        totalExpenses: '$0.00',
        netProfit: '$0.00'
    };

    const monthlyData = reportData?.monthlyComparison || [
        { week: 'Week 1', revenue: 0, expenses: 0 },
        { week: 'Week 2', revenue: 0, expenses: 0 },
        { week: 'Week 3', revenue: 0, expenses: 0 },
        { week: 'Week 4', revenue: 0, expenses: 0 }
    ];

    const maxVal = Math.max(...monthlyData.map(m => Math.max(m.revenue, m.expenses)), 100);

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <BarChart3 className='text-amber-500' size={28} />
                            Reports & Analytics
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View and download detailed clinic financial reports and earnings analytics.
                        </p>
                    </div>

                    <button
                        onClick={() => alert(`Downloading ${reportType} for ${selectedMonth}...`)}
                        className='px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto'
                    >
                        <Download size={16} /> Download Report
                    </button>
                </div>

                {/* Filter Controls Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider'>Select Report Type</label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500'
                        >
                            <option value='Monthly Financial Report'>Monthly Financial Report</option>
                            <option value='Quarterly Revenue Report'>Quarterly Revenue Report</option>
                            <option value='Annual Clinic Audit'>Annual Clinic Audit</option>
                        </select>
                    </div>

                    <div>
                        <label className='block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider'>Select Month</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500'
                        >
                            <option value='May 2024'>May 2024</option>
                            <option value='April 2024'>April 2024</option>
                            <option value='March 2024'>March 2024</option>
                        </select>
                    </div>
                </div>

                {/* Summary Metrics Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Revenue</span>
                        <p className='text-2xl font-extrabold text-white'>{loading ? '...' : summary.totalRevenue}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Expenses</span>
                        <p className='text-2xl font-extrabold text-rose-400'>{loading ? '...' : summary.totalExpenses}</p>
                    </div>

                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg border-amber-500/30'>
                        <span className='text-xs text-amber-400 font-bold uppercase tracking-wider'>Net Profit</span>
                        <p className='text-2xl font-extrabold text-amber-400'>{loading ? '...' : summary.netProfit}</p>
                    </div>
                </div>

                {/* Revenue vs Expenses Bar Chart */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-base font-bold text-white uppercase tracking-wider text-amber-400'>
                            Revenue vs Expenses
                        </h2>
                        <div className='flex items-center gap-4 text-xs font-semibold'>
                            <span className='flex items-center gap-1.5 text-blue-400'>
                                <span className='w-3 h-3 rounded-sm bg-blue-500 inline-block'></span> Revenue
                            </span>
                            <span className='flex items-center gap-1.5 text-emerald-400'>
                                <span className='w-3 h-3 rounded-sm bg-emerald-500 inline-block'></span> Expenses
                            </span>
                        </div>
                    </div>

                    <div className='h-56 w-full flex items-end justify-around gap-6 pt-6 pb-2 px-6 bg-slate-950/60 rounded-2xl border border-slate-800'>
                        {monthlyData.map((item, idx) => (
                            <div key={idx} className='flex flex-col items-center gap-2 h-full justify-end flex-1 max-w-[60px]'>
                                <div className='w-full flex items-end justify-center gap-1.5 h-40'>
                                    <div
                                        style={{ height: `${Math.min(100, Math.max(10, (item.revenue / maxVal) * 100))}%` }}
                                        className='w-5 bg-blue-500 rounded-t-md transition-all hover:bg-blue-400'
                                        title={`Revenue: $${item.revenue}`}
                                    />
                                    <div
                                        style={{ height: `${Math.min(100, Math.max(10, (item.expenses / maxVal) * 100))}%` }}
                                        className='w-5 bg-emerald-500 rounded-t-md transition-all hover:bg-emerald-400'
                                        title={`Expenses: $${item.expenses}`}
                                    />
                                </div>
                                <span className='text-[10px] text-slate-400 font-bold'>{item.week}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AccountantLayout>
    );
};

export default Reports;
