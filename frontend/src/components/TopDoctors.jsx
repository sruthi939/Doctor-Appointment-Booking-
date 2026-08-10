import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-slate-800 md:mx-10'>
            <h1 className='text-3xl sm:text-4xl font-bold text-slate-900'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500 leading-relaxed'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-5 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={item._id || index}
                        onClick={() => { navigate(`/appointment/${item._id || item.id}`); window.scrollTo(0, 0) }}
                        className='bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 hover:shadow-md hover:-translate-y-2.5 transition-all duration-500 group'
                    >
                        <div className='bg-blue-50/60 overflow-hidden h-52 flex items-center justify-center'>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-600 font-medium mb-1'>
                                <p className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></p>
                                <p>{item.available !== false ? 'Available' : 'Unavailable'}</p>
                            </div>
                            <p className='text-slate-900 text-lg font-bold group-hover:text-[#5F6FFF] transition-colors'>{item.name}</p>
                            <p className='text-slate-500 text-sm mt-0.5'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='bg-blue-50 text-[#5F6FFF] border border-blue-200 font-semibold px-12 py-3 rounded-full mt-10 hover:bg-[#5F6FFF] hover:text-white hover:scale-105 transition-all duration-300 shadow-xs cursor-pointer'
            >
                More Doctors
            </button>
        </div>
    )
}

export default TopDoctors