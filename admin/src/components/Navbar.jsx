import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center justify-between px-6 py-4 bg-black border-b border-[#D4AF37]/30'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
                <img
                    className='h-10 w-auto'
                    src={assets.logo}
                    alt='logo'
                />
                <span className='text-[#D4AF37] font-bold text-lg tracking-widest hidden sm:block'>ADMIN PANEL</span>
            </div>

            {/* Button */}
            <button
                onClick={() => {
                    setToken('');
                    localStorage.removeItem('token');
                }}
                className='bg-[#D4AF37] text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#B8962E] transition-all'
            >
                LOGOUT
            </button>
        </div>
    )
}

export default Navbar