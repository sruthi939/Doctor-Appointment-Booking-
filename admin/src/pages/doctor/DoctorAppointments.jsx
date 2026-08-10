import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { CheckCircle, XCircle } from 'lucide-react'

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-semibold text-slate-800'>Doctor Appointments</p>

            <div className='bg-white border border-slate-200 rounded-2xl text-sm max-h-[80vh] overflow-y-auto shadow-sm'>
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3.5 px-6 border-b border-slate-200 bg-slate-50 text-slate-600 font-medium'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p className='text-center'>Action</p>
                </div>

                {appointments && appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={item._id || index} className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-slate-500 py-3.5 px-6 border-b border-slate-100 hover:bg-slate-50/80 transition-all'>
                            <p className='max-sm:hidden font-medium text-slate-400'>{index + 1}</p>

                            <div className='flex items-center gap-2'>
                                <img className='w-9 h-9 rounded-full object-cover border border-slate-200' src={item.userData?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} alt="patient" />
                                <p className='font-medium text-slate-800'>{item.userData?.name || "Patient"}</p>
                            </div>

                            <div>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.payment ? 'bg-green-50 text-green-600 border-green-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                                    {item.payment ? 'Cash/Online' : 'Pending'}
                                </span>
                            </div>

                            <p className='max-sm:hidden'>{item.userData?.dob ? (calculateAge ? calculateAge(item.userData.dob) : '24') : '25'}</p>

                            <p className='text-slate-600 text-xs sm:text-sm font-medium'>
                                {slotDateFormat ? slotDateFormat(item.slotDate) : item.slotDate}, {item.slotTime}
                            </p>

                            <p className='font-semibold text-slate-800'>{currency || '$'}{item.amount || 50}</p>

                            <div className='flex items-center justify-center gap-2'>
                                {item.cancelled ? (
                                    <span className='text-red-500 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-100'>Cancelled</span>
                                ) : item.isCompleted ? (
                                    <span className='text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100'>Completed</span>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => cancelAppointment(item._id)} title="Cancel Appointment" className='p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer'>
                                            <XCircle className='w-6 h-6' />
                                        </button>
                                        <button onClick={() => completeAppointment(item._id)} title="Complete Appointment" className='p-1 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all cursor-pointer'>
                                            <CheckCircle className='w-6 h-6' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-12 text-slate-400 font-medium'>
                        No appointments assigned yet.
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorAppointments
