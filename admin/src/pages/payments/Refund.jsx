import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { RotateCcw } from 'lucide-react';

const Refund = () => {
    const [amount, setAmount] = useState('50');

    const handleRefund = (e) => {
        e.preventDefault();
        alert(`Refund of $${amount}.00 issued successfully.`);
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Process Patient Refund' subtitle='Issue cancellation refund for patient appointment.' />

                <form onSubmit={handleRefund} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Refund Amount ($)</label>
                        <input
                            type='number'
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <RotateCcw size={16} /> Process Refund
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Refund;
