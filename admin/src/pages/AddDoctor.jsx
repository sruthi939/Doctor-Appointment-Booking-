import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { UserPlus, Stethoscope, CheckCircle2, DollarSign, Award, MapPin } from 'lucide-react';
import { addDoctorApi } from '../services/adminApi';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('MBBS');
    const [experience, setExperience] = useState('4 Years');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const res = await addDoctorApi({
            name,
            email,
            password: password || 'password123',
            speciality,
            degree,
            experience,
            fees: Number(fees) || 50,
            about: about || `Dr. ${name} is committed to delivering excellent healthcare services.`,
            image,
            address: { line1: line1 || 'Clinic Address Line 1', line2: line2 || 'City, State' },
            available: true
        });

        setLoading(false);

        if (res.success) {
            setSubmitted(true);
            setTimeout(() => {
                navigate('/admin/doctors');
            }, 1500);
        } else {
            setErrorMsg(res.message || 'Failed to add doctor');
        }
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                        <UserPlus className='text-purple-500' size={28} />
                        Add New Doctor
                    </h1>
                    <p className='text-slate-400 text-sm mt-1'>
                        Onboard a new medical specialist to the MediCare doctor directory.
                    </p>
                </div>

                {submitted && (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <CheckCircle2 size={18} /> Doctor onboarded successfully! Redirecting...
                    </div>
                )}

                {errorMsg && (
                    <div className='p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-bold'>
                        {errorMsg}
                    </div>
                )}

                {/* Onboarding Form */}
                <form onSubmit={handleSubmit} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Doctor Name</label>
                            <input
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter doctor name...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Doctor Email</label>
                            <input
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter doctor email...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Speciality</label>
                            <select
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            >
                                <option value='General physician'>General physician</option>
                                <option value='Gynecologist'>Gynecologist</option>
                                <option value='Dermatologist'>Dermatologist</option>
                                <option value='Pediatricians'>Pediatricians</option>
                                <option value='Neurologist'>Neurologist</option>
                                <option value='Gastroenterologist'>Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Degree</label>
                            <input
                                type='text'
                                required
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                placeholder='e.g. MBBS, MD'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Consultation Fee ($)</label>
                            <input
                                type='number'
                                required
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                                placeholder='Enter fee...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Experience</label>
                            <select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            >
                                <option value='1 Year'>1 Year</option>
                                <option value='2 Years'>2 Years</option>
                                <option value='3 Years'>3 Years</option>
                                <option value='4 Years'>4 Years</option>
                                <option value='5+ Years'>5+ Years</option>
                            </select>
                        </div>

                        <div>
                            <label className='block font-bold text-slate-300 mb-1.5'>Doctor Image URL</label>
                            <input
                                type='text'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder='https://images.unsplash.com/...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>About Doctor</label>
                        <textarea
                            rows={3}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder='Enter doctor biography and clinical focus...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500'
                        ></textarea>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-purple-500/25 cursor-pointer uppercase tracking-wider'
                    >
                        {loading ? 'Onboarding Doctor...' : 'Confirm & Add Doctor'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddDoctor;
