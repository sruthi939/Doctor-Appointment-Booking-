import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Calculator, Plus, Mail, Lock, User, Phone, Briefcase } from 'lucide-react'

const AccountantsList = () => {
    const { accountants, aToken, getAllAccountants, backendUrl } = useContext(AdminContext)
    const [showModal, setShowModal] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('Finance & Accounts')

    useEffect(() => {
        if (aToken) {
            getAllAccountants()
        }
    }, [aToken])

    const handleAddAccountant = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/add-accountant', {
                name, email, password, phone, department
            }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setShowModal(false)
                setName('')
                setEmail('')
                setPassword('')
                setPhone('')
                getAllAccountants()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='m-5 w-full max-w-6xl'>
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <h1 className='text-lg font-semibold text-slate-800'>Accountants List</h1>
                    <p className='text-xs text-slate-500'>Manage finance personnel and accounting credentials</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className='flex items-center gap-2 bg-[#5F6FFF] hover:bg-indigo-600 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm cursor-pointer'
                >
                    <Plus className='w-4 h-4' />
                    Add Accountant
                </button>
            </div>

            <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1.5fr] py-3.5 px-6 border-b border-slate-200 bg-slate-50 text-slate-600 font-medium text-sm'>
                    <p>#</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Department</p>
                </div>

                <div className='divide-y divide-slate-100 text-sm'>
                    {accountants && accountants.length > 0 ? (
                        accountants.map((item, index) => (
                            <div key={item._id || index} className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1.5fr_1.5fr] items-center px-6 py-4 hover:bg-slate-50/80 transition-all text-slate-600'>
                                <p className='max-sm:hidden font-medium text-slate-400'>{index + 1}</p>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200'>
                                        <Calculator className='w-4 h-4' />
                                    </div>
                                    <p className='font-semibold text-slate-800'>{item.name}</p>
                                </div>
                                <p className='text-slate-600 text-xs sm:text-sm'>{item.email}</p>
                                <p className='text-slate-500 text-xs sm:text-sm'>{item.phone || "0000000000"}</p>
                                <p className='text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block w-fit'>
                                    {item.department || "Finance & Accounts"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-12 text-slate-400 font-medium'>
                            No accountants registered yet.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Adding Accountant */}
            {showModal && (
                <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50'>
                    <div className='bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl text-slate-700'>
                        <h2 className='text-lg font-bold text-slate-800 mb-4'>Add New Accountant</h2>
                        <form onSubmit={handleAddAccountant} className='space-y-4'>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Name</label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-[#5F6FFF]' type="text" placeholder="Accountant Name" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Email</label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-[#5F6FFF]' type="email" placeholder="Email" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Password</label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-[#5F6FFF]' type="password" placeholder="Password" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Phone</label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-[#5F6FFF]' type="text" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Department</label>
                                <div className='relative'>
                                    <Briefcase className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setDepartment(e.target.value)} value={department} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-sm outline-[#5F6FFF]' type="text" placeholder="Department" />
                                </div>
                            </div>
                            <div className='flex justify-end gap-3 pt-4 border-t border-slate-100'>
                                <button type="button" onClick={() => setShowModal(false)} className='px-4 py-2 border border-slate-200 text-slate-600 text-xs rounded-xl hover:bg-slate-50 font-medium cursor-pointer'>Cancel</button>
                                <button type="submit" className='px-5 py-2 bg-[#5F6FFF] hover:bg-indigo-600 text-white text-xs rounded-xl font-medium cursor-pointer shadow-sm'>Save Accountant</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountantsList
