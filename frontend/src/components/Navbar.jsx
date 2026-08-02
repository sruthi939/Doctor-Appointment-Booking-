import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(false);

    return (
        <div className='flex items-center justify-between text-sm py-5 mb-5 border-b border-slate-800/80'>
            <img
                onClick={() => { navigate('/'); window.scrollTo(0, 0) }}
                className='w-44 cursor-pointer brightness-110'
                src={assets.logo}
                alt='' />
            <ul className='hidden md:flex items-start gap-6 font-medium text-slate-300'>
                <NavLink to='/'>
                    <li className='py-1 hover:text-white transition-colors'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 hover:text-white transition-colors'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 hover:text-white transition-colors'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 hover:text-white transition-colors'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token ? (
                        <div className='flex items-center gap-2 cursor-pointer relative group'>
                            <img
                                className='w-8 rounded-full border border-slate-700'
                                src={assets.profile_pic}
                                alt='profile picture'
                            />
                            <ChevronDown size={20} className='text-slate-400 group-hover:text-white transition-colors' />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-slate-300 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-4 p-4'>
                                    <p
                                        onClick={() => navigate('/my-profile')}
                                        className='hover:text-white cursor-pointer transition-colors'>
                                        My Profile
                                    </p>
                                    <p
                                        onClick={() => navigate('/my-appointments')}
                                        className='hover:text-white cursor-pointer transition-colors'>
                                        My Appointments
                                    </p>
                                    <p
                                        onClick={() => setToken(false)}
                                        className='hover:text-red-400 cursor-pointer transition-colors'>
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                            className='bg-white text-rose-600 border border-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold hidden md:block hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer'>
                            Create account
                        </button>
                    )}
            </div>
        </div>
    )
}

export default Navbar