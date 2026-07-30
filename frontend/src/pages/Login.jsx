import React, { useState } from 'react'
import { Arrowleft, ArrowRight, Lock, Mail, Sparkle, User } from 'lucide-react';

const Login = ({
    onBackToHome,
    onNavigateToRegister,
    onNavigateToForgotPassword,
}) => {

    const [isActive, setIsActive] = useState(false);

    // Form states
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        alert(`Sigining in as ${signInEmail}`);
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        alert(`Create account for ${signUpName} (${signUpEmail})`);
    }

    return (
        <div className='min-h-screen bg-slate-950 flex items-center justify center p-4 relative overflow-hidden font-sans'>

            {/* Dynamic Amibent Glows */}
            <div className='absolute top-1/4 left-1/4 w-96 bg-brand-600/20 rounded-full blur-[120px] pointer-events-none' />
            <div className='absolute bottom-1/4 right-1/4 w-96 bg-rose-500/20 rounded-full blur-[120px] pointer-events-none' />

            {/* Back to Home Button */}
            {onBackToHome && (
                <button
                    onClick={onBackToHome}
                    className='absolute top-6 left-6 z-50 flex-items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white glass-card px-4 py-2 rounded-xl transition-all'
                >
                    <Arrowleft className="w-4 h-4" />
                    <span>Back to Home</span>
                </button>
            )}

            {/* Main Container */}
            <div
                className={`relative bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-[30px] shadow-2xl shadow-rose-950/20 overflow-hidden w-full max-w-[768px] min-h-[480px] transition-all duration-700 ease-in-out`}
            >
                {/* Sign Up Form Container */}
                <div className={`absolute top-0 left-0 h-full w-full sm:w-1/2 transition-all duration-700 ease-in-out ${isActive
                    ? 'sm:translate-x-full opacity-100 z-10 animate-fade-in'
                    : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                    <form
                        onClick={handleSignUpSubmit}
                        className='bg-slate-900/95 flex flex-col items-center justify-center px-8 sm:px-10 h-full text-center space-y-4'
                    >
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center shadow-md'>
                                <Sparkle className='w-4 h-4 text-white' />
                            </div>
                            <h1 className='font-serif text-2xl sm:text-3xl font-bold text-white'>Create Account</h1>
                        </div>

                        {/* Social Icons */}
                        <div className='flex items-center gap-3 my-2'>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='Google'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.973 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='Facebook'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='GitHub'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='LinkedIn'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                </svg>
                            </a>
                        </div>

                        <span className='text-xs text-slate-400'>or use your email for register</span>
                        <div className='w-full space-y-3 pt-2'>
                            <div className='relative'>
                                <User className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={signUpName}
                                    onChange={(e) => setSignUpName(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors'
                                />
                            </div>
                            <div className='relative'>
                                <Mail className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors'
                                />
                            </div>
                            <div className='relative'>
                                <Lock className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full py-3 mt-3 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] transition-all uppercase tracking-wider'
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
                        onClick={handleSignInSubmit}
                        className='bg-slate-900/95 flex flex-col items-center justify-center px-8 sm:px-10 h-full text-center space-y-4'
                    >
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center shadow-md'>
                                <Sparkle className='w-4 h-4 text-white' />
                            </div>
                            <h1 className='font-serif text-2xl sm:text-3xl font-bold text-white'>Sign In</h1>
                        </div>

                        {/* Social Icons */}
                        <div className='flex items-center gap-3 my-2'>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='Google'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.973 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='Facebook'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='GitHub'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                                </svg>
                            </a>
                            <a
                                href='#'
                                className='w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-500 flex-items-center justify-center text-slate-300 hover:text-white transition-all hover:scale-105'
                                title='LinkedIn'
                            >
                                <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                </svg>
                            </a>
                        </div>

                        <span className='text-xs text-slate-400'>or use your email for register</span>
                        <div className='w-full space-y-3 pt-2'>
                            <div className='relative'>
                                <Mail className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors'
                                />
                            </div>
                            <div className='relative'>
                                <Lock className='w-4 h-4 text-slate-400 absolute left-3.5 top-3' />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors'
                                />
                            </div>
                            <div className='text-right'>
                                <a
                                    href='#'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigateToForgotPassword?.();
                                    }}
                                    className='text-xs text-rose-400 hover:underline'
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type='submit'
                                className='w-full py-3 mt-3 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] transition-all uppercase tracking-wider'
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
                    {/* Sliding Gradient Overlay */}
                    <div className={`bg-gradient-to-br from-brand-600 via-rose-600 to-amber-600 text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out ${isActive
                        ? 'translate-x-1/2'
                        : 'translate-x-0'
                        }`}
                    >
                        {/* Toggle Left Panel (shown when Sign Up active -> allows switching back to Sign In) */}
                        <div
                            className={`absolute top-0 flex flex-col items-center justify-center px-8 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isActive
                                ? 'translate-x-0'
                                : '-translate-x-full'
                                }`}
                        >
                            <h1 className='font-serif text-3xl font-bold mb-2'>
                                Welcome Back!
                            </h1>
                            <p className='text-xs text-rose-100 leading-relaxed max-w-xs mb-6'>
                                Enter your personal details to unlock all of this web application features
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsActive(false)}
                                className='px-8 py-2.5 border-white rounded-xl font-semibold text-xs uppercase tracking-wider text-white hover:bg-white hover:text-rose-600 transition-all shadow-lg flex items-center gap-2 group'
                            >
                                <span>Sign In</span>
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>

                        {/* Toggle Right Panel (shown when Sign In active -> allows switching back to Sign Up) */}
                        <div
                            className={`absolute top-0 flex flex-col items-center justify-center px-8 text-center h-full w-1/2 transition-transform duration-700 ease-in-out ${isActive
                                ? 'translate-x-0'
                                : '-translate-x-full'
                                }`}
                        >
                            <h1 className='font-serif text-3xl font-bold mb-2'>
                                Hello, Friend!
                            </h1>
                            <p className='text-xs text-rose-100 leading-relaxed max-w-xs mb-6'>
                                Register with your personal details for join with us..
                            </p>
                            <button
                                type='button'
                                onClick={() => setIsActive(false)}
                                className='px-8 py-2.5 border-white rounded-xl font-semibold text-xs uppercase tracking-wider text-white hover:bg-white hover:text-rose-600 transition-all shadow-lg flex items-center gap-2 group'
                            >
                                <span>Sign Up</span>
                                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Toggle Bar (For small screens where sliding panel is hidden) */}
                <div className='sm:hidden bg-slate-800/90 border-t border-slate-700 p-4 text-center'>
                    {isActive ? (
                        <p className='text-xs text-slate-300'>
                            Already have an account? {' '}
                            <button
                                onClick={() => setIsActive(false)}
                                className='text-rose-400 font-bold hover:underline'
                            >
                                Sign In
                            </button>
                        </p>
                    ) : (
                        <p className='text-xs text-slate-300'>
                            Don't have an account? {' '}
                            <button
                                onClick={() => setIsActive(true)}
                                className='text-rose-400 font-bold hover:underline'
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

export default Login