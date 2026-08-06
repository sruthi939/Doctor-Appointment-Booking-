import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Send } from 'lucide-react';
import { sendNotification } from '../../services/notificationService';

const SendNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        await sendNotification({ title, message });
        alert('Notification broadcasted to all users!');
        setTitle('');
        setMessage('');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Broadcast System Alert' subtitle='Send notification email or app alert to users.' />

                <form onSubmit={handleSend} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Notification Title</label>
                        <input
                            type='text'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='e.g. Server Maintenance Alert'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Message Body</label>
                        <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Write alert message...'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white'
                        ></textarea>
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <Send size={16} /> Broadcast Now
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default SendNotification;
