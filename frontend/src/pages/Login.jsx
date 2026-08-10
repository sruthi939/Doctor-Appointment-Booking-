import React, { useState, useContext } from 'react';
import { ArrowLeft, ArrowRight, Lock, Mail, Sparkle, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = ({
    onBackToHome,
    onNavigateToRegister,
    onNavigateToForgotPassword,
}) => {
    const { setToken, setUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Form states
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const res = await api.post('/auth/login', { email: signInEmail, password: signInPassword });
            if (res.data?.success) {
                setToken(res.data.token);
                setUserData(res.data);
                navigate('/');
            } else {
                setErrorMessage(res.data?.message || "Invalid credentials");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed. Please check credentials.");
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const res = await api.post('/auth/register', { name: signUpName, email: signUpEmail, password: signUpPassword });
            if (res.data?.success) {
                setToken(res.data.token);
                setUserData(res.data);
                navigate('/');
            } else {
                setErrorMessage(res.data?.message || "Registration failed");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Sign up failed. User may already exist.");
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans bg-[#F8F9FD]'>

            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                className='absolute top-6 left-6 z-50 flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer'
            >
                <ArrowLeft className="w-4 h-4 text-[#5F6FFF]" />
                <span>Back to Home</span>
            </button>

            {/* Main Container */}
            <div
                className={`relative bg-white border border-slate-200 rounded-[30px] shadow-xl overflow-hidden w-full max-w-[768px] min-h-[480px] transition-all duration-700 ease-in-out`}
            >
                {/* Sign Up Form Container */}
                <div className={`absolute top-0 left-0 h-full w-full sm:w-1/2 transition-all duration-700 ease-in-out ${isActive
                    ? 'sm:translate-x-full opacity-100 z-10 animate-fade-in'
                    : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                    <form
                        onSubmit={handleSignUpSubmit}
                        className='bg-white flex flex-col items-center justify-center px-8 sm:px-10 h-full text-center space-y-4'
                    >
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-blue-50 text-[#5F6FFF] flex items-center justify-center shadow-xs border border-blue-200'>
                                <Sparkle className='w-4 h-4 text-[#5F6FFF]' />
                            </div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Create Account</h1>
                        </div>

                        {errorMessage && (
                            <p className='text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1 rounded-md border border-rose-200'>
                                {errorMessage}
                            </p>
                        )}

                        <div className='w-full space-y-3 pt-2'>
                            <div className='relative'>
                                <User className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={signUpName}
                                    onChange={(e) => setSignUpName(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5F6FFF] transition-colors'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <Mail className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5F6FFF] transition-colors'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <Lock className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5F6FFF] transition-colors'
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full py-3 mt-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 uppercase tracking-wider shadow-sm cursor-pointer'
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sign In Form Container */}
                <div className={`absolute top-0 left-0 h-full w-full sm:w-1/2 transition-all duration-700 ease-in-out ${isActive
                    ? 'sm:translate-x-full opacity-0 z-0 pointer-events-none'
                    : 'opacity-100 z-10'
                    }`}
                >
                    <form
                        onSubmit={handleSignInSubmit}
                        className='bg-white flex flex-col items-center justify-center px-8 sm:px-10 h-full text-center space-y-4'
                    >
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-blue-50 text-[#5F6FFF] flex items-center justify-center shadow-xs border border-blue-200'>
                                <Sparkle className='w-4 h-4 text-[#5F6FFF]' />
                            </div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Sign In</h1>
                        </div>

                        {errorMessage && (
                            <p className='text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1 rounded-md border border-rose-200'>
                                {errorMessage}
                            </p>
                        )}

                        <div className='w-full space-y-3 pt-2'>
                            <div className='relative'>
                                <Mail className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5F6FFF] transition-colors'
                                    required
                                />
                            </div>
                            <div className='relative'>
                                <Lock className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5F6FFF] transition-colors'
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full py-3 mt-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 uppercase tracking-wider shadow-sm cursor-pointer'
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sliding Toggle Panel Container */}
                <div
                    className={`hidden sm:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-30 ${isActive
                        ? '-translate-x-full rounded-r-[150px] rounded-l-none'
                        : 'rounded-l-[150px] rounded-r-none'
                        }`}
                >
                    {/* Sliding Blue Overlay */}
                    <div className={`bg-[#5F6FFF] text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${isActive
                        ? 'translate-x-1/2'
                        : 'translate-x-0'
                        }`}
                    >
                        {/* Toggle Left Panel (Sign In mode) */}
                        <div
                            className={`absolute top-0 flex flex-col items-center justify-center px-8 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isActive
                                ? 'translate-x-0'
                                : '-translate-x-full'
                                }`}
                        >
                            <h1 className='text-3xl font-extrabold mb-2'>
                                Welcome Back!
                            </h1>
                            <p className='text-xs text-blue-100 leading-relaxed max-w-xs mb-6'>
                                Enter your credentials to access your appointments and patient profile.
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsActive(false)}
                                className='px-8 py-2.5 bg-white text-[#5F6FFF] border border-white rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-blue-50 transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group'
                            >
                                <span>Sign In</span>
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Toggle Right Panel (Sign Up mode) */}
                        <div
                            className={`absolute top-0 right-0 flex flex-col items-center justify-center px-8 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isActive
                                ? 'translate-x-full'
                                : 'translate-x-0'
                                }`}
                        >
                            <h1 className='text-3xl font-extrabold mb-2'>
                                Hello, Friend!
                            </h1>
                            <p className='text-xs text-blue-100 leading-relaxed max-w-xs mb-6'>
                                Create your account to start booking appointments with top doctors.
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsActive(true)}
                                className='px-8 py-2.5 bg-white text-[#5F6FFF] border border-white rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-blue-50 transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group'
                            >
                                <span>Sign Up</span>
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle Bar */}
                <div className='sm:hidden bg-slate-50 border-t border-slate-200 p-4 text-center'>
                    {isActive ? (
                        <p className='text-xs text-slate-600'>
                            Already have an account? {' '}
                            <button
                                onClick={() => setIsActive(false)}
                                className='text-[#5F6FFF] font-bold hover:underline'
                            >
                                Sign In
                            </button>
                        </p>
                    ) : (
                        <p className='text-xs text-slate-600'>
                            Don't have an account? {' '}
                            <button
                                onClick={() => setIsActive(true)}
                                className='text-[#5F6FFF] font-bold hover:underline'
                            >
                                Sign Up
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;