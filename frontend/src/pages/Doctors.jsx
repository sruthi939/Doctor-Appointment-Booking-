import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, Star, Filter, Calendar, Award, DollarSign, Sparkles } from 'lucide-react';
import { specialityData } from '../assets/assets';

const Doctors = () => {
    const { speciality } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryParam = searchParams.get('search') || '';

    const { doctors, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [filterDoc, setFilterDoc] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchQueryParam);
    const [selectedSpeciality, setSelectedSpeciality] = useState(speciality || '');

    useEffect(() => {
        if (speciality) {
            setSelectedSpeciality(speciality);
        }
    }, [speciality]);

    const applyFilter = () => {
        let result = doctors;

        if (selectedSpeciality) {
            result = result.filter(doc => 
                doc.speciality.toLowerCase().includes(selectedSpeciality.toLowerCase()) ||
                selectedSpeciality.toLowerCase().includes(doc.speciality.toLowerCase())
            );
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(doc =>
                doc.name.toLowerCase().includes(query) ||
                doc.speciality.toLowerCase().includes(query) ||
                doc.about.toLowerCase().includes(query)
            );
        }

        setFilterDoc(result);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, selectedSpeciality, searchQuery]);

    const handleSpecialityClick = (specName) => {
        if (selectedSpeciality.toLowerCase() === specName.toLowerCase()) {
            setSelectedSpeciality('');
            navigate('/doctors');
        } else {
            setSelectedSpeciality(specName);
            navigate(`/doctors/${specName}`);
        }
    };

    return (
        <div className='space-y-6 my-4'>
            {/* ------------ Header & Search Bar ------------ */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold text-white flex items-center gap-2'>
                            Find Your Doctor
                            <Sparkles className='text-pink-500' size={24} />
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Browse through top verified medical specialists and book instant consultations.
                        </p>
                    </div>
                    <span className='text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start md:self-auto'>
                        Showing {filterDoc.length} Available Doctors
                    </span>
                </div>

                {/* Step 2 Search Input */}
                <div className='relative max-w-2xl'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={20} />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search doctors by name, specialty, or condition...'
                        className='w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500/80 transition-colors shadow-inner'
                    />
                </div>
            </div>

            {/* ------------ Main Grid Layout: Sidebar & Cards ------------ */}
            <div className='flex flex-col lg:flex-row items-start gap-6'>
                {/* Speciality Sidebar Filter matching diagram */}
                <div className='w-full lg:w-64 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-md shrink-0 space-y-3'>
                    <div className='flex items-center gap-2 text-white font-semibold text-sm border-b border-slate-800 pb-3'>
                        <Filter size={16} className='text-pink-400' />
                        <span>Specialties</span>
                    </div>

                    <div className='flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none'>
                        <button
                            onClick={() => { setSelectedSpeciality(''); navigate('/doctors'); }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between whitespace-nowrap cursor-pointer ${
                                !selectedSpeciality 
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md shadow-pink-500/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            }`}
                        >
                            <span>All Specialties</span>
                            <span className='text-[10px] opacity-75'>({doctors.length})</span>
                        </button>

                        {specialityData.map((item, index) => {
                            const isSelected = selectedSpeciality.toLowerCase() === item.speciality.toLowerCase();
                            const count = doctors.filter(d => d.speciality.toLowerCase().includes(item.speciality.toLowerCase())).length;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSpecialityClick(item.speciality)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between whitespace-nowrap cursor-pointer ${
                                        isSelected 
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-md shadow-pink-500/20' 
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    <span>{item.speciality}</span>
                                    {count > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Doctor Cards Grid matching Step 2 in diagram */}
                <div className='w-full flex-1'>
                    {filterDoc.length === 0 ? (
                        <div className='bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3'>
                            <p className='text-slate-400 text-base'>No doctors found matching your filters.</p>
                            <button
                                onClick={() => { setSelectedSpeciality(''); setSearchQuery(''); navigate('/doctors'); }}
                                className='px-6 py-2 bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 rounded-xl text-xs font-semibold transition-colors'
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {filterDoc.map((item, index) => (
                                <div
                                    key={index}
                                    className='bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between'
                                >
                                    <div>
                                        {/* Image and status overlay */}
                                        <div className='relative bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden'>
                                            <img
                                                className='w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-500'
                                                src={item.image}
                                                alt={item.name}
                                            />
                                            <div className='absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 text-xs text-emerald-400 font-medium shadow-md'>
                                                <span className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></span>
                                                Available Today
                                            </div>
                                            <div className='absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 text-xs text-amber-400 font-semibold shadow-md'>
                                                <Star size={12} className='fill-amber-400 text-amber-400' />
                                                <span>{item.rating || '4.9'}</span>
                                            </div>
                                        </div>

                                        {/* Content info */}
                                        <div className='p-5 space-y-3'>
                                            <div>
                                                <h3 className='text-white text-lg font-bold group-hover:text-pink-400 transition-colors'>
                                                    {item.name}
                                                </h3>
                                                <p className='text-slate-400 text-xs font-medium mt-0.5'>
                                                    {item.speciality} &bull; {item.degree || 'MBBS'}
                                                </p>
                                            </div>

                                            <div className='flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800/80'>
                                                <div className='flex items-center gap-1 text-slate-400'>
                                                    <Award size={14} className='text-indigo-400' />
                                                    <span>{item.experience} Exp.</span>
                                                </div>
                                                <div className='flex items-center gap-0.5 text-emerald-400 font-bold text-sm'>
                                                    <span>{currencySymbol}{item.fees}</span>
                                                    <span className='text-[10px] text-slate-400 font-normal'>/ Visit</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className='p-5 pt-0'>
                                        <button
                                            onClick={() => navigate(`/appointment/${item._id}`)}
                                            className='w-full py-2.5 bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md group-hover:shadow-pink-500/20'
                                        >
                                            <Calendar size={14} />
                                            View Profile & Book
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;