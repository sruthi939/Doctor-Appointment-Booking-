import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Database, Download } from 'lucide-react';

const BackupRestore = () => {
    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Database Backup & Restore' subtitle='Manage MongoDB database snapshots and automated backups.' />

                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-purple-400'>
                            <Database size={18} /> System Snapshots
                        </h2>
                        <button onClick={() => alert('Generating full MongoDB backup dump...')} className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md'>
                            <Download size={14} /> Download Backup
                        </button>
                    </div>
                    <p className='text-slate-400'>Last automated backup created on 15 May 2026 at 03:00 AM UTC.</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BackupRestore;
