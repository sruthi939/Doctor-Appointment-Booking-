import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
            if (data.success) {
                setAToken(data.token)
                localStorage.setItem('aToken', data.token)
                toast.success('Welcome to Admin Portal!')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-[#F8F9FD] p-4'>
            <div className='bg-white border border-slate-200 shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md text-slate-600 text-left space-y-6'>
                <div className='text-center space-y-2'>
                    <div className='w-16 h-16 bg-blue-50 text-[#5F6FFF] rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm'>
                        <ShieldCheck size={36} />
                    </div>
                    <p className='text-2xl font-extrabold text-slate-900'>Admin Portal Login</p>
                    <p className='text-xs text-slate-500'>
                        Enter authorized administrator credentials to access system management.
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-4'>
                    <div>
                        <label className='block text-xs font-bold text-slate-700 mb-1'>Admin Email</label>
                        <div className='relative'>
                            <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='admin@gmail.com'
                                required
                                className='w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#5F6FFF]'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-bold text-slate-700 mb-1'>Password</label>
                        <div className='relative'>
                            <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='••••••••'
                                required
                                className='w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#5F6FFF]'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2'
                    >
                        {loading ? 'Authenticating Admin...' : 'Login to Admin Panel'}
                    </button>
                </form>

                <div className='p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-[11px] text-slate-500 leading-relaxed text-center'>
                    <p className='font-bold text-slate-700'>Staff Member?</p>
                    <p className='mt-0.5'>Doctors, Accountants & Receptionists sign in directly through the main application portal.</p>
                </div>
            </div>
        </div>
    )
}

export default Login