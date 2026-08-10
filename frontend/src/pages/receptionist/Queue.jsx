import React, { useEffect, useState } from 'react';
import ReceptionistLayout from '../../components/receptionist/ReceptionistLayout';
import { ListOrdered, CheckCircle2, Clock } from 'lucide-react';
import { fetchQueueList, markQueueServedApi } from '../../services/receptionistService';

const ReceptionistQueue = () => {
    const [activeTab, setActiveTab] = useState('Waiting');
    const [queueItems, setQueueItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadQueue = async () => {
        setLoading(true);
        const res = await fetchQueueList();
        if (res?.queue) {
            setQueueItems(res.queue);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadQueue();
    }, []);

    const handleMarkServed = async (id) => {
        await markQueueServedApi(id);
        setQueueItems(prev => prev.map(q => (q._id === id || q.id === id) ? { ...q, isCompleted: true } : q));
    };

    const waitingList = queueItems.filter(q => !q.isCompleted && !q.cancelled);
    const servedList = queueItems.filter(q => q.isCompleted);

    const getPatientName = (item) => item.userData?.name || item.patientName || item.phone || 'Patient';
    const getDoctorName = (item) => item.docData?.name || item.doctorName || 'Doctor';

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
                            Real-time waiting list queue for walk-in and scheduled patients.
                        </p>
                    </div>

                    {/* Filter Tabs */}
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
                            Completed ({servedList.length})
                        </button>
                    </div>
                </div>

                {/* Queue Cards List */}
                {loading ? (
                    <p className='text-slate-400 text-xs py-8 text-center'>Loading queue from database...</p>
                ) : activeTab === 'Waiting' ? (
                    <div className='space-y-4'>
                        {waitingList.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No patients currently waiting in queue.</p>
                        ) : (
                            waitingList.map((item, index) => {
                                const qId = item._id || item.id;
                                return (
                                    <div
                                        key={qId || index}
                                        className='bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold flex items-center justify-center text-sm shrink-0'>
                                                #{index + 1}
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-white text-base'>{getPatientName(item)}</h3>
                                                <p className='text-xs text-slate-400 flex items-center gap-2 mt-0.5'>
                                                    <span>Doctor: <strong className='text-slate-200'>{getDoctorName(item)}</strong></span>
                                                    <span>&bull;</span>
                                                    <span className='text-amber-400 font-semibold flex items-center gap-1'>
                                                        <Clock size={12} /> {item.slotTime || '09:00 AM'} ({item.slotDate})
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleMarkServed(qId)}
                                            className='px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center gap-1.5 justify-center cursor-pointer shrink-0'
                                        >
                                            <CheckCircle2 size={16} /> Mark Checked-In
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {servedList.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No completed patients today.</p>
                        ) : (
                            servedList.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className='bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-md flex items-center justify-between opacity-80'
                                >
                                    <div>
                                        <h3 className='font-bold text-slate-200 text-sm line-through'>{getPatientName(item)}</h3>
                                        <p className='text-xs text-slate-500 mt-0.5'>Doctor: {getDoctorName(item)} &bull; {item.slotTime}</p>
                                    </div>
                                    <span className='px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold'>
                                        Completed
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistQueue;
