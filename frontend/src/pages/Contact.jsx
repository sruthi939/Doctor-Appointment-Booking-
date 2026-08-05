import React from 'react';
import { assets } from '../assets/assets';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const Contact = () => {
    return (
        <div className='space-y-8 my-6 text-left animate-in fade-in duration-300'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-white'>
                    CONTACT <span className='bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent'>US</span>
                </h1>
                <p className='text-slate-400 text-xs sm:text-sm max-w-xl mx-auto'>
                    Have questions about appointment booking, payments, or doctor schedules? We're here to help 24/7.
                </p>
            </div>

            <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto'>
                <img
                    className='w-full md:w-80 rounded-2xl border border-slate-700 object-cover shadow-xl'
                    src={assets.contact_image}
                    alt='Contact Medicare'
                />

                <div className='flex-1 space-y-6 text-xs sm:text-sm text-slate-300'>
                    <div className='space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800'>
                        <h2 className='font-bold text-base text-white flex items-center gap-2'>
                            <MapPin size={18} className='text-pink-400' />
                            OUR HEAD OFFICE
                        </h2>
                        <p className='text-slate-400 leading-relaxed'>
                            54709 Near Bus Stand, Ring Road <br />
                            Trivandrum City, Kerala 695001
                        </p>
                        <div className='pt-2 border-t border-slate-800/80 space-y-1 text-xs'>
                            <p className='flex items-center gap-2 text-slate-300'>
                                <Phone size={14} className='text-indigo-400' /> Tel: 0471-8236547
                            </p>
                            <p className='flex items-center gap-2 text-slate-300'>
                                <Mail size={14} className='text-indigo-400' /> Email: support@medicare-booking.com
                            </p>
                        </div>
                    </div>

                    <div className='space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800'>
                        <h2 className='font-bold text-base text-white flex items-center gap-2'>
                            <Briefcase size={18} className='text-emerald-400' />
                            CAREERS AT MEDICARE
                        </h2>
                        <p className='text-slate-400 leading-relaxed'>
                            Interested in joining our healthcare technology team or registering as a healthcare provider?
                        </p>
                        <button className='px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-pink-500/20 cursor-pointer'>
                            Explore Open Roles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;