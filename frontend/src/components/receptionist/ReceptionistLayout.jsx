import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { 
    LayoutDashboard, Calendar, Clock, Users, UserPlus, ListOrdered, User, LogOut, ClipboardList, ChevronRight 
} from 'lucide-react';

const ReceptionistLayout = ({ children }) => {
    const navigate = useNavigate();

    const [receptionistUser] = useState(() => {
        const saved = localStorage.getItem('receptionist_user');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { console.error(e); }
        }
        return {
            name: "Olivia Smith",
            email: "olivia.smith@example.com",
            phone: "+1 987 654 3210",
            role: "Receptionist",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
        };
    });

    const handleLogout = () => {
        localStorage.removeItem('receptionist_token');
        localStorage.removeItem('receptionist_user');
        navigate('/receptionist/logout-success');
    };

    const navItems = [
        { path: '/receptionist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/receptionist/appointments', label: 'Appointments', icon: Calendar },
        { path: '/receptionist/schedule', label: 'Schedule', icon: Clock },
        { path: '/receptionist/patients', label: 'Patients', icon: Users },
        { path: '/receptionist/queue', label: 'Queue', icon: ListOrdered },
        { path: '/receptionist/add-appointment', label: 'Add Appointment', icon: UserPlus },
        { path: '/receptionist/profile', label: 'Profile', icon: User }
    ];

    return (
        <div className='min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col md:flex-row font-sans'>
            {/* ------------ Receptionist Left Sidebar ------------ */}
            <aside className='w-full md:w-64 bg-slate-900/90 border-r border-slate-800/80 p-5 shrink-0 backdrop-blur-md flex flex-col justify-between space-y-6'>
                <div className='space-y-6'>
                    {/* Logo Header */}
                    <div className='flex items-center gap-3 pb-4 border-b border-slate-800/80'>
                        <img
                            onClick={() => navigate('/receptionist/dashboard')}
                            className='w-36 cursor-pointer brightness-110'
                            src={assets.logo}
                            alt='MediCare Logo'
                        />
                        <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30 flex items-center gap-1 shrink-0'>
                            <ClipboardList size={10} /> Reception
                        </span>
                    </div>

                    {/* Receptionist User Card */}
                    <div className='flex items-center gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl'>
                        <img
                            className='w-11 h-11 rounded-xl object-cover border border-slate-700'
                            src={receptionistUser.image}
                            alt={receptionistUser.name}
                        />
                        <div className='overflow-hidden text-left'>
                            <h3 className='text-xs font-bold text-white truncate'>{receptionistUser.name}</h3>
                            <p className='text-[10px] text-pink-400 font-medium truncate'>Front Desk {receptionistUser.role}</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className='space-y-1 text-left'>
                        <p className='text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2'>Clinic Desk</p>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-semibold shadow-md shadow-pink-500/20'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                        }`
                                    }
                                >
                                    <div className='flex items-center gap-3'>
                                        <Icon size={16} />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight size={12} className='opacity-40' />
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Logout Actions */}
                <div className='space-y-3 pt-4 border-t border-slate-800/80'>
                    <button
                        onClick={() => navigate('/')}
                        className='w-full py-2 px-3 bg-slate-800/60 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2'
                    >
                        <span>Switch to Patient Site</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className='w-full py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer'
                    >
                        <LogOut size={14} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full'>
                {children}
            </main>
        </div>
    );
};

export default ReceptionistLayout;
