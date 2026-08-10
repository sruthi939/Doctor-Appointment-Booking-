import React from 'react';
import { assets } from '../assets/assets';
import { ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

const About = () => {
    return (
        <div className='space-y-12 my-6 text-left'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900'>
                    ABOUT <span className='text-[#5F6FFF]'>US</span>
                </h1>
                <p className='text-slate-500 text-xs sm:text-sm max-w-xl mx-auto'>
                    Transforming healthcare management through seamless online appointment bookings and verified specialist care.
                </p>
            </div>

            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center gap-10'>
                <img
                    className='w-full md:w-80 rounded-2xl border border-slate-200 object-cover shadow-xs'
                    src={assets.about_image}
                    alt='About Medicare'
                />
                <div className='flex flex-col justify-center gap-4 md:w-2/3 text-xs sm:text-sm text-slate-700 leading-relaxed'>
                    <p>
                        Welcome to <strong className='text-slate-900'>MediCare Doctor Appointment Booking System</strong>, your trusted platform for managing healthcare needs conveniently and efficiently. We understand the challenges patients face when scheduling visits and coordinating with top medical specialists.
                    </p>
                    <p>
                        We are committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating state-of-the-art scheduling, instant confirmation, and secure patient portals to support you at every step.
                    </p>
                    <div className='p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-1'>
                        <h3 className='text-[#5F6FFF] font-bold text-sm uppercase tracking-wider'>Our Vision</h3>
                        <p className='text-slate-600 text-xs'>
                            To bridge the gap between patients and medical professionals worldwide through intelligent digital workflows and hassle-free care.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-slate-900 text-center sm:text-left'>
                    WHY <span className='text-[#5F6FFF]'>CHOOSE US</span>
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-white border border-slate-200 p-6 rounded-3xl space-y-3 hover:border-blue-300 hover:shadow-md transition-all group shadow-xs'>
                        <div className='w-12 h-12 bg-blue-50 text-[#5F6FFF] rounded-2xl flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform'>
                            <Zap size={24} />
                        </div>
                        <h3 className='text-slate-900 font-bold text-base'>Efficiency</h3>
                        <p className='text-slate-500 text-xs leading-relaxed'>
                            Streamlined appointment scheduling that fits effortlessly into your daily routine.
                        </p>
                    </div>

                    <div className='bg-white border border-slate-200 p-6 rounded-3xl space-y-3 hover:border-blue-300 hover:shadow-md transition-all group shadow-xs'>
                        <div className='w-12 h-12 bg-blue-50 text-[#5F6FFF] rounded-2xl flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform'>
                            <HeartHandshake size={24} />
                        </div>
                        <h3 className='text-slate-900 font-bold text-base'>Convenience</h3>
                        <p className='text-slate-500 text-xs leading-relaxed'>
                            Instant access to a wide network of verified medical professionals in your area.
                        </p>
                    </div>

                    <div className='bg-white border border-slate-200 p-6 rounded-3xl space-y-3 hover:border-blue-300 hover:shadow-md transition-all group shadow-xs'>
                        <div className='w-12 h-12 bg-blue-50 text-[#5F6FFF] rounded-2xl flex items-center justify-center border border-blue-200 group-hover:scale-105 transition-transform'>
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className='text-slate-900 font-bold text-base'>Personalization</h3>
                        <p className='text-slate-500 text-xs leading-relaxed'>
                            Tailored booking reminders and consultation tracking to keep your health on point.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;