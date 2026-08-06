import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { CreditCard, Search, DollarSign } from 'lucide-react';
import { fetchPayments } from '../../services/paymentService';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchPayments();
            if (res.payments) {
                setPayments(res.payments);
            }
            setLoading(false);
        };
        load();
    }, []);

    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    const filtered = payments.filter(p =>
        (p.patient || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.transactionId || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <CreditCard className='text-purple-500' size={28} />
                            Payment Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Track payments, refunds & transactions across the platform.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-64'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search transaction or patient...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
                        />
                    </div>
                </div>

                {/* 4 Cards matching Diagram */}
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Revenue</span>
                        <p className='text-2xl font-extrabold text-white'>${totalRevenue.toLocaleString()}.00</p>
                    </div>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Paid</span>
                        <p className='text-2xl font-extrabold text-emerald-400'>${totalRevenue.toLocaleString()}.00</p>
                    </div>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Pending</span>
                        <p className='text-2xl font-extrabold text-amber-400'>$0.00</p>
                    </div>
                    <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1 shadow-lg'>
                        <span className='text-xs text-slate-400 font-semibold'>Total Refunded</span>
                        <p className='text-2xl font-extrabold text-rose-400'>$0.00</p>
                    </div>
                </div>

                {/* Payments Table matching Diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading payments...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No payment records found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Transaction ID</th>
                                        <th className='pb-3 px-2'>Patient</th>
                                        <th className='pb-3 px-2'>Amount</th>
                                        <th className='pb-3 px-2'>Method</th>
                                        <th className='pb-3 px-2 text-right'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item, idx) => (
                                        <tr key={idx} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-purple-400'>{item.transactionId}</td>
                                            <td className='py-4 px-2 font-semibold text-white'>{item.patient}</td>
                                            <td className='py-4 px-2 font-bold text-white'>${item.amount}.00</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.method}</td>
                                            <td className='py-4 px-2 text-right'>
                                                <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Payments;
