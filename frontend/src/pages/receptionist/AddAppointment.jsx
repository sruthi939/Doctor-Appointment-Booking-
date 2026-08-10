import React, { useState, useEffect } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { UserPlus, Calendar, Clock, User, Stethoscope, CheckCircle2, Phone } from 'lucide-react';
import { addWalkInAppointmentApi } from '../../services/receptionistService';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddAppointment = () => {
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState('');
    const [phone, setPhone] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [slotDate, setSlotDate] = useState(new Date().toISOString().split('T')[0]);
    const [slotTime, setSlotTime] = useState('09:00 AM');
    const [reason, setReason] = useState('');
    const [doctorsList, setDoctorsList] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get('/doctors');
                if (res.data?.success && res.data.doctors?.length > 0) {
                    setDoctorsList(res.data.doctors);
                    setDoctorId(res.data.doctors[0]._id || res.data.doctors[0].id);
                }
            } catch (err) {
                console.error('Error fetching doctors:', err);
            }
        };
        fetchDoctors();
    }, []);

    const handlePhoneChange = (e) => {
        // Strip non-digits and cap at 10 digits
        const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhone(cleaned);
        if (cleaned.length > 0 && cleaned.length < 10) {
            setPhoneError('Phone number must be exactly 10 digits');
        } else {
            setPhoneError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            setPhoneError('Please enter a valid 10-digit phone number');
            return;
        }

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

                {/* Booking Form */}
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
                            placeholder='Type patient name...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs focus:outline-none focus:border-rose-500'
                        />
                    </div>

                    <div>
                        <div className='flex items-center justify-between mb-1.5'>
                            <label className='text-xs font-bold text-slate-300 flex items-center gap-1.5'>
                                <Phone size={14} className='text-rose-400' /> Phone Number
                            </label>
                            <span className='text-[10px] text-slate-400 font-mono'>10 digits (no country code)</span>
                        </div>
                        <input
                            type='tel'
                            required
                            maxLength={10}
                            pattern='[0-9]{10}'
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder='Enter 10-digit mobile number'
                            className={`w-full bg-slate-950 border ${phoneError ? 'border-rose-500' : 'border-slate-700'} rounded-2xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-rose-500 tracking-wider`}
                        />
                        {phoneError && (
                            <p className='text-[11px] text-rose-400 font-medium mt-1'>{phoneError}</p>
                        )}
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
                            {doctorsList.map((doc) => (
                                <option key={doc._id || doc.id} value={doc._id || doc.id}>
                                    {doc.name} ({doc.speciality})
                                </option>
                            ))}
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
                        className='w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer uppercase tracking-wider disabled:opacity-50'
                    >
                        {loading ? 'Booking Appointment...' : 'Confirm Walk-In Booking'}
                    </button>
                </form>
            </div>
        </ReceptionistLayout>
    );
};

export default AddAppointment;
