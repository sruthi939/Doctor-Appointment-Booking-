import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    
    const accountantToken = localStorage.getItem('accountantToken')
    const receptionistToken = localStorage.getItem('receptionistToken')
    
    const accountantName = localStorage.getItem('accountant_name')
    const accountantEmail = localStorage.getItem('accountant_email')

    const receptionistName = localStorage.getItem('receptionist_name')
    const receptionistEmail = localStorage.getItem('receptionist_email')

    const navigate = useNavigate()

    const logout = () => {
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
        if (accountantToken) {
            localStorage.removeItem('accountantToken')
            localStorage.removeItem('accountant_name')
            localStorage.removeItem('accountant_email')
        }
        if (receptionistToken) {
            localStorage.removeItem('receptionistToken')
            localStorage.removeItem('receptionist_name')
            localStorage.removeItem('receptionist_email')
        }
        navigate('/')
        window.location.reload()
    }

    let roleBadge = 'Admin';
    let userEmail = 'admin@gmail.com';
    let userName = 'System Admin';

    if (aToken) {
        roleBadge = 'Admin';
        userEmail = 'admin@gmail.com';
        userName = 'Administrator';
    } else if (dToken) {
        roleBadge = 'Doctor';
        userEmail = localStorage.getItem('doctor_email') || 'doctor@medicare.com';
        userName = 'Doctor';
    } else if (accountantToken) {
        roleBadge = 'Accountant';
        userEmail = accountantEmail || 'accountant@medicare.com';
        userName = accountantName || 'Accountant';
    } else if (receptionistToken) {
        roleBadge = 'Receptionist';
        userEmail = receptionistEmail || 'receptionist@medicare.com';
        userName = receptionistName || 'Receptionist';
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white border-slate-200 shadow-xs'>
            <div className='flex items-center gap-3 text-xs'>
                <img 
                    className='w-36 sm:w-40 cursor-pointer object-contain' 
                    src={assets.logo} 
                    alt="logo" 
                    onClick={() => navigate('/')} 
                />
                <span className='px-3 py-1 rounded-full bg-blue-50 text-[#5F6FFF] border border-blue-200 font-bold text-xs'>
                    {roleBadge}
                </span>
            </div>

            {/* Logged in User Identity */}
            <div className='flex items-center gap-4'>
                <div className='hidden sm:flex flex-col text-right text-xs'>
                    <span className='font-bold text-slate-900'>{userName}</span>
                    <span className='text-slate-500 font-mono text-[11px]'>{userEmail}</span>
                </div>

                <button 
                    onClick={logout} 
                    className='bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs px-5 sm:px-6 py-2 rounded-xl font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5'
                >
                    <LogOut size={14} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar