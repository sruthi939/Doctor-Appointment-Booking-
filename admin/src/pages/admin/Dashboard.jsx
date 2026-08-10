import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Stethoscope, Calendar, Users, ListFilter, XCircle } from 'lucide-react'

const Dashboard = () => {
    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getDashData()
        }
    }, [aToken])

    return dashData && (
        <div className='m-5 w-full max-w-6xl'>
            {/* Top Stat Cards */}
            <div className='flex flex-wrap gap-5 mb-8'>
                {/* Doctor Stat Card */}
                <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-56 hover:scale-[1.02] transition-all'>
                    <div className='w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5F6FFF]'>
                        <Stethoscope className='w-7 h-7' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{dashData.doctors}</p>
                        <p className='text-slate-500 text-sm font-medium'>Doctors</p>
                    </div>
                </div>

                {/* Appointment Stat Card */}
                <div className='flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-56 hover:scale-[1.02] transition-all'>
                    <div className='w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600'>
                        <Calendar className='w-7 h-7' />
                    </div>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{dashData.appointments}</p>
                        <p className='text-slate-500 text-sm font-medium'>Appointments</p>
                    </div>
                </div>

                {/* Patients Stat Card */}
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

            {/* Latest Bookings List Container */}
            <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
                <div className='flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50'>
                    <ListFilter className='w-5 h-5 text-[#5F6FFF]' />
                    <p className='font-semibold text-slate-800'>Latest Bookings</p>
                </div>

                <div className='divide-y divide-slate-100'>
                    {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div key={item._id || index} className='flex items-center px-6 py-4 gap-4 hover:bg-slate-50/80 transition-all'>
                                <img 
                                    className='w-11 h-11 rounded-full object-cover bg-slate-100 border border-slate-200' 
                                    src={item.docData?.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"} 
                                    alt="doctor" 
                                />
                                <div className='flex-1 text-sm'>
                                    <p className='text-slate-800 font-semibold'>{item.docData?.name || "Doctor"}</p>
                                    <p className='text-slate-500 text-xs mt-0.5'>
                                        Booking for <span className='font-medium text-slate-700'>{item.userData?.name || "Patient"}</span> on {slotDateFormat ? slotDateFormat(item.slotDate) : item.slotDate}
                                    </p>
                                </div>

                                <div>
                                    {item.cancelled ? (
                                        <span className='text-red-500 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-100'>
                                            Cancelled
                                        </span>
                                    ) : item.isCompleted ? (
                                        <span className='text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100'>
                                            Completed
                                        </span>
                                    ) : (
                                        <button 
                                            onClick={async () => {
                                                await cancelAppointment(item._id)
                                                getDashData()
                                            }}
                                            title="Cancel Appointment"
                                            className='p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer'
                                        >
                                            <XCircle className='w-6 h-6' />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-10 text-slate-400 font-medium text-sm'>
                            No recent bookings available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard