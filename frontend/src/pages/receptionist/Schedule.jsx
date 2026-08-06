import React, { useState, useEffect } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { Clock, Plus, Trash2, Save, Check } from 'lucide-react';
import api from '../../services/api';

const ReceptionistSchedule = () => {
    const [workingDays, setWorkingDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newStartTime, setNewStartTime] = useState('05:00 PM');
    const [newEndTime, setNewEndTime] = useState('06:00 PM');
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await api.get('/receptionist/schedule');
                if (res.data?.success && res.data.schedule) {
                    setWorkingDays(res.data.schedule.workingDays || []);
                    setTimeSlots(res.data.schedule.timeSlots || []);
                }
            } catch (err) {
                console.error('Error loading schedule:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const toggleDay = (day) => {
        if (workingDays.includes(day)) {
            setWorkingDays(workingDays.filter(d => d !== day));
        } else {
            setWorkingDays([...workingDays, day]);
        }
    };

    const removeSlot = (slotToRemove) => {
        setTimeSlots(timeSlots.filter(s => s !== slotToRemove));
    };

    const handleAddSlot = (e) => {
        e.preventDefault();
        const slotString = `${newStartTime} - ${newEndTime}`;
        if (!timeSlots.includes(slotString)) {
            setTimeSlots([...timeSlots, slotString]);
        }
    };

    const handleSaveSchedule = async () => {
        try {
            await api.put('/receptionist/schedule', { workingDays, timeSlots });
            setSavedNotice(true);
            setTimeout(() => setSavedNotice(false), 3000);
        } catch (err) {
            console.error('Error saving schedule:', err);
        }
    };

    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300 max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Clock className='text-rose-500' size={28} />
                            Manage Clinic Schedule
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Set working days, consultation time slots and clinic hours.
                        </p>
                    </div>

                    <button
                        onClick={handleSaveSchedule}
                        className='px-6 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto'
                    >
                        {savedNotice ? <Check size={16} /> : <Save size={16} />}
                        {savedNotice ? 'Schedule Saved!' : 'Save Schedule'}
                    </button>
                </div>

                {/* Working Days Selector Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4'>
                    <h2 className='text-base font-bold text-white uppercase tracking-wider text-rose-400'>
                        Working Days
                    </h2>
                    {loading ? (
                        <p className='text-slate-400 text-xs'>Loading schedule...</p>
                    ) : (
                        <div className='flex flex-wrap gap-3'>
                            {allDays.map((day) => {
                                const isSelected = workingDays.includes(day);
                                return (
                                    <button
                                        key={day}
                                        type='button'
                                        onClick={() => toggleDay(day)}
                                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                                            isSelected
                                                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 border-rose-500 text-white shadow-md shadow-rose-500/20'
                                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Time Slots List Card */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-5'>
                    <div className='flex items-center justify-between border-b border-slate-800 pb-3'>
                        <h2 className='text-base font-bold text-white uppercase tracking-wider text-amber-400'>
                            Time Slots
                        </h2>
                        <span className='text-xs text-slate-400 font-medium'>
                            {timeSlots.length} Active Slots
                        </span>
                    </div>

                    {loading ? (
                        <p className='text-slate-400 text-xs'>Loading time slots...</p>
                    ) : (
                        <div className='space-y-3'>
                            {timeSlots.length === 0 ? (
                                <p className='text-slate-500 text-xs py-4 text-center'>No active time slots configured.</p>
                            ) : (
                                timeSlots.map((slot, idx) => (
                                    <div
                                        key={idx}
                                        className='p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between text-xs font-semibold text-white hover:border-slate-700 transition-colors'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20'>
                                                <Clock size={16} />
                                            </div>
                                            <span>{slot}</span>
                                        </div>

                                        <button
                                            type='button'
                                            onClick={() => removeSlot(slot)}
                                            className='p-2 text-slate-400 hover:text-rose-400 bg-slate-900 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer'
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Add Time Slot Button Form */}
                    <form onSubmit={handleAddSlot} className='pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-end gap-3'>
                        <div className='flex-1 grid grid-cols-2 gap-3 w-full'>
                            <div>
                                <label className='block text-xs text-slate-400 mb-1'>Start Time</label>
                                <input
                                    type='text'
                                    value={newStartTime}
                                    onChange={(e) => setNewStartTime(e.target.value)}
                                    className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs'
                                />
                            </div>
                            <div>
                                <label className='block text-xs text-slate-400 mb-1'>End Time</label>
                                <input
                                    type='text'
                                    value={newEndTime}
                                    onChange={(e) => setNewEndTime(e.target.value)}
                                    className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-pink-500/20 shrink-0'
                        >
                            <Plus size={16} /> + Add Time Slot
                        </button>
                    </form>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistSchedule;
