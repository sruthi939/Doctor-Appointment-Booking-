import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { UserCheck, Search, Filter } from 'lucide-react'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    const filteredDoctors = doctors ? doctors.filter(doc => 
        (doc.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.speciality || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className='m-5 max-h-[90vh] overflow-y-auto w-full max-w-6xl text-left space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <UserCheck className='text-[#5F6FFF]' size={24} />
                        Registered Doctors List
                    </h1>
                    <p className='text-slate-500 text-xs mt-0.5'>
                        Real-time list of all medical specialists registered in the system database.
                    </p>
                </div>
                <span className='px-3.5 py-1.5 rounded-full bg-blue-50 text-[#5F6FFF] border border-blue-200 text-xs font-semibold self-start sm:self-auto'>
                    Total Registered: {doctors ? doctors.length : 0} Doctors
                </span>
            </div>

            {/* Search filter */}
            <div className='relative max-w-md'>
                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search doctor by name, email, or specialty...'
                    className='w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#5F6FFF]'
                />
            </div>

            {/* Doctor Cards Grid */}
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 pt-2'>
                {filteredDoctors && filteredDoctors.length > 0 ? (
                    filteredDoctors.map((item, index) => (
                        <div 
                            className='border border-slate-200 rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between' 
                            key={item._id || index}
                        >
                            <div>
                                <div className='bg-blue-50/70 group-hover:bg-blue-100 transition-all duration-300 overflow-hidden flex items-center justify-center h-48 relative'>
                                    <img 
                                        className='w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500' 
                                        src={item.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"} 
                                        alt={item.name} 
                                    />
                                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.available ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-slate-100 text-slate-500 border border-slate-300'}`}>
                                        {item.available ? 'Active' : 'Offline'}
                                    </span>
                                </div>

                                <div className='p-4 space-y-1.5'>
                                    <p className='text-slate-900 text-base font-bold truncate'>{item.name}</p>
                                    <p className='text-[#5F6FFF] text-xs font-semibold'>{item.speciality}</p>
                                    <p className='text-slate-500 text-[11px] font-mono truncate'>{item.email}</p>
                                    
                                    <div className='flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100 mt-2'>
                                        <span>{item.degree || 'MBBS'}</span>
                                        <span className='font-bold text-slate-800'>${item.fees} / visit</span>
                                    </div>
                                </div>
                            </div>

                            <div className='p-4 pt-0'>
                                <div className='flex items-center gap-2 pt-2 border-t border-slate-100'>
                                    <input 
                                        onChange={() => changeAvailability(item._id)} 
                                        type="checkbox" 
                                        checked={item.available} 
                                        className='w-4 h-4 cursor-pointer accent-[#5F6FFF]'
                                        id={`avail-${item._id}`}
                                    />
                                    <label htmlFor={`avail-${item._id}`} className={`text-xs font-semibold cursor-pointer ${item.available ? 'text-green-600' : 'text-slate-400'}`}>
                                        {item.available ? 'Available for Booking' : 'Mark Available'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500 text-xs font-medium space-y-1'>
                        <p className='font-bold text-slate-800 text-sm'>No registered doctors found.</p>
                        <p>Use the "Add Doctor" menu to register real doctors into the database.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorsList