import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        const res = await login(email, password);
        setLoading(false);
        if (res.success) {
            navigate('/admin/dashboard');
        } else {
            setErrorMsg(res.message || 'Admin login failed');
        }
    };

    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden font-sans text-left'>
            <div className='relative bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl max-w-md w-full space-y-6'>
                <div className='text-center space-y-2'>
                    <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25 text-white'>
                        <ShieldCheck size={28} />
                    </div>
                    <h1 className='text-2xl font-extrabold text-white'>MediCare Admin</h1>
                    <p className='text-slate-400 text-xs'>
                        Sign in to access admin panel workflow.
                    </p>
                </div>

                {errorMsg && (
                    <div className='p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold rounded-xl'>
                        {errorMsg}
                    </div>
                )}

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
                            placeholder='admin@medicare.com'
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500'
                        />
                    </div>

                    <div>
                        <div className='flex items-center justify-between mb-1'>
                            <label className='text-xs font-medium text-slate-300 flex items-center gap-1.5'>
                                <Lock size={14} className='text-slate-400' /> Password
                            </label>
                            <Link to='/admin/forgot-password' className='text-[11px] text-purple-400 hover:underline'>Forgot Password?</Link>
                        </div>
                        <input
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
