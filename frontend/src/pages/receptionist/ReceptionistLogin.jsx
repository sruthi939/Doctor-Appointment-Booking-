import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { receptionistLogin } from '../../services/receptionistService';

const ReceptionistLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('olivia.smith@example.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await receptionistLogin(email, password);
        setLoading(false);
        if (res.success) {
            navigate('/receptionist/dashboard');
        }
    };

    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden font-sans text-left'>
            {/* Ambient Background Glows */}
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none' />

            <button
                onClick={() => navigate('/')}
                className='absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer'
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Patient Site</span>
            </button>

            <div className='relative bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl max-w-md w-full space-y-6'>
                <div className='text-center space-y-2'>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25 text-white'>
                        <ClipboardList size={28} />
                    </div>
                    <h1 className='text-2xl font-extrabold text-white'>Receptionist Portal</h1>
                    <p className='text-slate-400 text-xs'>
                        Sign in to manage clinic walk-ins, daily queue & appointments.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                            <Mail size={14} className='text-slate-400' /> Email Address
                        </label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='olivia.smith@example.com'
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                            <Lock size={14} className='text-slate-400' /> Password
                        </label>
                        <input
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500'
                        />
                    </div>

                    <div className='flex items-center justify-between text-xs text-slate-400'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input type='checkbox' defaultChecked className='rounded text-rose-500 bg-slate-950 border-slate-700' />
                            <span>Remember me</span>
                        </label>
                        <a href='#forgot' className='hover:text-rose-400 transition-colors'>Forgot Password?</a>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer'
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReceptionistLogin;
