import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
    BadgeCheck, Info, Star, Calendar, Clock, User, Mail, Phone, FileText, 
    CreditCard, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, ThumbsUp, Lock
} from 'lucide-react';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
    const { docId } = useParams();
    const navigate = useNavigate();
    const { doctors, currencySymbol, bookAppointment, userData } = useContext(AppContext);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [docInfo, setDocInfo] = useState(null);
    const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Experience', 'Reviews', 'Availability'
    
    // Booking flow state (Steps 4, 5, 6, 7)
    const [bookingStep, setBookingStep] = useState(1); // 1: Details & Date/Time, 2: Patient Info, 3: Payment, 4: Confirmed
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState('');

    // Patient info form state (Step 5)
    const [patientName, setPatientName] = useState(userData?.name || 'John Smith');
    const [patientEmail, setPatientEmail] = useState(userData?.email || 'johnsmith@example.com');
    const [patientPhone, setPatientPhone] = useState(userData?.phone || '+1 987 654 3210');
    const [reasonForVisit, setReasonForVisit] = useState('Fever and headache');
    const [saveDetails, setSaveDetails] = useState(true);

    // Payment method state (Step 6)
    const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
    const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
    const [cardExpiry, setCardExpiry] = useState('08/28');
    const [cardCvc, setCardCvc] = useState('•••');
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const fetchDocInfo = () => {
        const found = doctors.find(doc => doc._id === docId);
        setDocInfo(found || doctors[0]);
    };

    const getAvailableSlots = () => {
        setDocSlots([]);
        let today = new Date();

        let allSlots = [];
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let daySlots = [];
            const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM'];

            times.forEach(t => {
                daySlots.push({
                    date: currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                    dayName: daysOfWeek[currentDate.getDay()],
                    dayNum: currentDate.getDate(),
                    time: t
                });
            });

            allSlots.push(daySlots);
        }

        setDocSlots(allSlots);
        if (allSlots.length > 0 && allSlots[0].length > 0) {
            setSelectedTime(allSlots[0][2].time); // Default 11:00 AM
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    const handleConfirmPayment = (e) => {
        e.preventDefault();
        if (!docSlots[slotIndex] || !selectedTime) return;

        const dateString = docSlots[slotIndex][0].date;
        const newApt = bookAppointment(
            docInfo._id,
            dateString,
            selectedTime,
            {
                fullName: patientName,
                email: patientEmail,
                phone: patientPhone,
                reason: reasonForVisit
            },
            paymentMethod
        );

        setConfirmedBooking(newApt);
        setBookingStep(4); // Move to Step 7: Booking Confirmed
    };

    if (!docInfo) return null;

    const currentSelectedDate = docSlots[slotIndex] ? docSlots[slotIndex][0].date : '';

    return (
        <div className='space-y-8 my-4'>

            {/* Stepper Header for Booking Workflow matching diagram */}
            <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-xl'>
                <div className='flex items-center justify-between max-w-3xl mx-auto text-xs sm:text-sm font-medium text-slate-400 overflow-x-auto py-2 px-1 gap-2'>
                    <div className={`flex items-center gap-2 shrink-0 ${bookingStep >= 1 ? 'text-pink-400 font-bold' : ''}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 1 ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
                        <span>Doctor Details & Slots</span>
                    </div>
                    <div className='w-8 h-0.5 bg-slate-800 shrink-0'></div>
                    <div className={`flex items-center gap-2 shrink-0 ${bookingStep >= 2 ? 'text-pink-400 font-bold' : ''}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 2 ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'}`}>5</span>
                        <span>Fill Patient Details</span>
                    </div>
                    <div className='w-8 h-0.5 bg-slate-800 shrink-0'></div>
                    <div className={`flex items-center gap-2 shrink-0 ${bookingStep >= 3 ? 'text-pink-400 font-bold' : ''}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 3 ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400'}`}>6</span>
                        <span>Payment</span>
                    </div>
                    <div className='w-8 h-0.5 bg-slate-800 shrink-0'></div>
                    <div className={`flex items-center gap-2 shrink-0 ${bookingStep === 4 ? 'text-emerald-400 font-bold' : ''}`}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep === 4 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>7</span>
                        <span>Confirmed</span>
                    </div>
                </div>
            </div>

            {/* ------------ STEP 3 & 4: Doctor Details & Date & Time Selection ------------ */}
            {bookingStep === 1 && (
                <div className='space-y-8 animate-in fade-in duration-300'>
                    {/* Doctor Info Card */}
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-8 items-start'>
                        {/* Doctor Photo */}
                        <div className='w-full md:w-72 shrink-0 relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-xl'>
                            <img
                                className='w-full h-80 object-cover object-top'
                                src={docInfo.image}
                                alt={docInfo.name}
                            />
                            <div className='absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-center text-xs text-slate-300 flex items-center justify-center gap-1.5'>
                                <Star size={14} className='fill-amber-400 text-amber-400' />
                                <span className='font-bold text-white'>{docInfo.rating || '4.9'}</span>
                                <span className='text-slate-400'>({docInfo.reviewsCount || 120} reviews)</span>
                            </div>
                        </div>

                        {/* Right Doctor Details */}
                        <div className='flex-1 space-y-5 w-full'>
                            <div>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <h1 className='text-2xl sm:text-3xl font-extrabold text-white'>
                                        {docInfo.name}
                                    </h1>
                                    <BadgeCheck size={24} className='text-blue-400 fill-blue-400/20' />
                                </div>
                                <p className='text-slate-400 text-sm mt-1 flex items-center gap-2'>
                                    <span>{docInfo.degree} - {docInfo.speciality}</span>
                                    <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20'>
                                        {docInfo.experience} Experience
                                    </span>
                                </p>
                            </div>

                            {/* Tabs: Overview, Experience, Reviews, Availability matching diagram */}
                            <div className='flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto'>
                                {['Overview', 'Experience', 'Reviews', 'Availability'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                            activeTab === tab
                                                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'Overview' && (
                                <div className='space-y-3 text-sm text-slate-300 leading-relaxed'>
                                    <div className='flex items-center gap-1.5 font-semibold text-white'>
                                        <Info size={16} className='text-pink-400' />
                                        <span>About Doctor</span>
                                    </div>
                                    <p className='text-slate-400 text-xs sm:text-sm'>{docInfo.about}</p>
                                </div>
                            )}

                            {activeTab === 'Experience' && (
                                <div className='space-y-2 text-xs text-slate-300'>
                                    <div className='p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between'>
                                        <span className='text-slate-400'>Senior Consultant</span>
                                        <span className='text-white font-medium'>10+ Years</span>
                                    </div>
                                    <div className='p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between'>
                                        <span className='text-slate-400'>Patients Treated</span>
                                        <span className='text-emerald-400 font-bold'>1000+ Patients</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Reviews' && (
                                <div className='space-y-3'>
                                    <div className='p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between'>
                                        <div>
                                            <p className='text-white font-bold text-sm'>Overall Patient Rating</p>
                                            <p className='text-xs text-slate-400'>Based on verified appointment feedback</p>
                                        </div>
                                        <div className='flex items-center gap-1 text-amber-400 font-bold text-lg'>
                                            <Star size={20} className='fill-amber-400' />
                                            <span>4.9 / 5</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Availability' && (
                                <div className='p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1'>
                                    <p className='font-semibold text-white'>Weekly Consultation Schedule:</p>
                                    <p className='text-slate-400'>Mon - Sat: 09:00 AM - 06:00 PM (Every 30 Mins Slot)</p>
                                </div>
                            )}

                            {/* Fee card */}
                            <div className='pt-2 flex items-center justify-between border-t border-slate-800'>
                                <div>
                                    <p className='text-xs text-slate-400'>Consultation Fee</p>
                                    <p className='text-2xl font-bold text-emerald-400'>
                                        {currencySymbol}{docInfo.fees}
                                    </p>
                                </div>
                                <div className='flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20'>
                                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
                                    Instant Confirmation
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------ STEP 4: Choose Date & Time Slots ------------ */}
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6'>
                        <div>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <Calendar className='text-pink-500' size={20} />
                                Step 4: Choose Date & Time
                            </h2>
                            <p className='text-slate-400 text-xs mt-1'>Select your preferred date and time slot from doctor availability.</p>
                        </div>

                        {/* Date selection pills */}
                        <div className='space-y-3'>
                            <p className='text-xs font-semibold text-slate-300 uppercase tracking-wider'>Select Available Date</p>
                            <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-none'>
                                {docSlots.map((item, index) => {
                                    if (!item.length) return null;
                                    const isSelected = slotIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSlotIndex(index)}
                                            className={`flex flex-col items-center justify-center min-w-[72px] py-3.5 px-3 rounded-2xl cursor-pointer transition-all border shrink-0 ${
                                                isSelected
                                                    ? 'bg-gradient-to-b from-pink-500 to-rose-600 border-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105'
                                                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                            }`}
                                        >
                                            <span className='text-xs font-medium uppercase'>{item[0].dayName}</span>
                                            <span className='text-lg font-bold my-0.5'>{item[0].dayNum}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time slots grid */}
                        <div className='space-y-3'>
                            <p className='text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5'>
                                <Clock size={14} className='text-indigo-400' />
                                Select Available Slot on {currentSelectedDate}
                            </p>
                            <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3'>
                                {docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => {
                                    const isSelected = selectedTime === item.time;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTime(item.time)}
                                            className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                                                isSelected
                                                    ? 'bg-pink-500/20 border-pink-500 text-pink-300 font-bold shadow-md shadow-pink-500/10'
                                                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                                            }`}
                                        >
                                            {item.time}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Continue to Patient Info button */}
                        <div className='pt-4 border-t border-slate-800 flex justify-end'>
                            <button
                                onClick={() => setBookingStep(2)}
                                className='px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 flex items-center gap-2 hover:scale-105 cursor-pointer'
                            >
                                Continue to Patient Details
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ STEP 5: Fill Details ------------ */}
            {bookingStep === 2 && (
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-4'>
                        <div>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <User className='text-pink-500' size={20} />
                                Step 5: Appointment Details
                            </h2>
                            <p className='text-slate-400 text-xs mt-1'>Enter patient details and reason for visit.</p>
                        </div>
                        <button
                            onClick={() => setBookingStep(1)}
                            className='text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg transition-colors'
                        >
                            <ArrowLeft size={14} /> Back
                        </button>
                    </div>

                    {/* Summary badge */}
                    <div className='bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-300'>
                        <div className='flex items-center gap-3'>
                            <img className='w-12 h-12 rounded-xl object-cover' src={docInfo.image} alt='' />
                            <div>
                                <p className='font-bold text-white text-sm'>{docInfo.name}</p>
                                <p className='text-slate-400'>{docInfo.speciality}</p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='font-semibold text-pink-400'>{currentSelectedDate}</p>
                            <p className='text-slate-300'>{selectedTime}</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setBookingStep(3); }} className='space-y-4 text-left'>
                        <div>
                            <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                                <User size={14} className='text-slate-400' /> Full Name
                            </label>
                            <input
                                type='text'
                                required
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
                                placeholder='John Smith'
                            />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                                    <Mail size={14} className='text-slate-400' /> Email Address
                                </label>
                                <input
                                    type='email'
                                    required
                                    value={patientEmail}
                                    onChange={(e) => setPatientEmail(e.target.value)}
                                    className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
                                    placeholder='johnsmith@example.com'
                                />
                            </div>
                            <div>
                                <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                                    <Phone size={14} className='text-slate-400' /> Phone Number
                                </label>
                                <input
                                    type='tel'
                                    required
                                    value={patientPhone}
                                    onChange={(e) => setPatientPhone(e.target.value)}
                                    className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
                                    placeholder='+1 987 654 3210'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5'>
                                <FileText size={14} className='text-slate-400' /> Reason for Visit / Symptoms
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={reasonForVisit}
                                onChange={(e) => setReasonForVisit(e.target.value)}
                                className='w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500'
                                placeholder='Describe symptoms, e.g. Fever and headache'
                            ></textarea>
                        </div>

                        <div className='flex items-center gap-2 pt-2'>
                            <input
                                type='checkbox'
                                id='saveDetails'
                                checked={saveDetails}
                                onChange={(e) => setSaveDetails(e.target.checked)}
                                className='rounded text-pink-500 focus:ring-pink-500 bg-slate-950 border-slate-700 w-4 h-4'
                            />
                            <label htmlFor='saveDetails' className='text-xs text-slate-400 cursor-pointer'>
                                Save details for faster booking next time
                            </label>
                        </div>

                        <div className='pt-4 border-t border-slate-800 flex justify-end gap-3'>
                            <button
                                type='submit'
                                className='px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 flex items-center gap-2 cursor-pointer'
                            >
                                Continue to Payment
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ------------ STEP 6: Payment ------------ */}
            {bookingStep === 3 && (
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-4'>
                        <div>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <CreditCard className='text-pink-500' size={20} />
                                Step 6: Payment
                            </h2>
                            <p className='text-slate-400 text-xs mt-1'>Make payment securely online.</p>
                        </div>
                        <button
                            onClick={() => setBookingStep(2)}
                            className='text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg transition-colors'
                        >
                            <ArrowLeft size={14} /> Back
                        </button>
                    </div>

                    {/* Consultation fee box */}
                    <div className='bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between'>
                        <div>
                            <p className='text-xs text-slate-400'>Total Consultation Fee</p>
                            <p className='text-2xl font-extrabold text-white mt-0.5'>{currencySymbol}{docInfo.fees}.00</p>
                        </div>
                        <div className='flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20'>
                            <Lock size={12} />
                            <span>100% Secure Payment</span>
                        </div>
                    </div>

                    {/* Payment methods */}
                    <div className='space-y-3 text-left'>
                        <p className='text-xs font-semibold text-slate-300 uppercase tracking-wider'>Select Payment Method</p>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                            {['Credit / Debit Card', 'UPI', 'Net Banking', 'Wallets'].map((method) => (
                                <button
                                    key={method}
                                    type='button'
                                    onClick={() => setPaymentMethod(method)}
                                    className={`p-3 rounded-xl text-xs font-semibold transition-all border text-center cursor-pointer ${
                                        paymentMethod === method
                                            ? 'bg-pink-500/20 border-pink-500 text-white shadow-md'
                                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>

                        {paymentMethod === 'Credit / Debit Card' && (
                            <div className='p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3 mt-4'>
                                <div>
                                    <label className='block text-[11px] text-slate-400 mb-1'>Card Number</label>
                                    <input
                                        type='text'
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        className='w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-white text-xs'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div>
                                        <label className='block text-[11px] text-slate-400 mb-1'>Expiry Date</label>
                                        <input
                                            type='text'
                                            value={cardExpiry}
                                            onChange={(e) => setCardExpiry(e.target.value)}
                                            className='w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-white text-xs'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-[11px] text-slate-400 mb-1'>CVC / CVV</label>
                                        <input
                                            type='password'
                                            value={cardCvc}
                                            onChange={(e) => setCardCvc(e.target.value)}
                                            className='w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-white text-xs'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='pt-4 border-t border-slate-800 flex justify-end'>
                        <button
                            onClick={handleConfirmPayment}
                            className='w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer'
                        >
                            Pay {currencySymbol}{docInfo.fees}.00 & Confirm Booking
                        </button>
                    </div>
                </div>
            )}

            {/* ------------ STEP 7: Booking Confirmed ------------ */}
            {bookingStep === 4 && confirmedBooking && (
                <div className='bg-slate-900/95 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl space-y-6 max-w-xl mx-auto text-center animate-in zoom-in-95 duration-300'>
                    <div className='w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20 animate-bounce'>
                        <CheckCircle2 size={44} />
                    </div>

                    <div>
                        <h2 className='text-2xl sm:text-3xl font-extrabold text-white'>Booking Confirmed!</h2>
                        <p className='text-slate-400 text-sm mt-1'>Your appointment has been successfully scheduled.</p>
                    </div>

                    {/* Booking Ticket Summary */}
                    <div className='bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-4 shadow-inner'>
                        <div className='flex items-center gap-3 border-b border-slate-800 pb-3'>
                            <img className='w-14 h-14 rounded-xl object-cover border border-slate-700' src={docInfo.image} alt='' />
                            <div>
                                <p className='font-bold text-white text-base'>{docInfo.name}</p>
                                <p className='text-slate-400 text-xs'>{docInfo.speciality}</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3 text-xs'>
                            <div>
                                <p className='text-slate-500'>Date & Time</p>
                                <p className='font-semibold text-white mt-0.5'>{confirmedBooking.slotDate}</p>
                                <p className='text-pink-400 font-medium'>{confirmedBooking.slotTime}</p>
                            </div>
                            <div>
                                <p className='text-slate-500'>Booking ID</p>
                                <p className='font-mono font-bold text-slate-200 mt-0.5'>#{confirmedBooking.id}</p>
                            </div>
                        </div>

                        <div className='pt-2 border-t border-slate-800 text-xs flex justify-between text-slate-400'>
                            <span>Patient: <strong className='text-slate-200'>{confirmedBooking.patientDetails.fullName}</strong></span>
                            <span className='text-emerald-400 font-semibold'>Paid Online</span>
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                        <button
                            onClick={() => navigate('/my-appointments')}
                            className='flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-pink-500/25 transition-all cursor-pointer'
                        >
                            View Appointment
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className='flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer'
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            )}

            {/* Related Doctors Section */}
            {bookingStep === 1 && (
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            )}

        </div>
    );
};

export default Appointment;