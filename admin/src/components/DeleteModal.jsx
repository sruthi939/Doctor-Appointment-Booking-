import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to proceed?' }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className='space-y-4 text-xs'>
                <div className='flex items-center gap-3 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl'>
                    <AlertTriangle size={20} className='shrink-0' />
                    <p>{message}</p>
                </div>
                <div className='flex items-center justify-end gap-3 pt-2'>
                    <button onClick={onClose} className='px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl font-bold cursor-pointer'>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className='px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold cursor-pointer shadow-lg shadow-rose-600/20'>
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
