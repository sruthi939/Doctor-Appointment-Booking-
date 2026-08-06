import React from 'react';

const StatusBadge = ({ status }) => {
    const s = (status || 'Active').toLowerCase();

    let style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (s === 'pending' || s === 'upcoming') style = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (s === 'cancelled' || s === 'failed' || s === 'inactive') style = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    if (s === 'completed' || s === 'paid') style = 'bg-blue-500/10 text-blue-400 border-blue-500/30';

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${style}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
