import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    setAToken(data.token)
                    localStorage.setItem('aToken', data.token)
                    toast.success('Welcome, Admin!')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    setDToken(data.token)
                    localStorage.setItem('dToken', data.token)
                    toast.success('Welcome, Doctor!')
                } else {
                    toast.error(data.message)
                }
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
            <div className='bg-white border border-slate-200 shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md text-slate-600'>
                <div className='text-center mb-6'>
                    <p className='text-2xl font-bold text-[#5F6FFF]'>Medicare</p>
                    <p className='text-base font-semibold text-slate-800 mt-1'>
                        <span className='text-[#5F6FFF]'>{state}</span> Login
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-4'>
                    <div>
                        <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>Email</label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#5F6FFF] outline-none transition-all'
                                type='email'
                                placeholder='Email'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>Password</label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className='w-full border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:border-[#5F6FFF] outline-none transition-all'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                            >
                                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-sm text-sm disabled:opacity-50'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className='text-center mt-5 text-sm text-slate-500'>
                    {state === 'Admin' ? (
                        <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-[#5F6FFF] underline cursor-pointer font-medium'>Click here</span></p>
                    ) : (
                        <p>Admin Login? <span onClick={() => setState('Admin')} className='text-[#5F6FFF] underline cursor-pointer font-medium'>Click here</span></p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login