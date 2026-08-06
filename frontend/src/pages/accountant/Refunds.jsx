import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { RotateCcw, Check, XCheck, Search, CheckCircle2, XCircle } from 'lucide-react';
import { fetchRefunds, processRefundApi } from '../../services/accountantService';

const Refunds = () => {
    const [refunds, setRefunds] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        const res = await fetchRefunds();
        if (res.refunds) {
            setRefunds(res.refunds);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleAction = async (id, status) => {
        await processRefundApi(id, status);
        setRefunds(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    };

    const filtered = refunds.filter(r => {
        const matchesTab = activeTab === 'All' || r.status.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              r.refundId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <RotateCcw className='text-amber-500' size={28} />
                            Refunds Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Process and manage patient appointment cancellation refunds.
                        </p>
                    </div>

                    <div className='relative w-full sm:w-64'>
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search refund...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500'
                        />
                    </div>
                </div>

                {/* Filter Tabs & Refunds Table matching Step 7 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl w-fit overflow-x-auto'>
                        {['All', 'Requested', 'Processed', 'Rejected'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-extrabold shadow-md'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading refunds...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No refund records found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Refund ID</th>
                                        <th className='pb-3 px-2'>Patient</th>
                                        <th className='pb-3 px-2'>Amount</th>
                                        <th className='pb-3 px-2'>Status</th>
                                        <th className='pb-3 px-2'>Date</th>
                                        <th className='pb-3 px-2 text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.refundId} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-amber-400'>{item.refundId}</td>
                                            <td className='py-4 px-2 font-semibold text-white'>{item.patientName}</td>
                                            <td className='py-4 px-2 font-bold text-white'>${item.amount}.00</td>
                                            <td className='py-4 px-2'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                    item.status === 'Processed'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : item.status === 'Requested'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-slate-400 font-medium'>{item.date}</td>
                                            <td className='py-4 px-2 text-right space-x-2'>
                                                {item.status === 'Requested' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(item._id, 'Processed')}
                                                            className='px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1'
                                                        >
                                                            <CheckCircle2 size={12} /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(item._id, 'Rejected')}
                                                            className='px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1'
                                                        >
                                                            <XCircle size={12} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
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

export default Refunds;
