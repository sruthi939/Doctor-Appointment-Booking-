import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { LayoutDashboard, Calendar, UserPlus, Users, User, Calculator, UserCheck } from 'lucide-react'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    return (
        <div className='min-h-screen bg-white border-r border-slate-200 w-64 py-5 px-3 flex flex-col gap-2 shadow-sm'>
            {aToken && (
                <ul className='text-[#515151] font-medium space-y-1'>
                    <NavLink
                        to={'/admin-dashboard'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <LayoutDashboard className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Dashboard</p>
                    </NavLink>

                    <NavLink
                        to={'/all-appointments'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <Calendar className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>All Appointments</p>
                    </NavLink>

                    <NavLink
                        to={'/add-doctor'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <UserPlus className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Add Doctor</p>
                    </NavLink>

                    <NavLink
                        to={'/doctor-list'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <Users className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Doctors List</p>
                    </NavLink>

                    <NavLink
                        to={'/accountants-list'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <Calculator className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Accountants</p>
                    </NavLink>

                    <NavLink
                        to={'/receptionists-list'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <UserCheck className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Receptionists</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className='text-[#515151] font-medium space-y-1'>
                    <NavLink
                        to={'/doctor-dashboard'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <LayoutDashboard className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Dashboard</p>
                    </NavLink>

                    <NavLink
                        to={'/doctor-appointments'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <Calendar className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Appointments</p>
                    </NavLink>

                    <NavLink
                        to={'/doctor-profile'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                : 'hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <User className='w-5 h-5' />
                        <p className='hidden md:block text-sm'>Profile</p>
                    </NavLink>
                </ul>
            )}
        </div>
    )
}

export default Sidebar