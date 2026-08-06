import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { CreditCard, Save } from 'lucide-react';

const PaymentSettings = () => {
    const [currency, setCurrency] = useState('USD ($)');

    const handleSave = (e) => {
        e.preventDefault();
        alert('Payment settings updated!');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Payment Gateway Settings' subtitle='Configure Stripe/Razorpay currency and payment methods.' />

                <form onSubmit={handleSave} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Platform Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        >
                            <option value='USD ($)'>USD ($)</option>
                            <option value='EUR (€)'>EUR (€)</option>
                            <option value='GBP (£)'>GBP (£)</option>
                            <option value='INR (₹)'>INR (₹)</option>
                        </select>
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Save size={16} /> Save Gateway Settings
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default PaymentSettings;
