import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, ShieldCheck, UserCheck, LogOut, Calendar, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import RoleSelectorModal from './RoleSelectorModal';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [currentRole, setCurrentRole] = useState('USER');

    return (
        <>
            <div className='flex items-center justify-between text-sm py-4 mb-6 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 bg-[#0b0f19]/90'>
                <div className='flex items-center gap-4'>
                    <img
                        onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                        className='w-40 sm:w-44 cursor-pointer brightness-110 hover:opacity-90 transition-opacity'
                        src={assets.logo}
                        alt='MediCare Logo'
                    />
                    <button
                        onClick={() => setShowRoleModal(true)}
                        className='hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/90 text-slate-300 border border-slate-700 hover:border-pink-500/50 hover:text-pink-400 transition-all cursor-pointer'
                    >
                        <ShieldCheck size={14} className='text-pink-400' />
                        <span>Role: {currentRole}</span>
                    </button>
                </div>

                <ul className='hidden md:flex items-center gap-6 font-medium text-slate-300'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'text-pink-400 font-semibold' : 'hover:text-white transition-colors'}>
                        <li className='py-1 relative group'>
                            HOME
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </NavLink>
                    <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-pink-400 font-semibold' : 'hover:text-white transition-colors'}>
                        <li className='py-1 relative group'>
                            ALL DOCTORS
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </NavLink>
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'text-pink-400 font-semibold' : 'hover:text-white transition-colors'}>
                        <li className='py-1 relative group'>
                            ABOUT
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </NavLink>
                    <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-pink-400 font-semibold' : 'hover:text-white transition-colors'}>
                        <li className='py-1 relative group'>
                            CONTACT
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full'></span>
                        </li>
                    </NavLink>
                </ul>

                <div className='flex items-center gap-4'>
                    {token ? (
                        <div className='flex items-center gap-2 cursor-pointer relative group py-2'>
                            <img
                                className='w-9 h-9 rounded-full object-cover border-2 border-pink-500/50 shadow-md shadow-pink-500/20'
                                src={userData.image || assets.profile_pic}
                                alt='profile picture'
                            />
                            <div className='hidden sm:block text-left'>
                                <p className='text-xs font-semibold text-white leading-none'>{userData.name}</p>
                                <p className='text-[10px] text-slate-400 leading-tight mt-0.5'>Patient</p>
                            </div>
                            <ChevronDown size={16} className='text-slate-400 group-hover:text-white transition-colors' />

                            <div className='absolute top-full right-0 pt-2 text-sm font-medium text-slate-300 z-50 hidden group-hover:block animate-in fade-in duration-150'>
                                <div className='min-w-56 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col p-2 gap-1'>
                                    <div
                                        onClick={() => navigate('/my-profile')}
                                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white cursor-pointer transition-all'
                                    >
                                        <User size={16} className='text-pink-400' />
                                        <span>My Profile</span>
                                    </div>
                                    <div
                                        onClick={() => navigate('/my-appointments')}
                                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white cursor-pointer transition-all'
                                    >
                                        <Calendar size={16} className='text-indigo-400' />
                                        <span>My Appointments</span>
                                    </div>
                                    <div
                                        onClick={() => setShowRoleModal(true)}
                                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white cursor-pointer transition-all border-t border-slate-800/80 my-0.5'
                                    >
                                        <UserCheck size={16} className='text-emerald-400' />
                                        <span>System Roles</span>
                                    </div>
                                    <div
                                        onClick={() => setToken(false)}
                                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 cursor-pointer transition-all'
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
                            className='bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 cursor-pointer text-xs sm:text-sm'
                        >
                            Create account
                        </button>
                    )}
                </div>
            </div>

            <RoleSelectorModal
                isOpen={showRoleModal}
                onClose={() => setShowRoleModal(false)}
                currentRole={currentRole}
                onSelectRole={setCurrentRole}
            />
        </>
    );
};

export default Navbar;
