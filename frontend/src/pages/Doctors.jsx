import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppConext } from '../context/AppContext'

const Doctors = () => {

    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();

    const [doctors] = useContext(AppConext);

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div className=''>
            <p className='text-gray-600'>Browser through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <div className='flex flex-col gap-4 text-sm text-gray-600'>
                    <p
                        onClick={() => speciality === 'Cardiologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Cardiologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                           ${speciality === "Cardiologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Cardiologist
                    </p>
                    <p
                        onClick={() => speciality === 'Neurologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Neurologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Neurologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Neurologist
                    </p>
                    <p
                        onClick={() => speciality === 'Orthopedics'
                            ? navigate('/doctors')
                            : navigate('/doctors/Orthopedics')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Orthopedics"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Orthopedics
                    </p>
                    <p
                        onClick={() => speciality === 'Pediatristion'
                            ? navigate('/doctors')
                            : navigate('/doctors/Pediatristion')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Pediatristion"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Pediatristion
                    </p>
                    <p
                        onClick={() => speciality === 'Dermatologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Dermatologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Dermatologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}

                    >
                        Dermatologist
                    </p>
                    <p
                        onClick={() => speciality === 'Gynecologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Gynecologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Gynecologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Gynecologist
                    </p>
                    <p
                        onClick={() => speciality === 'ENT'
                            ? navigate('/doctors')
                            : navigate('/doctors/ENT')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "ENT"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        ENT
                    </p>
                    <p
                        onClick={() => speciality === 'Ophthalmologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Ophthalmologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Ophthalmologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}

                    >
                        Ophthalmologist
                    </p>
                    <p
                        onClick={() => speciality === 'Dentist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Dentist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Dentist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Dentist
                    </p>
                    <p
                        onClick={() => speciality === 'Pulmonologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Pulmonologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Pulmonologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}

                    >
                        Pulmonologist
                    </p>
                    <p
                        onClick={() => speciality === 'Urologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Urologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Urologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Urologist
                    </p>
                    <p
                        onClick={() => speciality === 'Oncologist'
                            ? navigate('/doctors')
                            : navigate('/doctors/Oncologist')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "Oncologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Oncologist
                    </p>
                    <p
                        onClick={() => speciality === 'General Physician'
                            ? navigate('/doctors')
                            : navigate('/doctors/General Physician')}
                        className={`w-[94vw] sm:w-auto pl-3 pr-1.5 pr-16 border border-gray-300 rounded translate-all cursor-pointer
                            ${speciality === "General Physician"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}

                    >
                        General Physician
                    </p>
                </div>
                <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                    {
                        filterDoc.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/appointment/${item._id}`)}
                                className='bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-pink-500/60 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-2.5 transition-all duration-500 group'
                            >
                                <img
                                    className='bg-slate-800/80 w-full'
                                    src={item.image}
                                    alt=''
                                />
                                <div className='p-4'>
                                    <div className='flex items-center gap-2 text-sm text-emerald-400 font-medium mb-1'>
                                        <p className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></p><p>Available</p>
                                    </div>
                                    <p className='text-white text-lg font-semibold group-hover:text-pink-400 transition-colors'>{item.name}</p>
                                    <p className='text-slate-400 text-sm mt-0.5'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors