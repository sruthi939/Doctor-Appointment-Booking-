import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { UserCheck, Search, Eye, X, Mail, MapPin, Award, DollarSign, Clock, ShieldCheck, Stethoscope } from 'lucide-react'

import doc1 from '../../../../frontend/src/assets/doc1.png';
import doc2 from '../../../../frontend/src/assets/doc2.png';
import doc3 from '../../../../frontend/src/assets/doc3.png';
import doc4 from '../../../../frontend/src/assets/doc4.png';
import doc5 from '../../../../frontend/src/assets/doc5.png';
import doc6 from '../../../../frontend/src/assets/doc6.png';
import doc7 from '../../../../frontend/src/assets/doc7.png';
import doc8 from '../../../../frontend/src/assets/doc8.png';
import doc9 from '../../../../frontend/src/assets/doc9.png';
import doc10 from '../../../../frontend/src/assets/doc10.png';
import doc11 from '../../../../frontend/src/assets/doc11.png';
import doc12 from '../../../../frontend/src/assets/doc12.png';
import doc13 from '../../../../frontend/src/assets/doc13.png';
import doc14 from '../../../../frontend/src/assets/doc14.png';
import doc15 from '../../../../frontend/src/assets/doc15.png';

const doctorAssetImages = [
    doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10, doc11, doc12, doc13, doc14, doc15
];

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        getAllDoctors()
    }, [aToken])

    const getDoctorImage = (item, index) => {
        if (item.image && typeof item.image === 'string') {
            if (item.image.startsWith('http') && !item.image.includes('unsplash')) return item.image;
            if (item.image.startsWith('data:image')) return item.image;
        }
        return doctorAssetImages[index % doctorAssetImages.length];
    };

    const filteredDoctors = doctors ? doctors.filter(doc => 
        (doc.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.speciality || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const openDoctorDetails = (doc, index) => {
        setSelectedDoctor(doc);
        setSelectedIndex(index);
    };

    return (
        <div className='m-5 max-h-[90vh] overflow-y-auto w-full max-w-6xl text-left space-y-4 relative'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <UserCheck className='text-[#5F6FFF]' size={24} />
                        Registered Doctors Table
                    </h1>
                    <p className='text-slate-500 text-xs mt-0.5'>
                        Click any doctor row to view full profile details, credentials, and clinic address.
                    </p>
                </div>
                <span className='px-3.5 py-1.5 rounded-full bg-blue-50 text-[#5F6FFF] border border-blue-200 text-xs font-semibold self-start sm:self-auto'>
                    Total Registered: {filteredDoctors ? filteredDoctors.length : 0} Doctors
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

            {/* Doctors Table View */}
            <div className='bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-xs text-slate-700'>
                        <thead className='bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]'>
                            <tr>
                                <th className='p-4 rounded-tl-2xl'>#</th>
                                <th className='p-4'>Doctor Info</th>
                                <th className='p-4'>Specialty</th>
                                <th className='p-4'>Degree & Exp</th>
                                <th className='p-4'>Fee</th>
                                <th className='p-4'>Availability</th>
                                <th className='p-4 text-center rounded-tr-2xl'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {filteredDoctors && filteredDoctors.length > 0 ? (
                                filteredDoctors.map((item, index) => (
                                    <tr 
                                        key={item._id || index}
                                        onClick={() => openDoctorDetails(item, index)}
                                        className='hover:bg-blue-50/50 transition-colors cursor-pointer group'
                                    >
                                        <td className='p-4 font-bold text-slate-400'>{index + 1}</td>
                                        <td className='p-4'>
                                            <div className='flex items-center gap-3'>
                                                <img 
                                                    className='w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0 bg-blue-50' 
                                                    src={getDoctorImage(item, index)} 
                                                    alt={item.name} 
                                                />
                                                <div>
                                                    <p className='font-bold text-slate-900 group-hover:text-[#5F6FFF] transition-colors text-sm'>
                                                        {item.name}
                                                    </p>
                                                    <p className='text-slate-500 font-mono text-[11px]'>{item.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-4 font-semibold text-[#5F6FFF]'>
                                            {item.speciality}
                                        </td>
                                        <td className='p-4 text-slate-600'>
                                            <p className='font-medium'>{item.degree || 'MBBS'}</p>
                                            <p className='text-slate-400 text-[11px]'>{item.experience || '3 Years'}</p>
                                        </td>
                                        <td className='p-4 font-bold text-slate-900'>
                                            ${item.fees} / visit
                                        </td>
                                        <td className='p-4' onClick={(e) => e.stopPropagation()}>
                                            <div className='flex items-center gap-2'>
                                                <input 
                                                    onChange={() => changeAvailability(item._id || index)} 
                                                    type="checkbox" 
                                                    checked={item.available !== false} 
                                                    className='w-4 h-4 cursor-pointer accent-[#5F6FFF]'
                                                    id={`avail-${item._id || index}`}
                                                />
                                                <span className={`text-xs font-semibold ${item.available !== false ? 'text-green-600' : 'text-slate-400'}`}>
                                                    {item.available !== false ? 'Active' : 'Offline'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='p-4 text-center' onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => openDoctorDetails(item, index)}
                                                className='px-3.5 py-1.5 bg-blue-50 hover:bg-[#5F6FFF] text-[#5F6FFF] hover:text-white border border-blue-200 hover:border-[#5F6FFF] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 mx-auto cursor-pointer'
                                            >
                                                <Eye size={14} /> View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='p-8 text-center text-slate-400 font-medium'>
                                        No registered doctors found in database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Doctor Detail Modal */}
            {selectedDoctor && (
                <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative text-left'>
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className='absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors'
                        >
                            <X size={18} />
                        </button>

                        {/* Doctor Header */}
                        <div className='flex items-center gap-5 border-b border-slate-100 pb-5'>
                            <img
                                className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-200 shadow-sm shrink-0 bg-blue-50'
                                src={getDoctorImage(selectedDoctor, selectedIndex)}
                                alt={selectedDoctor.name}
                            />
                            <div className='space-y-1'>
                                <h2 className='text-xl sm:text-2xl font-extrabold text-slate-900'>{selectedDoctor.name}</h2>
                                <span className='inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#5F6FFF] border border-blue-200'>
                                    {selectedDoctor.speciality}
                                </span>
                                <p className='text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-1'>
                                    <Mail size={13} className='text-[#5F6FFF]' />
                                    <span>{selectedDoctor.email}</span>
                                </p>
                            </div>
                        </div>

                        {/* Doctor Credentials Details */}
                        <div className='grid grid-cols-2 gap-4 text-xs'>
                            <div className='p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1'>
                                <p className='text-slate-400 font-medium flex items-center gap-1.5'>
                                    <Award size={14} className='text-[#5F6FFF]' /> Degree & Qualification
                                </p>
                                <p className='font-bold text-slate-800 text-sm'>{selectedDoctor.degree || 'MBBS'}</p>
                            </div>

                            <div className='p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1'>
                                <p className='text-slate-400 font-medium flex items-center gap-1.5'>
                                    <Clock size={14} className='text-[#5F6FFF]' /> Experience
                                </p>
                                <p className='font-bold text-slate-800 text-sm'>{selectedDoctor.experience || '3 Years'}</p>
                            </div>

                            <div className='p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1'>
                                <p className='text-slate-400 font-medium flex items-center gap-1.5'>
                                    <DollarSign size={14} className='text-green-600' /> Consultation Fee
                                </p>
                                <p className='font-extrabold text-slate-900 text-sm'>${selectedDoctor.fees} / visit</p>
                            </div>

                            <div className='p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1'>
                                <p className='text-slate-400 font-medium flex items-center gap-1.5'>
                                    <ShieldCheck size={14} className='text-green-600' /> Booking Status
                                </p>
                                <p className={`font-bold text-sm ${selectedDoctor.available !== false ? 'text-green-600' : 'text-slate-400'}`}>
                                    {selectedDoctor.available !== false ? 'Active & Available' : 'Offline'}
                                </p>
                            </div>
                        </div>

                        {/* Address & About */}
                        <div className='space-y-3 text-xs'>
                            <div>
                                <p className='font-bold text-slate-800 mb-1 flex items-center gap-1.5'>
                                    <MapPin size={14} className='text-rose-500' /> Clinic Address
                                </p>
                                <p className='text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium'>
                                    {selectedDoctor.address?.line1 || '17th Cross, Richmond'}, {selectedDoctor.address?.line2 || 'Circle, Ring Road'}
                                </p>
                            </div>

                            <div>
                                <p className='font-bold text-slate-800 mb-1 flex items-center gap-1.5'>
                                    <Stethoscope size={14} className='text-[#5F6FFF]' /> Professional Overview
                                </p>
                                <p className='text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed'>
                                    {selectedDoctor.about || 'Dedicated specialist committed to delivering comprehensive medical care, early diagnosis, and effective treatment strategies.'}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className='pt-2 flex justify-end'>
                            <button
                                onClick={() => setSelectedDoctor(null)}
                                className='px-6 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-all shadow-sm cursor-pointer'
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorsList