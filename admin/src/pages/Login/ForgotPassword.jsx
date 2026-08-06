import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { forgotPassword } from '../../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setSubmitted(true);
    };

    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-left font-sans'>
            <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-5 shadow-2xl backdrop-blur-xl'>
                <h1 className='text-2xl font-extrabold text-white'>Forgot Password</h1>
                <p className='text-slate-400 text-xs'>Enter your admin email address to receive password reset instructions.</p>

                {submitted ? (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <CheckCircle2 size={18} /> Password reset link dispatched to {email}.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='space-y-4 text-xs'>
                        <div>
                            <label className='block text-slate-300 font-semibold mb-1'>Admin Email</label>
                            <input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='admin@medicare.com'
                                className='w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white'
                            />
                        </div>
                        <button type='submit' className='w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl shadow-lg cursor-pointer uppercase tracking-wider'>
                            Send Reset Link
                        </button>
                    </form>
                )}

                <Link to='/admin/login' className='inline-flex items-center gap-2 text-xs text-purple-400 font-bold hover:underline pt-2'>
                    <ArrowLeft size={14} /> Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
