import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { XCircle, CheckCircle2 } from 'lucide-react'

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-semibold text-slate-800'>All Appointments</p>

            <div className='bg-white border border-slate-200 rounded-2xl text-sm max-h-[80vh] overflow-y-auto shadow-sm'>
                {/* Table Header */}
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3.5 px-6 border-b border-slate-200 bg-slate-50 text-slate-600 font-medium'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p className='text-center'>Actions</p>
                </div>

                {/* Table Body */}
                {appointments && appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div 
                            className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-slate-500 py-3.5 px-6 border-b border-slate-100 hover:bg-slate-50/80 transition-all' 
                            key={item._id || index}
                        >
                            <p className='max-sm:hidden font-medium text-slate-400'>{index + 1}</p>

                            <div className='flex items-center gap-2'>
                                <img 
                                    className='w-9 h-9 rounded-full object-cover border border-slate-200' 
                                    src={item.userData?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                                    alt="patient" 
                                />
                                <p className='font-medium text-slate-800'>{item.userData?.name || "Patient"}</p>
                            </div>

                            <p className='max-sm:hidden'>
                                {item.userData?.dob ? (calculateAge ? calculateAge(item.userData.dob) : '24') : '25'}
                            </p>

                            <p className='text-slate-600 text-xs sm:text-sm font-medium'>
                                {slotDateFormat ? slotDateFormat(item.slotDate) : item.slotDate}, {item.slotTime}
                            </p>

                            <div className='flex items-center gap-2'>
                                <img 
                                    className='w-9 h-9 rounded-full object-cover bg-slate-100 border border-slate-200' 
                                    src={item.docData?.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"} 
                                    alt="doctor" 
                                />
                                <p className='font-medium text-slate-700'>{item.docData?.name || "Doctor"}</p>
                            </div>

                            <p className='font-semibold text-slate-800'>
                                {currency || '$'}{item.amount || item.docData?.fees || 50}
                            </p>

                            <div className='flex items-center justify-center'>
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
                                        onClick={() => cancelAppointment(item._id)} 
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
                    <div className='text-center py-12 text-slate-400 font-medium'>
                        No appointments found.
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllAppointments