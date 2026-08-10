import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { LayoutDashboard, Calendar, UserPlus, Users, Calculator, UserCheck, ExternalLink } from 'lucide-react'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)

    return (
        <div className='min-h-screen bg-white border-r border-slate-200 w-64 py-5 px-3 flex flex-col justify-between shadow-sm text-left'>
            {aToken && (
                <div className='space-y-6'>
                    <div className='px-4 py-2 border-b border-slate-100'>
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
                            to={'/doctor-list'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${isActive
                                    ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-semibold'
                                    : 'hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <Users className='w-5 h-5 text-blue-500' />
                            <p className='text-sm'>Doctors List</p>
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
                </div>
            )}

            {/* Staff Portals Direct Access */}
            <div className='p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs'>
                <p className='font-bold text-slate-800 flex items-center justify-between'>
                    <span>Staff Portals</span>
                    <ExternalLink size={14} className='text-slate-400' />
                </p>
                <div className='flex flex-col gap-1.5 pt-1'>
                    <a href='http://localhost:5173/doctor/login' target='_blank' rel='noopener noreferrer' className='p-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:text-[#5F6FFF] transition-all block text-left'>
                        Doctor Dashboard &rarr;
                    </a>
                    <a href='http://localhost:5173/accountant/login' target='_blank' rel='noopener noreferrer' className='p-2 bg-white hover:bg-amber-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:text-amber-600 transition-all block text-left'>
                        Accountant Portal &rarr;
                    </a>
                    <a href='http://localhost:5173/receptionist/login' target='_blank' rel='noopener noreferrer' className='p-2 bg-white hover:bg-rose-50 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:text-rose-500 transition-all block text-left'>
                        Receptionist Desk &rarr;
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar