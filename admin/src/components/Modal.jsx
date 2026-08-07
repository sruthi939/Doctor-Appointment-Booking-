import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans animate-in fade-in duration-200'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                <button onClick={onClose} className='absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer'>
                    <X size={18} />
                </button>
                {title && <h2 className='text-xl font-bold text-white'>{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
