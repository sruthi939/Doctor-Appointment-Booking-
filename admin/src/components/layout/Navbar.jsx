import React from 'react';
import { ShieldCheck, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const adminName = user?.name || 'System Admin';

    return (
        <header className='h-16 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between backdrop-blur-xl shrink-0 text-left'>
            <div className='flex items-center gap-3'>
                <span className='px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest'>
                    MediCare Admin
                </span>
            </div>

            <div className='flex items-center gap-4'>
                <button className='w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative cursor-pointer'>
                    <Bell size={16} />
                    <span className='absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500'></span>
                </button>

                <div className='flex items-center gap-3 pl-3 border-l border-slate-800'>
                    <div className='w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md'>
                        {adminName[0]}
                    </div>
                    <div className='hidden sm:block text-xs'>
                        <p className='font-bold text-white leading-none'>{adminName}</p>
                        <span className='text-[10px] text-purple-400 font-semibold'>Administrator</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
