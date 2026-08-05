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
            color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30'
        },
        {
            icon: CalendarCheck,
            title: 'Easy Booking',
            desc: 'Book appointments in just a few clicks',
            color: 'from-purple-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30'
        },
        {
            icon: ShieldCheck,
            title: 'Secure Payment',
            desc: 'Safe & secure online payments',
            color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30'
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            desc: 'We are here to help you anytime',
            color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
        }
    ];

    return (
        <div className='space-y-8 my-4'>
            {/* ------------ Main Hero Banner ------------ */}
            <div className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl'>
                {/* Background glow effects */}
                <div className='absolute -top-24 -left-24 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none'></div>
                <div className='absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none'></div>

                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10'>
                    {/* Left content */}
                    <div className='lg:w-3/5 space-y-6 text-left'>
                        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20'>
                            <span className='w-2 h-2 rounded-full bg-pink-500 animate-ping'></span>
                            Instant Online Appointment Booking
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight'>
                            Quality Care <br />
                            <span className='bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent'>
                                Just a Click Away
                            </span>
                        </h1>

                        <p className='text-slate-300 text-base sm:text-lg max-w-xl font-light leading-relaxed'>
                            Book appointments with trusted doctors near you. Experience hassle-free scheduling, verified specialists, and secure online consultation management.
                        </p>

                        {/* Step 1 Search Bar matching diagram */}
                        <form onSubmit={handleSearch} className='flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 border border-slate-700/80 p-2 rounded-2xl shadow-xl backdrop-blur-md max-w-xl'>
                            <div className='flex items-center gap-3 px-3 w-full'>
                                <Search size={20} className='text-slate-400 flex-shrink-0' />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Search doctors, specialties...'
                                    className='w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none py-2'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-md shadow-pink-500/20 hover:scale-105 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap'
                            >
                                Search
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Right Doctor Image */}
                    <div className='lg:w-2/5 flex justify-center relative'>
                        <div className='relative w-full max-w-sm'>
                            <div className='absolute inset-0 bg-gradient-to-t from-pink-500/20 to-indigo-500/20 rounded-3xl blur-xl'></div>
                            <img
                                className='relative z-10 w-full h-auto object-cover rounded-3xl border border-slate-700/50 shadow-2xl'
                                src={assets.header_img}
                                alt='Medicare Doctors'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------ Step 1 Quick Feature Cards matching diagram ------------ */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {quickFeatures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            onClick={() => navigate('/doctors')}
                            className={`p-5 rounded-2xl border bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg ${item.color.split(' ').find(c => c.startsWith('border-'))}`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon size={24} />
                            </div>
                            <h3 className='text-white font-semibold text-base group-hover:text-pink-400 transition-colors'>
                                {item.title}
                            </h3>
                            <p className='text-slate-400 text-xs mt-1 leading-relaxed'>
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