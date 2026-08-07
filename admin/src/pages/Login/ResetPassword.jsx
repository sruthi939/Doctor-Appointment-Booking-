import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) return alert('Passwords do not match');
        await resetPassword('token', password);
        setSubmitted(true);
        setTimeout(() => navigate('/admin/login'), 1500);
    };

    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-left font-sans'>
            <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-5 shadow-2xl backdrop-blur-xl'>
                <h1 className='text-2xl font-extrabold text-white'>Reset Password</h1>
                <p className='text-slate-400 text-xs'>Create a new strong password for your admin account.</p>

                {submitted ? (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <CheckCircle2 size={18} /> Password updated successfully! Redirecting...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='space-y-4 text-xs'>
                        <div>
                            <label className='block text-slate-300 font-semibold mb-1'>New Password</label>
                            <input
                                type='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='••••••••'
                                className='w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white'
                            />
                        </div>
                        <div>
                            <label className='block text-slate-300 font-semibold mb-1'>Confirm New Password</label>
                            <input
                                type='password'
                                required
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder='••••••••'
                                className='w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white'
                            />
                        </div>
                        <button type='submit' className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-lg cursor-pointer uppercase tracking-wider'>
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
