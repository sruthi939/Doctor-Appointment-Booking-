import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, Clock, Star, AlertCircle, RefreshCw, XCircle, MessageSquare, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
    const { appointments, cancelAppointment, rescheduleAppointment, addDoctorReview, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Upcoming'); // 'Upcoming' | 'Past'
    
    // Modal states
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
            {/* Back to Home Navigation */}
            <button
                onClick={() => navigate('/')}
                className='flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer'
            >
                <ArrowLeft className="w-4 h-4 text-[#5F6FFF]" />
                <span>Back to Home</span>
            </button>

            {/* Header & Tabs */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2'>
                        <Calendar className='text-[#5F6FFF]' size={28} />
                        My Appointments
                    </h1>
                    <p className='text-slate-500 text-sm mt-1'>
                        Manage your upcoming doctor visits, reschedule, cancel, or review completed appointments.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className='flex items-center p-1.5 bg-slate-50 border border-slate-200 rounded-2xl shrink-0 self-start sm:self-auto'>
                    <button
                        onClick={() => setActiveTab('Upcoming')}
                        className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === 'Upcoming'
                                ? 'bg-[#5F6FFF] text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Upcoming ({appointments.filter(a => a.status === 'Upcoming').length})
                    </button>
                    <button
                        onClick={() => setActiveTab('Past')}
                        className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeTab === 'Past'
                                ? 'bg-[#5F6FFF] text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        Past / Completed ({appointments.filter(a => a.status !== 'Upcoming').length})
                    </button>
                </div>
            </div>

            {/* Appointments Cards List */}
            {filteredAppointments.length === 0 ? (
                <div className='bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-xs'>
                    <AlertCircle size={40} className='mx-auto text-slate-400' />
                    <p className='text-slate-800 text-base font-semibold'>No {activeTab.toLowerCase()} appointments found.</p>
                    <p className='text-slate-500 text-xs'>Book your next consultation with certified specialists anytime.</p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='px-6 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-transform hover:scale-[1.02] shadow-xs cursor-pointer'
                    >
                        Book New Appointment
                    </button>
                </div>
            ) : (
                <div className='space-y-4'>
                    {filteredAppointments.map((item) => (
                        <div
                            key={item.id}
                            className='bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-300 transition-colors'
                        >
                            {/* Left: Doctor info */}
                            <div className='flex items-center gap-4'>
                                <img
                                    className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border border-slate-200 shrink-0 bg-blue-50/60'
                                    src={item.doctor.image}
                                    alt={item.doctor.name}
                                />
                                <div className='space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-lg font-bold text-slate-900'>{item.doctor.name}</h3>
                                        {/* Status badge */}
                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                            item.status === 'Upcoming'
                                                ? 'bg-blue-50 text-[#5F6FFF] border-blue-200'
                                                : item.status === 'Completed'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-rose-50 text-rose-600 border-rose-200'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className='text-xs text-slate-500 font-medium'>{item.doctor.speciality}</p>
                                    <p className='text-xs text-slate-500 font-mono'>Booking ID: <strong className='text-slate-800'>#{item.id}</strong></p>

                                    <div className='flex items-center gap-4 text-xs pt-1 text-slate-700'>
                                        <span className='flex items-center gap-1 text-[#5F6FFF] font-semibold'>
                                            <Calendar size={13} /> {item.slotDate}
                                        </span>
                                        <span className='flex items-center gap-1 text-slate-600'>
                                            <Clock size={13} /> {item.slotTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Action Buttons */}
                            <div className='w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0'>
                                {item.status === 'Upcoming' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setRescheduleModalApt(item);
                                                setNewSlotDate(item.slotDate);
                                                setNewSlotTime(item.slotTime);
                                            }}
                                            className='px-5 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer'
                                        >
                                            <RefreshCw size={14} />
                                            Reschedule Appointment
                                        </button>
                                        <button
                                            onClick={() => setCancelModalApt(item)}
                                            className='px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                                        >
                                            <XCircle size={14} />
                                            Cancel Appointment
                                        </button>
                                    </>
                                )}

                                {item.status === 'Completed' && (
                                    <>
                                        {item.reviewSubmitted ? (
                                            <div className='p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 max-w-xs'>
                                                <div className='flex items-center gap-1 text-blue-600 font-bold'>
                                                    {[...Array(item.rating || 5)].map((_, i) => (
                                                        <Star key={i} size={12} className='fill-blue-500 text-blue-500' />
                                                    ))}
                                                    <span className='ml-1 text-slate-800'>Reviewed</span>
                                                </div>
                                                <p className='text-slate-600 italic text-[11px] font-light'>"{item.reviewText}"</p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setReviewModalApt(item);
                                                    setRating(5);
                                                    setReviewText('Great doctor! Very friendly and explained everything clearly.');
                                                }}
                                                className='px-5 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer'
                                            >
                                                <MessageSquare size={14} />
                                                Rate & Review Experience
                                            </button>
                                        )}
                                    </>
                                )}

                                {item.status === 'Cancelled' && (
                                    <span className='text-xs text-rose-600 italic px-3 py-1 bg-rose-50 rounded-lg text-center border border-rose-200 font-medium'>
                                        Appointment Cancelled
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ------------ Reschedule Modal ------------ */}
            {rescheduleModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-xl space-y-5 relative'>
                        <button
                            onClick={() => setRescheduleModalApt(null)}
                            className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full cursor-pointer'
                        >
                            <X size={18} />
                        </button>

                        <div>
                            <h3 className='text-xl font-bold text-slate-900 flex items-center gap-2'>
                                <RefreshCw className='text-[#5F6FFF]' size={20} />
                                Reschedule Appointment
                            </h3>
                            <p className='text-slate-500 text-xs mt-1'>
                                Select a new date & time slot for {rescheduleModalApt.doctor.name}.
                            </p>
                        </div>

                        <div className='space-y-4 text-xs'>
                            <div>
                                <label className='block text-slate-700 font-semibold mb-1'>New Appointment Date</label>
                                <input
                                    type='text'
                                    value={newSlotDate}
                                    onChange={(e) => setNewSlotDate(e.target.value)}
                                    placeholder='e.g. 20 May 2026'
                                    className='w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#5F6FFF]'
                                />
                            </div>

                            <div>
                                <label className='block text-slate-700 font-semibold mb-1'>New Time Slot</label>
                                <select
                                    value={newSlotTime}
                                    onChange={(e) => setNewSlotTime(e.target.value)}
                                    className='w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#5F6FFF]'
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
                                className='flex-1 py-2.5 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs cursor-pointer'
                            >
                                Confirm Reschedule
                            </button>
                            <button
                                onClick={() => setRescheduleModalApt(null)}
                                className='px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ Cancel Modal ------------ */}
            {cancelModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4 relative text-center'>
                        <div className='w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200'>
                            <XCircle size={32} />
                        </div>
                        <h3 className='text-xl font-bold text-slate-900'>Cancel Appointment?</h3>
                        <p className='text-slate-500 text-xs leading-relaxed'>
                            Are you sure you want to cancel your appointment with <strong className='text-slate-800'>{cancelModalApt.doctor.name}</strong> on {cancelModalApt.slotDate}?
                        </p>

                        <div className='flex gap-3 pt-2'>
                            <button
                                onClick={handleConfirmCancel}
                                className='flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer'
                            >
                                Yes, Cancel Visit
                            </button>
                            <button
                                onClick={() => setCancelModalApt(null)}
                                className='flex-1 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer'
                            >
                                Keep Appointment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ Rate & Review Modal ------------ */}
            {reviewModalApt && (
                <div className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200'>
                    <div className='bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl space-y-5 relative text-left'>
                        <button
                            onClick={() => setReviewModalApt(null)}
                            className='absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full cursor-pointer'
                        >
                            <X size={18} />
                        </button>

                        <div className='flex items-center gap-3 border-b border-slate-100 pb-4'>
                            <img className='w-12 h-12 rounded-xl object-cover border border-slate-200' src={reviewModalApt.doctor.image} alt='' />
                            <div>
                                <h3 className='text-lg font-bold text-slate-900'>{reviewModalApt.doctor.name}</h3>
                                <p className='text-xs text-slate-500'>{reviewModalApt.slotDate} &bull; {reviewModalApt.slotTime}</p>
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-2'>How was your experience?</label>
                            <div className='flex items-center gap-2 justify-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type='button'
                                        onClick={() => setRating(star)}
                                        className='transition-transform hover:scale-125 p-1 cursor-pointer'
                                    >
                                        <Star
                                            size={28}
                                            className={star <= rating ? 'fill-blue-500 text-blue-500' : 'text-slate-300'}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold text-slate-700 mb-1'>Write a review (optional)</label>
                            <textarea
                                rows={3}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs focus:outline-none focus:border-[#5F6FFF]'
                                placeholder='Share feedback about treatment, doctor friendliness...'
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            className='w-full py-3 bg-[#5F6FFF] hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-all shadow-xs cursor-pointer'
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