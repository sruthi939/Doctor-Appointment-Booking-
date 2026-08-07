import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { Bell, Send } from 'lucide-react';
import { fetchNotifications } from '../../services/notificationService';
import { useNavigate } from 'react-router-dom';

const NotificationList = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetchNotifications();
            if (res.notifications) setNotifications(res.notifications);
        };
        load();
    }, []);

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='System Notifications'
                    subtitle='Broadcast system alerts and view notification logs.'
                    action={
                        <button onClick={() => navigate('/admin/notifications/send')} className='px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg'>
                            <Send size={16} /> Broadcast Alert
                        </button>
                    }
                />

                <div className='space-y-3'>
                    {notifications.map((item) => (
                        <div key={item.id} className='bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex items-center justify-between text-xs'>
                            <div className='flex items-center gap-3'>
                                <Bell className='text-purple-400 shrink-0' size={20} />
                                <div>
                                    <h3 className='font-bold text-white text-sm'>{item.title}</h3>
                                    <p className='text-slate-400 mt-0.5'>{item.message}</p>
                                </div>
                            </div>
                            <span className='text-[10px] text-slate-500 font-semibold'>{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default NotificationList;
