import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { doctorLogin } from '../../services/doctorService';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        const res = await doctorLogin(email, password);
        setLoading(false);
        if (res.success) {
            navigate('/doctor/dashboard');
        } else {
            setErrorMessage(res.message || 'Login failed. Please verify doctor credentials.');
        }
    };

    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden font-sans text-left'>
            {/* Ambient Background Glows */}
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none' />

            <button
                onClick={() => navigate('/')}
                className='absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer'
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Patient Site</span>
            </button>

            <div className='relative bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl max-w-md w-full space-y-6'>
                <div className='text-center space-y-2'>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25'>
                        <Stethoscope size={28} className='text-white' />
                    </div>
                    <h1 className='text-2xl font-extrabold text-white'>Doctor Portal Login</h1>
                    <p className='text-slate-400 text-xs'>
                        Access your clinical schedule, appointments & patient charts.
                    </p>
                </div>

                {errorMessage && (
                    <div className='p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2'>
                        <AlertCircle size={16} className='shrink-0' />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                            <Mail size={14} className='text-slate-400' /> Doctor Email Address
                        </label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='richard@medicare.com'
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
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
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
                        />
                    </div>

                    <div className='flex items-center justify-between text-xs text-slate-400'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                            <input type='checkbox' defaultChecked className='rounded text-pink-500 bg-slate-950 border-slate-700' />
                            <span>Remember me</span>
                        </label>
                        <a href='#forgot' className='hover:text-pink-400 transition-colors'>Forgot Password?</a>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer'
                    >
                        {loading ? 'Logging in...' : 'Login to Doctor Portal'}
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorLogin;
