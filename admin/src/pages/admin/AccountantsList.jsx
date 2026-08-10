import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Calculator, Plus, Mail, Lock, User, Phone, Briefcase, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AccountantsList = () => {
    const navigate = useNavigate()
    const { accountants, aToken, getAllAccountants, backendUrl } = useContext(AdminContext)
    const [showModal, setShowModal] = useState(false)
    const [blockedStates, setBlockedStates] = useState({})

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

    const togglePaymentAccess = (accId) => {
        setBlockedStates(prev => {
            const isBlocked = !prev[accId];
            if (isBlocked) {
                toast.warning('Payment access restricted for accountant');
            } else {
                toast.success('Payment access granted for accountant');
            }
            return { ...prev, [accId]: isBlocked };
        });
    };

    return (
        <div className='m-5 w-full max-w-6xl text-left space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4'>
                <div>
                    <h1 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        <Calculator className='text-amber-500' size={24} />
                        Finance & Accountants Directory
                    </h1>
                    <p className='text-slate-500 text-xs mt-0.5'>
                        Manage finance personnel, set credentials, and control payment processing permissions.
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => navigate('/accountant-portal')}
                        className='flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer'
                    >
                        <ExternalLink size={14} /> Open Payments Desk
                    </button>
                    <button 
                        onClick={() => setShowModal(true)} 
                        className='flex items-center gap-2 bg-[#5F6FFF] hover:bg-indigo-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm cursor-pointer'
                    >
                        <Plus className='w-4 h-4' /> Add Accountant
                    </button>
                </div>
            </div>

            <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs'>
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1.5fr_1.5fr] py-3.5 px-6 border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider'>
                    <p>#</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Department</p>
                    <p className='text-center'>Payment Access</p>
                </div>

                <div className='divide-y divide-slate-100 text-xs'>
                    {accountants && accountants.length > 0 ? (
                        accountants.map((item, index) => {
                            const accId = item._id || index;
                            const isBlocked = blockedStates[accId];
                            return (
                                <div key={accId} className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1.5fr_1.5fr_1.5fr] items-center px-6 py-4 hover:bg-slate-50/80 transition-all text-slate-600'>
                                    <p className='max-sm:hidden font-bold text-slate-400'>{index + 1}</p>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-200 shrink-0'>
                                            <Calculator className='w-4 h-4' />
                                        </div>
                                        <p className='font-bold text-slate-900'>{item.name}</p>
                                    </div>
                                    <p className='text-slate-600 font-mono'>{item.email}</p>
                                    <p className='text-slate-500 font-mono'>{item.phone || "10-digit number"}</p>
                                    <p className='font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 inline-block w-fit'>
                                        {item.department || "Finance & Accounts"}
                                    </p>
                                    <div className='flex items-center justify-center gap-2'>
                                        <button
                                            onClick={() => togglePaymentAccess(accId)}
                                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] border flex items-center gap-1 cursor-pointer transition-all ${
                                                isBlocked 
                                                    ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                                            }`}
                                        >
                                            {isBlocked ? (
                                                <><ShieldAlert size={13} /> Blocked</>
                                            ) : (
                                                <><ShieldCheck size={13} /> Allowed</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='text-center py-12 text-slate-400 font-medium'>
                            No accountants registered yet in database.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Adding Accountant */}
            {showModal && (
                <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50'>
                    <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl text-slate-700 text-left space-y-4'>
                        <h2 className='text-lg font-bold text-slate-900'>Add New Accountant Account</h2>
                        <form onSubmit={handleAddAccountant} className='space-y-3.5'>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Name</label>
                                <div className='relative'>
                                    <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs outline-[#5F6FFF]' type="text" placeholder="Accountant Name" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Email</label>
                                <div className='relative'>
                                    <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs outline-[#5F6FFF]' type="email" placeholder="email@medicare.com" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Password</label>
                                <div className='relative'>
                                    <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs outline-[#5F6FFF]' type="password" placeholder="Set Password" required />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Phone</label>
                                <div className='relative'>
                                    <Phone className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs outline-[#5F6FFF]' type="text" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-slate-600 mb-1'>Department</label>
                                <div className='relative'>
                                    <Briefcase className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                                    <input onChange={(e) => setDepartment(e.target.value)} value={department} className='w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs outline-[#5F6FFF]' type="text" placeholder="Department" />
                                </div>
                            </div>
                            <div className='flex justify-end gap-3 pt-4 border-t border-slate-100'>
                                <button type="button" onClick={() => setShowModal(false)} className='px-4 py-2 border border-slate-200 text-slate-600 text-xs rounded-xl hover:bg-slate-50 font-medium cursor-pointer'>Cancel</button>
                                <button type="submit" className='px-5 py-2 bg-[#5F6FFF] hover:bg-indigo-600 text-white text-xs rounded-xl font-bold cursor-pointer shadow-sm'>Save Accountant</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountantsList
