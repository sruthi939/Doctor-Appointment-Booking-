import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
                about: profileData.about
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='m-5 w-full max-w-4xl'>
            <div className='flex flex-col sm:flex-row gap-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm'>
                <div className='w-40 h-40 rounded-2xl overflow-hidden bg-indigo-50 border border-slate-200 shrink-0'>
                    <img className='w-full h-full object-cover' src={profileData.image} alt={profileData.name} />
                </div>

                <div className='flex-1 flex flex-col gap-3 text-slate-600'>
                    <div>
                        <p className='text-2xl font-bold text-slate-800'>{profileData.name}</p>
                        <div className='flex items-center gap-2 mt-1'>
                            <p className='text-sm font-medium text-slate-600'>{profileData.degree} - {profileData.speciality}</p>
                            <span className='border border-slate-300 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium'>{profileData.experience}</span>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <p className='text-sm font-semibold text-slate-700'>About:</p>
                        {isEdit ? (
                            <textarea 
                                className='w-full border border-slate-200 rounded-xl p-3 text-sm mt-1 outline-[#5F6FFF]'
                                rows={3}
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                value={profileData.about}
                            />
                        ) : (
                            <p className='text-xs text-slate-500 mt-1 leading-relaxed'>{profileData.about}</p>
                        )}
                    </div>

                    <div className='flex items-center gap-2 mt-1'>
                        <p className='text-sm font-semibold text-slate-700'>Appointment Fee:</p>
                        <span className='text-slate-800 font-bold text-sm'>
                            {currency || '$'}{isEdit ? (
                                <input 
                                    type="number" 
                                    className='border border-slate-200 rounded px-2 py-0.5 text-sm w-24 outline-[#5F6FFF]'
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                    value={profileData.fees}
                                />
                            ) : profileData.fees}
                        </span>
                    </div>

                    <div className='mt-2'>
                        <p className='text-sm font-semibold text-slate-700'>Address:</p>
                        <p className='text-xs text-slate-500 mt-1'>
                            {isEdit ? (
                                <span className='flex flex-col gap-1'>
                                    <input type="text" className='border border-slate-200 rounded px-2 py-1 text-xs' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address?.line1 || ''} />
                                    <input type="text" className='border border-slate-200 rounded px-2 py-1 text-xs' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address?.line2 || ''} />
                                </span>
                            ) : (
                                `${profileData.address?.line1 || ''}, ${profileData.address?.line2 || ''}`
                            )}
                        </p>
                    </div>

                    <div className='flex items-center gap-2 mt-2'>
                        <input 
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                            type="checkbox" 
                            checked={profileData.available} 
                            disabled={!isEdit}
                            className='w-4 h-4 accent-[#5F6FFF] cursor-pointer'
                        />
                        <label className='text-xs font-semibold text-slate-700 cursor-pointer'>Available for appointments</label>
                    </div>

                    <div className='mt-4'>
                        {isEdit ? (
                            <button onClick={updateProfile} className='bg-[#5F6FFF] hover:bg-indigo-600 text-white text-xs px-6 py-2 rounded-full font-medium transition-all cursor-pointer shadow-sm'>
                                Save Information
                            </button>
                        ) : (
                            <button onClick={() => setIsEdit(true)} className='border border-[#5F6FFF] text-[#5F6FFF] hover:bg-indigo-50 text-xs px-6 py-2 rounded-full font-medium transition-all cursor-pointer'>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
