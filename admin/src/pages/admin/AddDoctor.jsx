import React, { useContext, useState } from 'react'
import { Upload, User } from 'lucide-react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.append('about', about)

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setDegree('')
                setAbout('')
                setFees('')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-semibold text-slate-800'>Add Doctor</p>

            <div className='bg-white px-8 py-8 border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-sm'>
                {/* Upload Image Section */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor='doc-img' className='cursor-pointer flex items-center justify-center border-2 border-dashed border-slate-300 rounded-full w-24 h-24 bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden'>
                        {docImg ? (
                            <img className='w-full h-full object-cover' src={URL.createObjectURL(docImg)} alt="doctor preview" />
                        ) : (
                            <div className='flex flex-col items-center gap-1 text-slate-400'>
                                <Upload className='w-6 h-6' />
                                <span className='text-[10px] font-medium'>Upload</span>
                            </div>
                        )}
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                    <div>
                        <p className='text-slate-700 font-medium text-sm'>Upload doctor picture</p>
                        <p className='text-slate-400 text-xs mt-0.5'>Allowed file types: JPG, PNG, WEBP</p>
                    </div>
                </div>

                {/* Form Fields Grid */}
                <div className='flex flex-col lg:flex-row items-start gap-10 text-slate-600'>
                    {/* Left Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="text" placeholder="Name" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="email" placeholder="Email" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="password" placeholder="Password" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm bg-white'>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="number" placeholder="Consultation fees" required />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm bg-white'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Education / Degree</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="text" placeholder="Education (e.g. MBBS, MD)" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-700'>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm mb-2' type="text" placeholder="Address line 1" required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border border-slate-200 rounded-xl px-3 py-2 outline-[#5F6FFF] text-sm' type="text" placeholder="Address line 2" required />
                        </div>
                    </div>
                </div>

                {/* About Doctor Textarea */}
                <div className='flex-1 flex flex-col gap-1 mt-6 text-slate-600'>
                    <p className='text-sm font-medium text-slate-700'>About Doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border border-slate-200 rounded-xl px-4 py-3 outline-[#5F6FFF] text-sm' placeholder="Write about doctor's bio and background" rows={4} required />
                </div>

                {/* Submit Button */}
                <button type="submit" className='bg-[#5F6FFF] hover:bg-indigo-600 px-10 py-3 mt-6 text-white rounded-full transition-all cursor-pointer font-medium text-sm shadow-sm'>
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor