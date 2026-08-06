import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { BarChart3, Download } from 'lucide-react';

const Reports = () => {
    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Reports & Analytics'
                    subtitle='Comprehensive system reports & metrics dashboard.'
                    action={
                        <button onClick={() => alert('Downloading master report...')} className='px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg'>
                            <Download size={16} /> Download Report
                        </button>
                    }
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-2'>
                        <h3 className='font-bold text-white text-base text-purple-400'>Revenue Report</h3>
                        <p className='text-xs text-slate-400'>Monthly financial performance breakdown.</p>
                    </div>
                    <div className='p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-2'>
                        <h3 className='font-bold text-white text-base text-pink-400'>Appointments Report</h3>
                        <p className='text-xs text-slate-400'>Booking metrics and cancellation rates.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Reports;
