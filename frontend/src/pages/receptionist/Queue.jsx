import React, { useEffect, useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { ListOrdered, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { fetchQueueList, markQueueServedApi } from '../../services/receptionistService';

const ReceptionistQueue = () => {
    const [activeTab, setActiveTab] = useState('Waiting');
    const [queueItems, setQueueItems] = useState([
        { _id: 'Q1', patientName: 'William Clark', doctorName: 'Dr. Smith', checkInTime: '09:15 AM', status: 'Waiting', waitingMinutes: 10 },
        { _id: 'Q2', patientName: 'Jessica Taylor', doctorName: 'Dr. Brown', checkInTime: '09:25 AM', status: 'Waiting', waitingMinutes: 2 },
        { _id: 'Q3', patientName: 'Daniel Martinez', doctorName: 'Dr. Davis', checkInTime: '09:30 AM', status: 'Waiting', waitingMinutes: 1 }
    ]);

    useEffect(() => {
        const loadQueue = async () => {
            const res = await fetchQueueList();
            if (res?.queue) {
                setQueueItems(res.queue);
            }
        };
        loadQueue();
    }, []);

    const handleMarkServed = async (id) => {
        await markQueueServedApi(id);
        setQueueItems(prev => prev.map(q => q._id === id ? { ...q, status: 'Served' } : q));
    };

    const waitingList = queueItems.filter(q => q.status === 'Waiting');
    const servedList = queueItems.filter(q => q.status === 'Served');

    return (
        <ReceptionistLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300 max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <ListOrdered className='text-rose-500' size={28} />
                            Queue Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Manage waiting list queue and track walk-in patients.
                        </p>
                    </div>

                    {/* Filter Tabs matching Step 7 diagram */}
                    <div className='flex items-center p-1 bg-slate-950 border border-slate-800 rounded-2xl'>
                        <button
                            onClick={() => setActiveTab('Waiting')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === 'Waiting'
                                    ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Waiting ({waitingList.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('Served')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                activeTab === 'Served'
                                    ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Served ({servedList.length})
                        </button>
                    </div>
                </div>

                {/* Queue Cards List matching Step 7 diagram */}
                {activeTab === 'Waiting' ? (
                    <div className='space-y-4'>
                        {waitingList.map((item, index) => (
                            <div
                                key={item._id}
                                className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold flex items-center justify-center text-sm shrink-0'>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-white text-base'>{item.patientName}</h3>
                                        <p className='text-xs text-slate-400 flex items-center gap-2 mt-0.5'>
                                            <span>{item.checkInTime}</span>
                                            <span>&bull;</span>
                                            <span className='text-amber-400 font-semibold flex items-center gap-1'>
                                                <Clock size={12} /> Waiting since {item.waitingMinutes || 5} mins
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMarkServed(item._id)}
                                    className='w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer'
                                >
                                    <UserCheck size={16} /> Mark as Served
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {servedList.map((item, index) => (
                            <div key={item._id} className='bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs text-white opacity-80'>
                                <div className='flex items-center gap-3'>
                                    <span className='font-bold text-emerald-400'>{index + 1}.</span>
                                    <div>
                                        <span className='font-bold text-white'>{item.patientName}</span>
                                        <span className='text-slate-400 ml-2'>({item.checkInTime})</span>
                                    </div>
                                </div>
                                <span className='px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold'>
                                    Served
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistQueue;
