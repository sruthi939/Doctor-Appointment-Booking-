import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDocs] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-slate-100 md:mx-10'>
            <h1 className='text-3xl sm:text-4xl font-bold text-white'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-slate-400 leading-relaxed'>
                Simply browse through our extensive list
            </p>
            <div className='w-full grid grid-cols-auto gap-5 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        className='bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-2.5 transition-all duration-500 group'
                    >
                        <img
                            className='bg-slate-800/80 w-full'
                            src={item.image}
                            alt=''
                        />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-emerald-400 font-medium mb-1'>
                                <p className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'>
                                    <p>Available</p>
                                </p>
                            </div>
                            <p className='text-white text-lg font-semibold group-hover:text-pink-400 transition-colors'>{item.name}</p>
                            <p className='text-slate-400 text-sm mt-0.5'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className=''
            >
                more
            </button>
        </div >
    )
}

export default RelatedDoctors