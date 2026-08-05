import React from 'react';
import { User, Stethoscope, ShieldAlert, ClipboardList, Calculator, X, CheckCircle } from 'lucide-react';

const RoleSelectorModal = ({ isOpen, onClose, currentRole, onSelectRole }) => {
    if (!isOpen) return null;

    const roles = [
        {
            id: 'USER',
            title: 'USER / PATIENT',
            icon: User,
            color: 'from-pink-500 to-rose-500',
            borderColor: 'border-pink-500/50',
            description: 'Book appointments, search doctors, view history, manage payments & review visits.'
        },
        {
            id: 'DOCTOR',
            title: 'DOCTOR',
            icon: Stethoscope,
            color: 'from-indigo-500 to-purple-500',
            borderColor: 'border-indigo-500/50',
            description: 'Manage clinical schedule, set availability, view upcoming appointments & patient charts.'
        },
        {
            id: 'ADMIN',
            title: 'ADMINISTRATOR',
            icon: ShieldAlert,
            color: 'from-amber-500 to-orange-500',
            borderColor: 'border-amber-500/50',
            description: 'Manage platform users, doctors list, system settings, security logs & analytics reports.'
        },
        {
            id: 'RECEPTIONIST',
            title: 'RECEPTIONIST',
            icon: ClipboardList,
            color: 'from-emerald-500 to-teal-500',
            borderColor: 'border-emerald-500/50',
            description: 'Manage clinic walk-ins, daily queue, patient check-ins & doctor session bookings.'
        },
        {
            id: 'ACCOUNTANT',
            title: 'ACCOUNTANT',
            icon: Calculator,
            color: 'from-cyan-500 to-blue-500',
            borderColor: 'border-cyan-500/50',
            description: 'Manage consultation billing, transaction invoices, payout reports & financial logs.'
        }
    ];

    return (
        <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 sm:p-8 relative'>
                <button 
                    onClick={onClose}
                    className='absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors'
                >
                    <X size={20} />
                </button>

                <div className='mb-6'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-2'>
                        System Architecture Overview
                    </div>
                    <h2 className='text-2xl font-bold text-white'>System Roles & Access Control</h2>
                    <p className='text-slate-400 text-sm mt-1'>
                        Select a system role to preview multi-user capabilities built into the workflow.
                    </p>
                </div>

                <div className='space-y-3 max-h-[60vh] overflow-y-auto pr-1'>
                    {roles.map(role => {
                        const Icon = role.icon;
                        const isSelected = currentRole === role.id;
                        return (
                            <div 
                                key={role.id}
                                onClick={() => {
                                    onSelectRole(role.id);
                                    onClose();
                                }}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                                    isSelected 
                                        ? `bg-slate-800/90 ${role.borderColor} ring-1 ring-pink-500/40 shadow-lg` 
                                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                                }`}
                            >
                                <div className='flex items-center gap-4'>
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-md`}>
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-bold text-white text-base'>{role.title}</h3>
                                            {isSelected && (
                                                <span className='text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30'>
                                                    <CheckCircle size={12} /> Active View
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-slate-400 text-xs mt-1 leading-relaxed'>{role.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='mt-6 pt-4 border-t border-slate-800 flex justify-end'>
                    <button 
                        onClick={onClose}
                        className='px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium text-sm transition-colors'
                    >
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectorModal;
