import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white border-slate-200 shadow-xs'>
            <div className='flex items-center gap-2 text-xs'>
                <img 
                    className='w-36 sm:w-40 cursor-pointer object-contain' 
                    src={assets.logo} 
                    alt="logo" 
                    onClick={() => navigate('/')} 
                />
                <p className='border px-2.5 py-0.5 rounded-full border-slate-400 text-slate-600 font-medium'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button 
                onClick={logout} 
                className='bg-[#5F6FFF] hover:bg-indigo-600 text-white text-sm px-6 sm:px-8 py-2 rounded-full font-medium transition-all shadow-sm cursor-pointer'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar