import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Search, UserCheck, CalendarCheck, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/doctors');
        }
    };

    const quickFeatures = [
        {
            icon: UserCheck,
            title: 'Find Doctors',
            desc: 'Search and connect with specialists',
            bg: 'bg-blue-50 text-[#5F6FFF] border-blue-200'
        },
        {
            icon: CalendarCheck,
            title: 'Easy Booking',
            desc: 'Book appointments in just a few clicks',
            bg: 'bg-indigo-50 text-indigo-600 border-indigo-200'
        },
        {
            icon: ShieldCheck,
            title: 'Secure Payment',
            desc: 'Safe & secure online payments',
            bg: 'bg-sky-50 text-sky-600 border-sky-200'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            desc: 'We are here to help you anytime',
            bg: 'bg-blue-50 text-blue-600 border-blue-200'
        }
    ];

    return (
        <div className='space-y-8 my-4'>
            {/* ------------ Main Hero Banner ------------ */}
            <div className='relative overflow-hidden bg-[#5F6FFF] border border-blue-200 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-lg text-white'>
                {/* Subtle background overlay */}
                <div className='absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none'></div>
                <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none'></div>

                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10'>
                    {/* Left content */}
                    <div className='lg:w-3/5 space-y-6 text-left'>
                        <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/30'>
                            <span className='w-2 h-2 rounded-full bg-white animate-pulse'></span>
                            Instant Online Appointment Booking
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight'>
                            Book Appointment <br />
                            <span className='text-blue-100'>
                                With Trusted Doctors
                            </span>
                        </h1>

                        <p className='text-blue-50 text-base sm:text-lg max-w-xl font-normal leading-relaxed'>
                            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className='flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-md max-w-xl text-slate-700'>
                            <div className='flex items-center gap-3 px-3 w-full'>
                                <Search size={20} className='text-blue-500 flex-shrink-0' />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Search doctors, specialties...'
                                    className='w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none py-2'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full sm:w-auto px-8 py-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap'
                            >
                                Search
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Right Doctor Image */}
                    <div className='lg:w-2/5 flex justify-center relative'>
                        <div className='relative w-full max-w-sm'>
                            <img
                                className='relative z-10 w-full h-auto object-cover rounded-2xl shadow-xl border-4 border-white/20'
                                src={assets.header_img}
                                alt='Medicare Doctors'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------ Quick Feature Cards ------------ */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {quickFeatures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            onClick={() => navigate('/doctors')}
                            className='p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1'
                        >
                            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                                <Icon size={24} />
                            </div>
                            <h3 className='text-slate-800 font-semibold text-base group-hover:text-[#5F6FFF] transition-colors'>
                                {item.title}
                            </h3>
                            <p className='text-slate-500 text-xs mt-1 leading-relaxed'>
                                {item.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Header;