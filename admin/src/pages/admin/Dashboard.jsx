import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Stethoscope, Calendar, Users, ListFilter, XCircle, Calculator, UserCheck, ExternalLink, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getDashData()
        }
    }, [aToken])

    return dashData && (
        <div className='m-5 w-full max-w-6xl text-left space-y-8'>
            {/* Page Header */}
            <div>
                <h1 className='text-2xl font-extrabold text-slate-900'>System Administrator Overview</h1>
                <p className='text-slate-500 text-xs mt-1'>
                    Monitor overall hospital operations, staff counts, patient registrations, and live bookings.
                </p>
            </div>

            {/* Top Stat Cards */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {/* Doctor Stat Card */}
                <div onClick={() => navigate('/doctor-list')} className='bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer space-y-2'>
                    <div className='flex items-center justify-between'>
                        <div className='w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5F6FFF]'>
                            <Stethoscope className='w-5 h-5' />
                        </div>
                        <ArrowRight size={14} className='text-slate-400' />
                    </div>
                    <div>
                        <p className='text-2xl font-extrabold text-slate-900'>{dashData.doctors}</p>
                        <p className='text-slate-500 text-xs font-semibold'>Doctors Registered</p>
                    </div>
                </div>

                {/* Appointment Stat Card */}
                <div onClick={() => navigate('/all-appointments')} className='bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer space-y-2'>
                    <div className='flex items-center justify-between'>
                        <div className='w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
                            <Calendar className='w-5 h-5' />
                        </div>
                        <ArrowRight size={14} className='text-slate-400' />
                    </div>
                    <div>
                        <p className='text-2xl font-extrabold text-slate-900'>{dashData.appointments}</p>
                        <p className='text-slate-500 text-xs font-semibold'>Total Appointments</p>
                    </div>
                </div>

                {/* Patients Stat Card */}
                <div className='bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2'>
                    <div className='w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600'>
                        <Users className='w-5 h-5' />
                    </div>
                    <div>
                        <p className='text-2xl font-extrabold text-slate-900'>{dashData.patients}</p>
                        <p className='text-slate-500 text-xs font-semibold'>Registered Patients</p>
                    </div>
                </div>

                {/* Accountants Stat Card */}
                <div onClick={() => navigate('/accountants-list')} className='bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer space-y-2'>
                    <div className='flex items-center justify-between'>
                        <div className='w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600'>
                            <Calculator className='w-5 h-5' />
                        </div>
                        <ArrowRight size={14} className='text-slate-400' />
                    </div>
                    <div>
                        <p className='text-2xl font-extrabold text-slate-900'>{dashData.accountants || 0}</p>
                        <p className='text-slate-500 text-xs font-semibold'>Accountants</p>
                    </div>
                </div>

                {/* Receptionists Stat Card */}
                <div onClick={() => navigate('/receptionists-list')} className='bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer space-y-2'>
                    <div className='flex items-center justify-between'>
                        <div className='w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600'>
                            <UserCheck className='w-5 h-5' />
                        </div>
                        <ArrowRight size={14} className='text-slate-400' />
                    </div>
                    <div>
                        <p className='text-2xl font-extrabold text-slate-900'>{dashData.receptionists || 0}</p>
                        <p className='text-slate-500 text-xs font-semibold'>Receptionists</p>
                    </div>
                </div>
            </div>

            {/* Staff Department Oversight */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Stethoscope size={18} className='text-[#5F6FFF]' />
                            <h3 className='font-bold text-slate-800 text-sm'>Doctors Department</h3>
                        </div>
                        <span className='px-2.5 py-0.5 rounded-full bg-blue-50 text-[#5F6FFF] text-[10px] font-bold'>Active</span>
                    </div>
                    <p className='text-xs text-slate-500'>
                        {dashData.doctors} active medical specialists available for online bookings and consultations.
                    </p>
                    <a href='http://localhost:5173/doctor/login' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5 text-xs font-bold text-[#5F6FFF] hover:underline pt-1'>
                        Open Doctor Portal <ExternalLink size={12} />
                    </a>
                </div>

                <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Calculator size={18} className='text-amber-500' />
                            <h3 className='font-bold text-slate-800 text-sm'>Accountant Department</h3>
                        </div>
                        <span className='px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold'>Active</span>
                    </div>
                    <p className='text-xs text-slate-500'>
                        Manages financial transactions, patient invoices, expenses, and refund requests.
                    </p>
                    <a href='http://localhost:5173/accountant/login' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline pt-1'>
                        Open Accountant Portal <ExternalLink size={12} />
                    </a>
                </div>

                <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <UserCheck size={18} className='text-rose-500' />
                            <h3 className='font-bold text-slate-800 text-sm'>Reception Desk</h3>
                        </div>
                        <span className='px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-500 text-[10px] font-bold'>Active</span>
                    </div>
                    <p className='text-xs text-slate-500'>
                        Handles walk-in appointments, patient check-ins, queue management, and directory lookup.
                    </p>
                    <a href='http://localhost:5173/receptionist/login' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline pt-1'>
                        Open Receptionist Desk <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            {/* Latest Bookings List Container */}
            <div className='bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50'>
                    <div className='flex items-center gap-2'>
                        <ListFilter className='w-5 h-5 text-[#5F6FFF]' />
                        <p className='font-bold text-slate-800 text-sm'>Latest System Appointments</p>
                    </div>
                    <button onClick={() => navigate('/all-appointments')} className='text-xs font-bold text-[#5F6FFF] hover:underline cursor-pointer'>
                        View All
                    </button>
                </div>

                <div className='divide-y divide-slate-100'>
                    {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div key={item._id || index} className='flex items-center px-6 py-4 gap-4 hover:bg-slate-50/80 transition-all'>
                                <div className='w-10 h-10 rounded-full bg-blue-50 border border-blue-200 font-bold text-[#5F6FFF] flex items-center justify-center text-xs shrink-0'>
                                    {index + 1}
                                </div>
                                <div className='flex-1 text-xs space-y-0.5'>
                                    <p className='text-slate-800 font-bold text-sm'>{item.docData?.name || "Doctor"}</p>
                                    <p className='text-slate-500'>
                                        Patient: <span className='font-semibold text-slate-800'>{item.userData?.name || "Patient"}</span> &bull; {item.slotDate} ({item.slotTime})
                                    </p>
                                </div>

                                <div>
                                    {item.cancelled ? (
                                        <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200'>Cancelled</span>
                                    ) : item.isCompleted ? (
                                        <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200'>Completed</span>
                                    ) : (
                                        <button onClick={() => cancelAppointment(item._id)} className='p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer' title='Cancel Booking'>
                                            <XCircle size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-slate-400 text-xs py-8 text-center'>No recent appointments found in database.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard