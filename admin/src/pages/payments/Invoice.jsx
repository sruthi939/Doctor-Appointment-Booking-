import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Download } from 'lucide-react';

const Invoice = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Patient Invoice'
                    subtitle='Billing invoice preview and download.'
                    action={
                        <button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg'>
                            <Download size={14} /> Download PDF
                        </button>
                    }
                />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 text-xs'>
                    <div className='flex justify-between items-start border-b border-slate-800 pb-4'>
                        <div>
                            <h2 className='text-xl font-extrabold text-white'>MediCare Health</h2>
                            <p className='text-slate-400'>Invoice #INV-2026-1001</p>
                        </div>
                        <span className='px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold text-[10px]'>PAID</span>
                    </div>

                    <div className='grid grid-cols-2 gap-4 text-slate-300'>
                        <div>
                            <p className='font-bold text-white mb-1'>Billed To:</p>
                            <p>John Smith</p>
                            <p>johnsmith@example.com</p>
                        </div>
                        <div className='text-right'>
                            <p className='font-bold text-white mb-1'>Billing Date:</p>
                            <p>15 May 2026</p>
                        </div>
                    </div>

                    <div className='p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center font-bold text-sm text-white'>
                        <span>General Consultation & Treatment</span>
                        <span className='text-emerald-400'>$50.00</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Invoice;
