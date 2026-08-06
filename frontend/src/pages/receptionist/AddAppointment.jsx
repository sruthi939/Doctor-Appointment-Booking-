import React, { useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { UserPlus, Calendar, Clock, User, Stethoscope, CheckCircle2 } from 'lucide-react';
import { addWalkInAppointmentApi } from '../../services/receptionistService';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState('John Doe');
    const [phone, setPhone] = useState('+1 987 654 3210');
    const [doctorId, setDoctorId] = useState('doc1');
    const [slotDate, setSlotDate] = useState('2026-05-15');
    const [slotTime, setSlotTime] = useState('09:00 AM');
    const [reason, setReason] = useState('Fever and headache');

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await addWalkInAppointmentApi({
            patientName,
            phone,
            doctorId,
            slotDate,
            slotTime,
            reason
        });
        setLoading(false);
        if (res.success) {
            setSubmitted(true);
            setTimeout(() => {
                navigate('/receptionist/appointments');
            }, 1500);
        }
    };

    return (
        <ReceptionistLayout>
            <div className='max-w-2xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header Card */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                        <UserPlus className='text-rose-500' size={28} />
                        Add Appointment
                    </h1>
                    <p className='text-slate-400 text-sm mt-1'>
                        Book appointment for walk-in patient or by phone call.
                    </p>
                </div>

                {submitted && (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <CheckCircle2 size={18} /> Appointment booked successfully! Redirecting...
                    </div>
                )}

                {/* Booking Form matching Step 6 diagram */}
                <form onSubmit={handleSubmit} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5'>
                    <div>
                        <label className='block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5'>
                            <User size={14} className='text-rose-400' /> Patient Name
                        </label>
                        <input
                            type='text'
                            required
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder='Select Patient or type name...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-rose-500'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5'>
                            <Stethoscope size={14} className='text-pink-400' /> Doctor
                        </label>
                        <select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-rose-500'
                        >
                            <option value='doc1'>Dr. Richard James (General physician)</option>
                            <option value='doc2'>Dr. Emily Larson (Gynecologist)</option>
                            <option value='doc3'>Dr. Sarah Patel (Dermatologist)</option>
                            <option value='doc4'>Dr. Christopher Lee (Pediatricians)</option>
                            <option value='doc5'>Dr. Jennifer Garcia (Neurologist)</option>
                        </select>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5'>
                                <Calendar size={14} className='text-amber-400' /> Date
                            </label>
                            <input
                                type='date'
                                required
                                value={slotDate}
                                onChange={(e) => setSlotDate(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-rose-500'
                            />
                        </div>

                        <div>
                            <label className='block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5'>
                                <Clock size={14} className='text-rose-400' /> Time Slot
                            </label>
                            <select
                                value={slotTime}
                                onChange={(e) => setSlotTime(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-rose-500'
                            >
                                <option value='09:00 AM'>09:00 AM</option>
                                <option value='10:30 AM'>10:30 AM</option>
                                <option value='11:30 AM'>11:30 AM</option>
                                <option value='02:00 PM'>02:00 PM</option>
                                <option value='04:00 PM'>04:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-bold text-slate-300 mb-1.5'>Reason for Visit</label>
                        <textarea
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder='Enter reason...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white text-xs focus:outline-none focus:border-rose-500'
                        ></textarea>
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer uppercase tracking-wider'
                    >
                        {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </ReceptionistLayout>
    );
};

export default AddAppointment;
