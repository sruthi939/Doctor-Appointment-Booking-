import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    UserPlus, 
    Users, 
    Calendar, 
    UserCheck, 
    LogOut, 
    ShieldCheck
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();

    const adminUser = (() => {
        try {
            const saved = localStorage.getItem('admin_user');
            return saved ? JSON.parse(saved) : { name: 'System Admin', email: 'admin@medicare.com' };
        } catch (e) {
            return { name: 'System Admin', email: 'admin@medicare.com' };
        }
    })();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/add-doctor', name: 'Add Doctor', icon: UserPlus },
        { path: '/admin/doctors', name: 'Doctors List', icon: Users },
        { path: '/admin/appointments', name: 'Appointments', icon: Calendar },
        { path: '/admin/patients', name: 'Patients', icon: UserCheck }
    ];

    return (
        <div className='min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col md:flex-row font-sans text-left'>
            {/* Sidebar */}
            <aside className='w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-4 sm:p-6 flex flex-col justify-between shrink-0 backdrop-blur-xl'>
                <div className='space-y-6'>
                    {/* Brand */}
                    <div className='flex items-center gap-3 px-2'>
                        <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20'>
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <h2 className='font-extrabold text-white text-lg tracking-tight'>MediCare</h2>
                            <p className='text-[10px] font-bold uppercase tracking-widest text-purple-400'>Admin Portal</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className='space-y-1'>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                        }`
                                    }
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* User & Logout Footer */}
                <div className='pt-4 border-t border-slate-800 space-y-3 mt-4'>
                    <div className='flex items-center gap-3 px-2'>
                        <div className='w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 text-xs shrink-0'>
                            {adminUser.name ? adminUser.name[0] : 'A'}
                        </div>
                        <div className='overflow-hidden'>
                            <p className='text-xs font-bold text-white truncate'>{adminUser.name}</p>
                            <p className='text-[10px] text-slate-400 truncate'>{adminUser.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-950 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer'
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className='flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full'>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
