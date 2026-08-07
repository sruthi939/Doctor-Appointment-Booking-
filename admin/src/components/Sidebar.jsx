import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    UserPlus, 
    Calendar, 
    CreditCard, 
    Stethoscope, 
    Tag, 
    BarChart3, 
    Settings, 
    LogOut, 
    ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/users', name: 'Users', icon: Users },
        { path: '/doctors', name: 'Doctors', icon: Stethoscope },
        { path: '/appointments', name: 'Appointments', icon: Calendar },
        { path: '/payments', name: 'Payments', icon: CreditCard },
        { path: '/specialties', name: 'Specialties', icon: UserPlus },
        { path: '/coupons', name: 'Coupons', icon: Tag },
        { path: '/reports', name: 'Reports', icon: BarChart3 },
        { path: '/settings', name: 'Settings', icon: Settings }
    ];

    return (
        <aside className='w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-4 sm:p-5 flex flex-col justify-between shrink-0 backdrop-blur-xl text-left'>
            <div className='space-y-5'>
                {/* Brand Logo */}
                <div className='flex items-center gap-3 px-2 py-1'>
                    <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20'>
                        <ShieldCheck size={22} />
                    </div>
                    <div>
                        <h2 className='font-extrabold text-white text-base tracking-tight'>MediCare</h2>
                        <p className='text-[10px] font-bold uppercase tracking-widest text-purple-400'>Admin Panel</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className='space-y-1'>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                                        isActive
                                            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`
                                }
                            >
                                <Icon size={16} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer */}
            <div className='pt-4 border-t border-slate-800 mt-4'>
                <button
                    onClick={handleLogout}
                    className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-950 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer'
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
