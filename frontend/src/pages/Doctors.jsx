import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, Star, Filter, Calendar, Award, Sparkles } from 'lucide-react';
import { specialityData } from '../assets/assets';

const Doctors = () => {
    const { speciality } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQueryParam = searchParams.get('search') || '';

    const { doctors, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [filterDoc, setFilterDoc] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchQueryParam);
    const [selectedSpeciality, setSelectedSpeciality] = useState(speciality ? decodeURIComponent(speciality) : '');

    useEffect(() => {
        setSelectedSpeciality(speciality ? decodeURIComponent(speciality) : '');
    }, [speciality]);

    const isSpecialityMatch = (docSpec, filterSpec) => {
        if (!docSpec || !filterSpec) return false;
        const a = docSpec.toLowerCase().trim();
        const b = filterSpec.toLowerCase().trim();

        if (a === b || a.includes(b) || b.includes(a)) return true;

        const getRoot = (str) => {
            return str
                .replace(/general\s+/g, 'gen')
                .replace(/(ologist|ology|icians|ician|iatrics|iatric|ist|y|s)$/g, '');
        };

        const rootA = getRoot(a);
        const rootB = getRoot(b);

        if (rootA && rootB && (rootA.length >= 3 && rootB.length >= 3) && (rootA.includes(rootB) || rootB.includes(rootA))) {
            return true;
        }

        if (a.length >= 4 && b.length >= 4 && a.substring(0, 4) === b.substring(0, 4)) {
            return true;
        }

        return false;
    };

    const applyFilter = () => {
        let result = doctors;

        if (selectedSpeciality) {
            result = result.filter(doc => isSpecialityMatch(doc.speciality, selectedSpeciality));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(doc =>
                (doc.name || '').toLowerCase().includes(query) ||
                (doc.speciality || '').toLowerCase().includes(query) ||
                (doc.about || '').toLowerCase().includes(query)
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
            navigate(`/doctors/${encodeURIComponent(specName)}`);
        }
    };

    return (
        <div className='space-y-6 my-4'>
            {/* ------------ Header & Search Bar ------------ */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2'>
                            Find Your Doctor
                            <Sparkles className='text-[#5F6FFF]' size={24} />
                        </h1>
                        <p className='text-slate-500 text-sm mt-1'>
                            Browse through top verified medical specialists and book instant consultations.
                        </p>
                    </div>
                    <span className='text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-[#5F6FFF] border border-blue-200 self-start md:self-auto'>
                        Showing {filterDoc.length} {selectedSpeciality ? selectedSpeciality : 'Available'} Doctors
                    </span>
                </div>

                {/* Search Input */}
                <div className='relative max-w-2xl'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={20} />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search doctors by name, specialty, or condition...'
                        className='w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#5F6FFF] transition-colors'
                    />
                </div>
            </div>

            {/* ------------ Main Grid Layout: Sidebar & Cards ------------ */}
            <div className='flex flex-col lg:flex-row items-start gap-6'>
                {/* Speciality Sidebar Filter */}
                <div className='w-full lg:w-64 bg-white border border-slate-200 rounded-3xl p-5 shrink-0 space-y-3 shadow-xs'>
                    <div className='flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3'>
                        <Filter size={16} className='text-[#5F6FFF]' />
                        <span>Specialties</span>
                    </div>

                    <div className='flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none'>
                        <button
                            onClick={() => { setSelectedSpeciality(''); navigate('/doctors'); }}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between whitespace-nowrap cursor-pointer ${
                                !selectedSpeciality 
                                    ? 'bg-[#5F6FFF] text-white font-semibold shadow-xs' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <span>All Specialties</span>
                            <span className='text-[10px] opacity-75'>({doctors.length})</span>
                        </button>

                        {specialityData.map((item, index) => {
                            const isSelected = selectedSpeciality.toLowerCase() === item.speciality.toLowerCase();
                            const count = doctors.filter(d => isSpecialityMatch(d.speciality, item.speciality)).length;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSpecialityClick(item.speciality)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between whitespace-nowrap cursor-pointer ${
                                        isSelected 
                                            ? 'bg-[#5F6FFF] text-white font-semibold shadow-xs' 
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    <span>{item.speciality}</span>
                                    {count > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Doctor Cards Grid */}
                <div className='w-full flex-1'>
                    {filterDoc.length === 0 ? (
                        <div className='bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs'>
                            <p className='text-slate-500 text-base'>
                                No doctors found for <span className='font-semibold text-slate-800'>{selectedSpeciality || searchQuery}</span>.
                            </p>
                            <button
                                onClick={() => { setSelectedSpeciality(''); setSearchQuery(''); navigate('/doctors'); }}
                                className='px-6 py-2 bg-blue-50 text-[#5F6FFF] hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer'
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                            {filterDoc.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className='bg-white border border-slate-200 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-400 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between'
                                >
                                    <div>
                                        {/* Image and status overlay */}
                                        <div className='relative bg-blue-50/60 overflow-hidden h-56'>
                                            <img
                                                className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                                                src={item.image}
                                                alt={item.name}
                                            />
                                            <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-green-200 flex items-center gap-1.5 text-xs text-green-700 font-medium shadow-xs'>
                                                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                                Available
                                            </div>
                                            <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1 text-xs text-blue-700 font-semibold shadow-xs'>
                                                <Star size={12} className='fill-blue-500 text-blue-500' />
                                                <span>{item.rating || '4.9'}</span>
                                            </div>
                                        </div>

                                        {/* Content info */}
                                        <div className='p-5 space-y-3'>
                                            <div>
                                                <h3 className='text-slate-900 text-lg font-bold group-hover:text-[#5F6FFF] transition-colors'>
                                                    {item.name}
                                                </h3>
                                                <p className='text-slate-500 text-xs font-medium mt-0.5'>
                                                    {item.speciality} &bull; {item.degree || 'MBBS'}
                                                </p>
                                            </div>

                                            <div className='flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100'>
                                                <div className='flex items-center gap-1 text-slate-500'>
                                                    <Award size={14} className='text-blue-500' />
                                                    <span>{item.experience} Exp.</span>
                                                </div>
                                                <div className='flex items-center gap-0.5 text-[#5F6FFF] font-bold text-sm'>
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
                                            className='w-full py-2.5 bg-blue-50 hover:bg-[#5F6FFF] text-[#5F6FFF] hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 border border-blue-200 cursor-pointer'
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