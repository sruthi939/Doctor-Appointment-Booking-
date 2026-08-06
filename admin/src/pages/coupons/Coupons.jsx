import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Tag, Plus, Search, X } from 'lucide-react';
import { fetchCoupons, addCouponApi } from '../../services/reportService';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [code, setCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [expiryDate, setExpiryDate] = useState('2026-12-31');

    const load = async () => {
        setLoading(true);
        const res = await fetchCoupons();
        if (res.coupons) {
            setCoupons(res.coupons);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        await addCouponApi({ code, discountPercent: Number(discountPercent), expiryDate });
        setIsModalOpen(false);
        setCode('');
        setDiscountPercent('');
        load();
    };

    const filtered = coupons.filter(c =>
        (c.code || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Tag className='text-purple-500' size={28} />
                            Coupons Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Create and manage promotional discount coupons for patient bookings.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search coupon code...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> + Create Coupon
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading coupons...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No coupons created.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Coupon Code</th>
                                        <th className='pb-3 px-2'>Discount (%)</th>
                                        <th className='pb-3 px-2'>Expiry Date</th>
                                        <th className='pb-3 px-2 text-right'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.code} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-extrabold text-purple-400 text-sm'>{item.code}</td>
                                            <td className='py-4 px-2 font-bold text-white'>{item.discountPercent}% OFF</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.expiryDate}</td>
                                            <td className='py-4 px-2 text-right'>
                                                <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'>
                                                    {item.status || 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Modal "+ Create Coupon" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <Tag className='text-purple-500' size={20} /> Create New Coupon
                            </h2>

                            <form onSubmit={handleCreateCoupon} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Coupon Code</label>
                                    <input
                                        type='text'
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                                        placeholder='HEALTH20'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Discount Percentage (%)</label>
                                    <input
                                        type='number'
                                        required
                                        min='1'
                                        max='100'
                                        value={discountPercent}
                                        onChange={(e) => setDiscountPercent(e.target.value)}
                                        placeholder='20'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Expiry Date</label>
                                    <input
                                        type='date'
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-purple-500/25 cursor-pointer uppercase tracking-wider'
                                >
                                    Generate Coupon
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Coupons;
