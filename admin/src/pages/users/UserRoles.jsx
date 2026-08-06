import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { ShieldCheck } from 'lucide-react';

const UserRoles = () => {
    const roles = [
        { name: 'Admin', desc: 'Full system access and administration control.' },
        { name: 'Doctor', desc: 'Manage schedule, consultations and patients.' },
        { name: 'Receptionist', desc: 'Manage appointments, queue and patients.' },
        { name: 'Accountant', desc: 'Manage payments, invoices, expenses and reports.' },
        { name: 'Patient', desc: 'Book appointments, view doctors, make payments.' }
    ];

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='System Roles & Permissions' subtitle='Overview of security roles and access scopes.' />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {roles.map((r) => (
                        <div key={r.name} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-2 backdrop-blur-md shadow-xl'>
                            <div className='flex items-center gap-2 text-purple-400 font-extrabold text-base'>
                                <ShieldCheck size={18} /> {r.name}
                            </div>
                            <p className='text-xs text-slate-400'>{r.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserRoles;
