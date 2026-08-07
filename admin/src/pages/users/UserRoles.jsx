import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { ShieldCheck, UserCheck, Stethoscope, CreditCard, Calendar } from 'lucide-react';

const UserRoles = () => {
    const roles = [
        { name: 'Admin', icon: ShieldCheck, color: 'purple', desc: 'Full system control: Manage staff roles, doctors, appointments, revenue, and configurations.' },
        { name: 'Doctor', icon: Stethoscope, color: 'blue', desc: 'Manage clinical schedule, patient consultations, prescriptions, and time slots.' },
        { name: 'Receptionist', icon: Calendar, color: 'pink', desc: 'Manage appointment queues, patient registrations, check-ins, and schedule booking.' },
        { name: 'Accountant', icon: CreditCard, color: 'amber', desc: 'Track billing invoices, patient refunds, clinic operational expenses, and financial reports.' },
        { name: 'Patient', icon: UserCheck, color: 'emerald', desc: 'Book doctor appointments, view consultation history, and process payments.' }
    ];

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Hospital Staff Access Matrix' subtitle='Overview of security access permissions granted by Admin.' />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {roles.map((r) => {
                        const Icon = r.icon;
                        return (
                            <div key={r.name} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 backdrop-blur-md shadow-xl hover:border-slate-700 transition-colors'>
                                <div className='flex items-center gap-3'>
                                    <div className={`w-10 h-10 rounded-2xl bg-${r.color}-500/10 text-${r.color}-400 flex items-center justify-center border border-${r.color}-500/20 font-bold shrink-0`}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className='font-extrabold text-white text-lg'>{r.name}</h3>
                                </div>
                                <p className='text-xs text-slate-400 leading-relaxed'>{r.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserRoles;
