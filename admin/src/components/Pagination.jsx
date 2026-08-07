import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className='flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400'>
            <span>Page <strong className='text-white'>{currentPage}</strong> of <strong className='text-white'>{totalPages}</strong></span>
            <div className='flex items-center gap-2'>
                <button
                    disabled={currentPage === 1}
                    onClick={onPrev}
                    className='p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer'
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={onNext}
                    className='p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer'
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
