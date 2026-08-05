import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, Clock, Star, AlertCircle, RefreshCw, XCircle, CheckCircle, MessageSquare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
    const { appointments, cancelAppointment, rescheduleAppointment, addDoctorReview, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Upcoming'); // 'Upcoming' | 'Past'
    
    // Modal states for Step 9 & Step 10
    const [rescheduleModalApt, setRescheduleModalApt] = useState(null);
    const [newSlotDate, setNewSlotDate] = useState('');
    const [newSlotTime, setNewSlotTime] = useState('11:00 AM');

    const [cancelModalApt, setCancelModalApt] = useState(null);

    const [reviewModalApt, setReviewModalApt] = useState(null);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('Great doctor! Very friendly and explained everything clearly.');

    const filteredAppointments = appointments.filter(apt => {
        if (activeTab === 'Upcoming') return apt.status === 'Upcoming';
        return apt.status === 'Completed' || apt.status === 'Cancelled';
    });

    const handleConfirmReschedule = () => {
        if (rescheduleModalApt && newSlotDate && newSlotTime) {
            rescheduleAppointment(rescheduleModalApt.id, newSlotDate, newSlotTime);
            setRescheduleModalApt(null);
        }
    };

    const handleConfirmCancel = () => {
        if (cancelModalApt) {
            cancelAppointment(cancelModalApt.id);
            setCancelModalApt(null);
        }
    };

    const handleSubmitReview = () => {
        if (reviewModalApt) {
            addDoctorReview(reviewModalApt.id, rating, reviewText);
            setReviewModalApt(null);
        }
    };

    return (
        <div className='space-y-6 my-4 text-left'>
            {/* Header & Tabs */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                        <Calendar className='text-pink-500' size={28} />
                        My Appointments
                    </h1>
                    <p className='text-slate-400 text-sm mt-1'>
                        Manage your upcoming doctor visits, reschedule, cancel, or review completed appointments.
                    </p>
                </div>

                {/* Filter Tabs matching Step 8 diagram */}
                <div className='flex items-center p-1.5 bg-slate-950/80 border border-slate-800 rounded-2xl shrink-0 self-start sm:self-auto'>
                    <button
                        onClick={() => setActiveTab('Upcoming')}
                        className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === 'Upcoming'
                                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Upcoming ({appointments.filter(a => a.status === 'Upcoming').length})
                    </button>
                    <button
                        onClick={() => setActiveTab('Past')}
                        className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === 'Past'
                                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Past / Completed ({appointments.filter(a => a.status !== 'Upcoming').length})
                    </button>
                </div>
            </div>

            {/* Appointments Cards List */}
            {filteredAppointments.length === 0 ? (
                <div className='bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3'>
                    <AlertCircle size={40} className='mx-auto text-slate-500' />
                    <p className='text-slate-300 text-base font-semibold'>No {activeTab.toLowerCase()} appointments found.</p>
                    <p className='text-slate-400 text-xs'>Book your next consultation with certified specialists anytime.</p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl text-xs font-semibold transition-transform hover:scale-105 shadow-md shadow-pink-500/20'
                    >
                        Book New Appointment
                    </button>
                </div>
            ) : (
                <div className='space-y-4'>
                    {filteredAppointments.map((item) => (
                        <div
                            key={item.id}
                            className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-colors'
                        >
                            {/* Left: Doctor info */}
                            <div className='flex items-center gap-4'>
                                <img
                                    className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border border-slate-700 shrink-0'
                                    src={item.doctor.image}
                                    alt={item.doctor.name}
                                />
                                <div className='space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-lg font-bold text-white'>{item.doctor.name}</h3>
                                        {/* Status badge */}
                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                            item.status === 'Upcoming'
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                                : item.status === 'Completed'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className='text-xs text-slate-400 font-medium'>{item.doctor.speciality}</p>
                                    <p className='text-xs text-slate-400 font-mono'>Booking ID: <strong className='text-slate-300'>#{item.id}</strong></p>

                                    <div className='flex items-center gap-4 text-xs pt-1 text-slate-300'>
                                        <span className='flex items-center gap-1 text-pink-400 font-semibold'>
                                            <Calendar size={13} /> {item.slotDate}
                                        </span>
                                        <span className='flex items-center gap-1 text-slate-300'>
                                            <Clock size={13} /> {item.slotTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Action Buttons matching Step 8, 9, 10 */}
                            <div className='w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0'>
                                {item.status === 'Upcoming' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setRescheduleModalApt(item);
                                                setNewSlotDate(item.slotDate);
                                                setNewSlotTime(item.slotTime);
                                            }}
                                            className='px-5 py-2.5 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer'
                                        >
                                            <RefreshCw size={14} />
                                            Reschedule Appointment
                                        </button>
                                        <button
                                            onClick={() => setCancelModalApt(item)}
                                            className='px-5 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                                        >
                                            <XCircle size={14} />
                                            Cancel Appointment
                                        </button>
                                    </>
                                )}

                                {item.status === 'Completed' && (
                                    <>
                                        {item.reviewSubmitted ? (
                                            <div className='p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1 max-w-xs'>
                                                <div className='flex items-center gap-1 text-amber-400 font-bold'>
                                                    {[...Array(item.rating || 5)].map((_, i) => (
                                                        <Star key={i} size={12} className='fill-amber-400' />
                                                    ))}
                                                    <span className='ml-1 text-white'>Reviewed</span>
                                                </div>
                                                <p className='text-slate-400 italic text-[11px] font-light'>"{item.reviewText}"</p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setReviewModalApt(item);
                                                    setRating(5);
                                                    setReviewText('Great doctor! Very friendly and explained everything clearly.');
                                                }}
                                                className='px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer'
                                            >
                                                <MessageSquare size={14} />
                                                Rate & Review Experience
                                            </button>
                                        )}
                                    </>
                                )}

                                {item.status === 'Cancelled' && (
                                    <span className='text-xs text-rose-400 italic px-3 py-1 bg-rose-500/10 rounded-lg text-center border border-rose-500/20'>
                                        Appointment Cancelled
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ------------ STEP 9: Reschedule Modal ------------ */}
            {rescheduleModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                        <button
                            onClick={() => setRescheduleModalApt(null)}
                            className='absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full'
                        >
                            <X size={18} />
                        </button>

                        <div>
                            <h3 className='text-xl font-bold text-white flex items-center gap-2'>
                                <RefreshCw className='text-indigo-400' size={20} />
                                Reschedule Appointment
                            </h3>
                            <p className='text-slate-400 text-xs mt-1'>
                                Select a new date & time slot for {rescheduleModalApt.doctor.name}.
                            </p>
                        </div>

                        <div className='space-y-4 text-xs'>
                            <div>
                                <label className='block text-slate-300 font-semibold mb-1'>New Appointment Date</label>
                                <input
                                    type='text'
                                    value={newSlotDate}
                                    onChange={(e) => setNewSlotDate(e.target.value)}
                                    placeholder='e.g. 20 May 2026'
                                    className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500'
                                />
                            </div>

                            <div>
                                <label className='block text-slate-300 font-semibold mb-1'>New Time Slot</label>
                                <select
                                    value={newSlotTime}
                                    onChange={(e) => setNewSlotTime(e.target.value)}
                                    className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500'
                                >
                                    {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-3 pt-2'>
                            <button
                                onClick={handleConfirmReschedule}
                                className='flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-md shadow-indigo-600/20'
                            >
                                Confirm Reschedule
                            </button>
                            <button
                                onClick={() => setRescheduleModalApt(null)}
                                className='px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ STEP 9: Cancel Modal ------------ */}
            {cancelModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-center'>
                        <div className='w-14 h-14 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/30'>
                            <XCircle size={32} />
                        </div>
                        <h3 className='text-xl font-bold text-white'>Cancel Appointment?</h3>
                        <p className='text-slate-400 text-xs leading-relaxed'>
                            Are you sure you want to cancel your appointment with <strong className='text-white'>{cancelModalApt.doctor.name}</strong> on {cancelModalApt.slotDate}?
                        </p>

                        <div className='flex gap-3 pt-2'>
                            <button
                                onClick={handleConfirmCancel}
                                className='flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20'
                            >
                                Yes, Cancel Visit
                            </button>
                            <button
                                onClick={() => setCancelModalApt(null)}
                                className='flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold'
                            >
                                Keep Appointment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ STEP 10: Rate & Review Modal ------------ */}
            {reviewModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative text-left'>
                        <button
                            onClick={() => setReviewModalApt(null)}
                            className='absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full'
                        >
                            <X size={18} />
                        </button>

                        <div className='flex items-center gap-3 border-b border-slate-800 pb-4'>
                            <img className='w-12 h-12 rounded-xl object-cover' src={reviewModalApt.doctor.image} alt='' />
                            <div>
                                <h3 className='text-lg font-bold text-white'>{reviewModalApt.doctor.name}</h3>
                                <p className='text-xs text-slate-400'>{reviewModalApt.slotDate} &bull; {reviewModalApt.slotTime}</p>
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-300 mb-2'>How was your experience?</label>
                            <div className='flex items-center gap-2 justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type='button'
                                        onClick={() => setRating(star)}
                                        className='transition-transform hover:scale-125 p-1'
                                    >
                                        <Star
                                            size={28}
                                            className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-300 mb-1'>Write a review (optional)</label>
                            <textarea
                                rows={3}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-pink-500'
                                placeholder='Share feedback about treatment, doctor friendliness...'
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            className='w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-pink-500/25 cursor-pointer'
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;