import React from 'react';
import { assets } from '../assets/assets';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const Contact = () => {
    return (
        <div className='space-y-8 my-6 text-left animate-in fade-in duration-300'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900'>
                    CONTACT <span className='text-[#5F6FFF]'>US</span>
                </h1>
                <p className='text-slate-500 text-xs sm:text-sm max-w-xl mx-auto'>
                    Have questions about appointment booking, payments, or doctor schedules? We're here to help 24/7.
                </p>
            </div>

            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto'>
                <img
                    className='w-full md:w-80 rounded-2xl border border-slate-200 object-cover shadow-xs'
                    src={assets.contact_image}
                    alt='Contact Medicare'
                />

                <div className='flex-1 space-y-6 text-xs sm:text-sm text-slate-700'>
                    <div className='space-y-3 bg-blue-50/60 p-5 rounded-2xl border border-blue-100'>
                        <h2 className='font-bold text-base text-slate-900 flex items-center gap-2'>
                            <MapPin size={18} className='text-[#5F6FFF]' />
                            OUR HEAD OFFICE
                        </h2>
                        <p className='text-slate-600 leading-relaxed'>
                            54709 Near Bus Stand, Ring Road <br />
                            Trivandrum City, Kerala 695001
                        </p>
                        <div className='pt-2 border-t border-blue-100 space-y-1 text-xs'>
                            <p className='flex items-center gap-2 text-slate-700'>
                                <Phone size={14} className='text-[#5F6FFF]' /> Tel: 0471-8236547
                            </p>
                            <p className='flex items-center gap-2 text-slate-700'>
                                <Mail size={14} className='text-[#5F6FFF]' /> Email: support@medicare-booking.com
                            </p>
                        </div>
                    </div>

                    <div className='space-y-3 bg-blue-50/60 p-5 rounded-2xl border border-blue-100'>
                        <h2 className='font-bold text-base text-slate-900 flex items-center gap-2'>
                            <Briefcase size={18} className='text-[#5F6FFF]' />
                            CAREERS AT MEDICARE
                        </h2>
                        <p className='text-slate-600 leading-relaxed'>
                            Interested in joining our healthcare technology team or registering as a healthcare provider?
                        </p>
                        <button className='px-6 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs transition-all shadow-xs cursor-pointer'>
                            Explore Open Roles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;