import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'purple' }) => {
    return (
        <div className='p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-2 shadow-xl hover:border-slate-700 transition-colors text-left'>
            <div className='flex items-center justify-between'>
                <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>{title}</span>
                {Icon && <Icon className={`text-${color}-400`} size={20} />}
            </div>
            <p className='text-3xl font-extrabold text-white'>{value}</p>
            {subtitle && <p className='text-[11px] text-slate-400 font-medium'>{subtitle}</p>}
        </div>
    );
};

export default StatsCard;
