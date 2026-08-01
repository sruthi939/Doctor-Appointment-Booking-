import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-slate-100' id='speciality'>
            <h1 className='text-3xl sm:text-4xl font-bold text-white'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-400 leading-relaxed'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-scroll py-4'>
                {specialityData.map((item, index) => (
                    <Link
                        key={index}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs font-medium cursor-pointer flex-shrink-0 hover:-translate-y-2.5 transition-all duration-500 text-slate-300 hover:text-pink-400 group'
                        to={`/doctors/${item.speciality}`}
                    >
                        <div className='p-4 bg-slate-900/90 border border-slate-800 rounded-full mb-2 group-hover:bg-pink-500/20 group-hover:border-pink-500 transition-all duration-300 shadow-lg shadow-rose-950/20'>
                            <img
                                className='w-14 sm:w-20'
                                src={item.image}
                                alt=''
                            />
                        </div>
                        <p className='mt-1 text-center font-medium'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu