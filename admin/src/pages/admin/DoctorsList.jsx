import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-auto w-full max-w-6xl'>
            <h1 className='text-lg font-semibold text-slate-800 mb-3'>All Doctors</h1>

            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 pt-2'>
                {doctors && doctors.length > 0 ? (
                    doctors.map((item, index) => (
                        <div 
                            className='border border-indigo-100 rounded-2xl overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md transition-all duration-300' 
                            key={item._id || index}
                        >
                            <div className='bg-indigo-50/70 group-hover:bg-[#5F6FFF] transition-all duration-500 overflow-hidden flex items-center justify-center h-48'>
                                <img 
                                    className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' 
                                    src={item.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"} 
                                    alt={item.name} 
                                />
                            </div>

                            <div className='p-4'>
                                <p className='text-slate-900 text-lg font-semibold truncate'>{item.name}</p>
                                <p className='text-slate-500 text-xs font-medium mt-0.5'>{item.speciality}</p>

                                <div className='mt-4 flex items-center gap-2 pt-3 border-t border-slate-100'>
                                    <input 
                                        onChange={() => changeAvailability(item._id)} 
                                        type="checkbox" 
                                        checked={item.available} 
                                        className='w-4 h-4 cursor-pointer accent-[#5F6FFF]'
                                    />
                                    <p className={`text-xs font-semibold ${item.available ? 'text-green-600' : 'text-slate-400'}`}>
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center py-12 text-slate-400 font-medium'>
                        No doctors registered yet.
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorsList