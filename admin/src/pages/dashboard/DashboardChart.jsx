import React from 'react';

const DashboardChart = () => {
    return (
        <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4 text-left'>
            <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                <h2 className='text-base font-bold text-white uppercase tracking-wider text-purple-400'>
                    Appointments Overview
                </h2>
                <span className='text-xs text-slate-400 font-semibold bg-slate-950 px-3 py-1 rounded-full border border-slate-800'>
                    This Week
                </span>
            </div>

            <div className='h-48 w-full relative flex items-end pt-6 pb-2 px-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 overflow-hidden'>
                <svg className='w-full h-full overflow-visible' viewBox='0 0 500 120' preserveAspectRatio='none'>
                    <defs>
                        <linearGradient id='aptG' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor='#a855f7' stopOpacity='0.4' />
                            <stop offset='100%' stopColor='#a855f7' stopOpacity='0.0' />
                        </linearGradient>
                    </defs>
                    <path d='M0,80 Q50,30 100,75 T200,35 T300,85 T400,25 T500,55 L500,120 L0,120 Z' fill='url(#aptG)' />
                    <path d='M0,80 Q50,30 100,75 T200,35 T300,85 T400,25 T500,55' fill='none' stroke='#a855f7' strokeWidth='3' />
                </svg>
                <div className='absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] text-slate-400 font-bold'>
                    <span>May 10</span>
                    <span>May 11</span>
                    <span>May 12</span>
                    <span>May 13</span>
                    <span>May 14</span>
                    <span>May 15</span>
                    <span>May 16</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;
