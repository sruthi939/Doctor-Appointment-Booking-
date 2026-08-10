import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-slate-800' id='speciality'>
            <h1 className='text-3xl sm:text-4xl font-bold text-slate-900'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-500 leading-relaxed'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto py-4'>
                {specialityData.map((item, index) => (
                    <Link
                        key={index}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs font-medium cursor-pointer flex-shrink-0 hover:-translate-y-2.5 transition-all duration-500 text-slate-700 hover:text-[#5F6FFF] group'
                        to={`/doctors/${item.speciality}`}
                    >
                        <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50/70 border border-blue-100 flex items-center justify-center p-3.5 mb-2 group-hover:bg-blue-100 group-hover:border-[#5F6FFF] transition-all duration-300 shadow-xs aspect-square shrink-0'>
                            <img
                                className='w-full h-full object-contain'
                                src={item.image}
                                alt={item.speciality}
                            />
                        </div>
                        <p className='mt-1 text-center font-semibold text-slate-700 group-hover:text-[#5F6FFF]'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu