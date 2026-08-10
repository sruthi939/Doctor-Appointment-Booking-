import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { LayoutDashboard, Calendar, UserPlus, Users, Calculator, UserCheck, Stethoscope, DollarSign, ExternalLink } from 'lucide-react'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)

    return (
        <div className='min-h-screen bg-white border-r border-slate-200 w-64 py-5 px-3 flex flex-col justify-between shadow-sm text-left'>
            {aToken && (
                <div className='space-y-5'>
                    <div className='px-4 py-1.5 border-b border-slate-100'>
                        <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Admin Controls</p>
                    </div>

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
                            <LayoutDashboard className='w-5 h-5 text-[#5F6FFF]' />
                            <p className='text-sm'>Dashboard</p>
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
                            <Calendar className='w-5 h-5 text-indigo-500' />
                            <p className='text-sm'>All Appointments</p>
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
                            <Users className='w-5 h-5 text-blue-500' />
                            <p className='text-sm'>Doctors Table</p>
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
                            <UserPlus className='w-5 h-5 text-emerald-500' />
                            <p className='text-sm'>Add Doctor</p>
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
                            <Calculator className='w-5 h-5 text-amber-500' />
                            <p className='text-sm'>Accountants</p>
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
                            <UserCheck className='w-5 h-5 text-purple-500' />
                            <p className='text-sm'>Receptionists</p>
                        </NavLink>
                    </ul>

                    {/* Staff Work & Portal Views inside Admin Panel */}
                    <div className='pt-3 border-t border-slate-100 space-y-1'>
                        <p className='px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider'>Staff Work Portals</p>
                        <NavLink
                            to={'/doctor-portal'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all ${isActive
                                    ? 'bg-blue-50 text-[#5F6FFF]'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <Stethoscope className='w-4 h-4 text-[#5F6FFF]' />
                            <span>Doctor Work View</span>
                        </NavLink>

                        <NavLink
                            to={'/accountant-portal'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all ${isActive
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <DollarSign className='w-4 h-4 text-amber-500' />
                            <span>Accountant Payments Desk</span>
                        </NavLink>

                        <NavLink
                            to={'/receptionist-portal'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-all ${isActive
                                    ? 'bg-rose-50 text-rose-500'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <UserCheck className='w-4 h-4 text-rose-500' />
                            <span>Receptionist Desk View</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar