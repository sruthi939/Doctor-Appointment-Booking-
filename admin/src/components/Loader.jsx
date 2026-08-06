import React from 'react';

const Loader = ({ text = 'Loading...' }) => {
    return (
        <div className='flex flex-col items-center justify-center py-12 space-y-3 text-slate-400 text-xs font-semibold'>
            <div className='w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin'></div>
            <p>{text}</p>
        </div>
    );
};

export default Loader;
