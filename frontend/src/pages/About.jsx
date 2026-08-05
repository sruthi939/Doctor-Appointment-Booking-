import React from 'react';
import { assets } from '../assets/assets';
import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

const About = () => {
    return (
        <div className='space-y-12 my-6 text-left'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-white'>
                    ABOUT <span className='bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent'>US</span>
                </h1>
                <p className='text-slate-400 text-xs sm:text-sm max-w-xl mx-auto'>
                    Transforming healthcare management through seamless online appointment bookings and verified specialist care.
                </p>
            </div>

            <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-10'>
                <img
                    className='w-full md:w-80 rounded-2xl border border-slate-700 object-cover shadow-xl'
                    src={assets.about_image}
                    alt='About Medicare'
                />
                <div className='flex flex-col justify-center gap-4 md:w-2/3 text-xs sm:text-sm text-slate-300 leading-relaxed'>
                    <p>
                        Welcome to <strong className='text-white'>MediCare Doctor Appointment Booking System</strong>, your trusted platform for managing healthcare needs conveniently and efficiently. We understand the challenges patients face when scheduling visits and coordinating with top medical specialists.
                    </p>
                    <p>
                        We are committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating state-of-the-art scheduling, instant confirmation, and secure patient portals to support you at every step.
                    </p>
                    <div className='p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1'>
                        <h3 className='text-pink-400 font-bold text-sm uppercase tracking-wider'>Our Vision</h3>
                        <p className='text-slate-400 text-xs'>
                            To bridge the gap between patients and medical professionals worldwide through intelligent digital workflows and hassle-free care.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-white text-center sm:text-left'>
                    WHY <span className='text-pink-400'>CHOOSE US</span>
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-3 hover:border-pink-500/50 transition-all group'>
                        <div className='w-12 h-12 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center border border-pink-500/20 group-hover:scale-110 transition-transform'>
                            <Zap size={24} />
                        </div>
                        <h3 className='text-white font-bold text-base'>Efficiency</h3>
                        <p className='text-slate-400 text-xs leading-relaxed'>
                            Streamlined appointment scheduling that fits effortlessly into your daily routine.
                        </p>
                    </div>

                    <div className='bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-3 hover:border-indigo-500/50 transition-all group'>
                        <div className='w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform'>
                            <HeartHandshake size={24} />
                        </div>
                        <h3 className='text-white font-bold text-base'>Convenience</h3>
                        <p className='text-slate-400 text-xs leading-relaxed'>
                            Instant access to a wide network of verified medical professionals in your area.
                        </p>
                    </div>

                    <div className='bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md space-y-3 hover:border-emerald-500/50 transition-all group'>
                        <div className='w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform'>
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className='text-white font-bold text-base'>Personalization</h3>
                        <p className='text-slate-400 text-xs leading-relaxed'>
                            Tailored booking reminders and consultation tracking to keep your health on point.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;