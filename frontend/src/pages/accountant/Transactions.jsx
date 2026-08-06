import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { ArrowLeftRight, Search, Filter } from 'lucide-react';
import { fetchTransactions } from '../../services/accountantService';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchTransactions();
            if (res.transactions) {
                setTransactions(res.transactions);
            }
            setLoading(false);
        };
        load();
    }, []);

    const filtered = transactions.filter(t => {
        const matchesTab = activeTab === 'All' || t.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (t.doctorName && t.doctorName.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <ArrowLeftRight className='text-amber-500' size={28} />
                            Transactions Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View all payment records, filter status, and check billing details.
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search by patient, doctor...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500'
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs & Table matching Step 3 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl w-fit overflow-x-auto'>
                        {['All', 'Completed', 'Pending', 'Failed', 'Refunded'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 shadow-md font-extrabold'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading transactions...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No transactions found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Transaction ID</th>
                                        <th className='pb-3 px-2'>Patient</th>
                                        <th className='pb-3 px-2'>Amount</th>
                                        <th className='pb-3 px-2'>Method</th>
                                        <th className='pb-3 px-2'>Status</th>
                                        <th className='pb-3 px-2 text-right'>Date</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.transactionId} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-amber-400'>{item.transactionId}</td>
                                            <td className='py-4 px-2 font-semibold text-white'>{item.patientName}</td>
                                            <td className='py-4 px-2 font-bold text-white'>${item.amount}.00</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.paymentMethod}</td>
                                            <td className='py-4 px-2'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                                                    item.status === 'Completed'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : item.status === 'Pending'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                        : item.status === 'Refunded'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right text-slate-400 font-medium'>{item.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </AccountantLayout>
    );
};

export default Transactions;
