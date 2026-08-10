import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Calendar, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    return (
        <div className='flex items-center justify-between text-sm !py-1.5 mb-4 border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-40 bg-white/90 shadow-xs'>
            <div className='flex items-center gap-4'>
                <img
                    onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                    className='w-40 sm:w-44 cursor-pointer hover:opacity-90 transition-opacity object-contain'
                    src={assets.logo}
                    alt='MediCare Logo'
                />
            </div>

            <ul className='hidden md:flex items-center gap-6 font-medium text-slate-600'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#5F6FFF] font-semibold' : 'hover:text-slate-900 transition-colors'}>
                    <li className='py-1 relative group'>
                        HOME
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#5F6FFF] transition-all duration-300 group-hover:w-full'></span>
                    </li>
                </NavLink>
                <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-[#5F6FFF] font-semibold' : 'hover:text-slate-900 transition-colors'}>
                    <li className='py-1 relative group'>
                        ALL DOCTORS
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#5F6FFF] transition-all duration-300 group-hover:w-full'></span>
                    </li>
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'text-[#5F6FFF] font-semibold' : 'hover:text-slate-900 transition-colors'}>
                    <li className='py-1 relative group'>
                        ABOUT
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#5F6FFF] transition-all duration-300 group-hover:w-full'></span>
                    </li>
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-[#5F6FFF] font-semibold' : 'hover:text-slate-900 transition-colors'}>
                    <li className='py-1 relative group'>
                        CONTACT
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[#5F6FFF] transition-all duration-300 group-hover:w-full'></span>
                    </li>
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {token ? (
                    <div className='flex items-center gap-2 cursor-pointer relative group py-2'>
                        <img
                            className='w-9 h-9 rounded-full object-cover border-2 border-[#5F6FFF] shadow-xs'
                            src={userData?.image || assets.profile_pic}
                            alt='profile picture'
                        />
                        <div className='hidden sm:block text-left'>
                            <p className='text-xs font-semibold text-slate-800 leading-none'>{userData?.name || 'Patient'}</p>
                            <p className='text-[10px] text-slate-500 leading-tight mt-0.5'>Patient</p>
                        </div>
                        <ChevronDown size={16} className='text-slate-500 group-hover:text-slate-800 transition-colors' />

                        <div className='absolute top-full right-0 pt-2 text-sm font-medium text-slate-600 z-50 hidden group-hover:block animate-in fade-in duration-150'>
                            <div className='min-w-48 bg-white border border-slate-200 rounded-2xl shadow-xl backdrop-blur-xl flex flex-col p-2 gap-1'>
                                <div
                                    onClick={() => navigate('/my-profile')}
                                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-all'
                                >
                                    <User size={16} className='text-[#5F6FFF]' />
                                    <span>My Profile</span>
                                </div>
                                <div
                                    onClick={() => navigate('/my-appointments')}
                                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-all'
                                >
                                    <Calendar size={16} className='text-indigo-600' />
                                    <span>My Appointments</span>
                                </div>
                                <div
                                    onClick={() => setToken(false)}
                                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 cursor-pointer transition-all border-t border-slate-100 my-0.5'
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
                        className='bg-[#5F6FFF] hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer text-xs sm:text-sm'
                    >
                        Create account
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
