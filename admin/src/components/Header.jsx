import React from 'react';

const Header = ({ title, subtitle, action }) => {
    return (
        <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left'>
            <div>
                <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>{title}</h1>
                {subtitle && <p className='text-slate-400 text-sm mt-1'>{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};

export default Header;
