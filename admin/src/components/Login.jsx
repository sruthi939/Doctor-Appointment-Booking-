import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(backendUrl + '/api/auth/login', { email, password })

            if (response.data.success) {
                if (response.data.user.role === 'admin') {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    toast.success('Welcome, Admin!')
                } else {
                    toast.error('Access denied. Admin only.')
                }
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-black'>
            <div className='relative w-full max-w-md'>
                {/* Glow effect */}
                <div className='absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full'></div>
                <div className='absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37] opacity-10 blur-[80px] rounded-full'></div>

                <div className='backdrop-blur-xl bg-black/40 border border-[#D4AF37]/30 shadow-2xl rounded-2xl px-10 py-12 text-white relative z-10'>
                    <div className='text-center mb-10'>
                        <h1 className='text-4xl font-bold text-[#D4AF37] mb-2 tracking-tighter'>Medicare</h1>
                        <p className='text-gray-400 text-sm tracking-widest uppercase'>Admin Portal</p>
                    </div>

                    <form onSubmit={onSubmitHandler} className='space-y-6'>
                        <div>
                            <label htmlFor='admin-email' className='block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2'>Email Address</label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                                <input
                                    id='admin-email'
                                    name='email'
                                    autoComplete='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className='w-full bg-black/50 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all'
                                    type='email'
                                    placeholder='email'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='admin-password' className='block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' />
                                <input
                                    id='admin-password'
                                    name='password'
                                    autoComplete='current-password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className='w-full bg-black/50 border border-gray-800 rounded-lg pl-10 pr-10 py-3 text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37] transition-colors'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                </button>
                            </div>
                        </div>

                        <button
                            className='w-full py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#B8962E] transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin'></div>
                            ) : (
                                'SECURE LOGIN'
                            )}
                        </button>
                    </form>

                    <p className='text-center mt-8 text-xs text-gray-500'>
                        © 2026 Medicare • Authorized Personnel Only
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login