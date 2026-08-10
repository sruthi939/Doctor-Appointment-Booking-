import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { DollarSign, Calendar, Users, ListFilter, CheckCircle, XCircle } from 'lucide-react'

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { currency, slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    return dashData && (
        <div className='m-5 w-full max-w-6xl'>
            <div className='flex flex-wrap gap-5 mb-8'>
                {/* Earnings Card */}
                <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-56 hover:scale-[1.02] transition-all'>
                    <div className='w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600'>
                        <DollarSign className='w-7 h-7' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{currency || '$'}{dashData.earnings}</p>
                        <p className='text-slate-500 text-sm font-medium'>Earnings</p>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-56 hover:scale-[1.02] transition-all'>
                    <div className='w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
                        <Calendar className='w-7 h-7' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{dashData.appointments}</p>
                        <p className='text-slate-500 text-sm font-medium'>Appointments</p>
                    </div>
                </div>

                {/* Patients Card */}
                <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-56 hover:scale-[1.02] transition-all'>
                    <div className='w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600'>
                        <Users className='w-7 h-7' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{dashData.patients}</p>
                        <p className='text-slate-500 text-sm font-medium'>Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings */}
            <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
                <div className='flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50'>
                    <ListFilter className='w-5 h-5 text-[#5F6FFF]' />
                    <p className='font-semibold text-slate-800'>Latest Patient Bookings</p>
                </div>

                <div className='divide-y divide-slate-100'>
                    {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div key={item._id || index} className='flex items-center px-6 py-4 gap-4 hover:bg-slate-50/80 transition-all'>
                                <img 
                                    className='w-11 h-11 rounded-full object-cover bg-slate-100 border border-slate-200' 
                                    src={item.userData?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                                    alt="patient" 
                                />
                                <div className='flex-1 text-sm'>
                                    <p className='text-slate-800 font-semibold'>{item.userData?.name || "Patient"}</p>
                                    <p className='text-slate-500 text-xs mt-0.5'>
                                        Booking for {slotDateFormat ? slotDateFormat(item.slotDate) : item.slotDate}, {item.slotTime}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    {item.cancelled ? (
                                        <span className='text-red-500 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-100'>Cancelled</span>
                                    ) : item.isCompleted ? (
                                        <span className='text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100'>Completed</span>
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <button onClick={async () => { await cancelAppointment(item._id); getDashData(); }} className='p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer'>
                                                <XCircle className='w-6 h-6' />
                                            </button>
                                            <button onClick={async () => { await completeAppointment(item._id); getDashData(); }} className='p-1 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all cursor-pointer'>
                                                <CheckCircle className='w-6 h-6' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-10 text-slate-400 font-medium text-sm'>
                            No recent patient bookings.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
