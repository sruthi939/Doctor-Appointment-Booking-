import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ArrowLeftRight, 
    FileText, 
    TrendingDown, 
    BarChart3, 
    RotateCcw, 
    Settings, 
    LogOut, 
    Calculator,
    Bell
} from 'lucide-react';

const AccountantLayout = ({ children }) => {
    const navigate = useNavigate();

    const accountantUser = (() => {
        try {
            const saved = localStorage.getItem('accountant_user');
            return saved ? JSON.parse(saved) : { name: 'Olivia Smith', email: 'accountant@medicare.com' };
        } catch (e) {
            return { name: 'Olivia Smith', email: 'accountant@medicare.com' };
        }
    })();

    const handleLogout = () => {
        localStorage.removeItem('accountant_token');
        localStorage.removeItem('accountant_user');
        navigate('/accountant/logout-success');
    };

    const navItems = [
        { path: '/accountant/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/accountant/transactions', name: 'Transactions', icon: ArrowLeftRight },
        { path: '/accountant/invoices', name: 'Invoices', icon: FileText },
        { path: '/accountant/expenses', name: 'Expenses', icon: TrendingDown },
        { path: '/accountant/reports', name: 'Reports', icon: BarChart3 },
        { path: '/accountant/refunds', name: 'Refunds', icon: RotateCcw },
        { path: '/accountant/settings', name: 'Settings', icon: Settings }
    ];

    return (
        <div className='min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col md:flex-row font-sans text-left'>
            {/* Sidebar */}
            <aside className='w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-4 sm:p-6 flex flex-col justify-between shrink-0 backdrop-blur-xl'>
                <div className='space-y-6'>
                    {/* Brand */}
                    <div className='flex items-center gap-3 px-2'>
                        <div className='w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20'>
                            <Calculator size={22} />
                        </div>
                        <div>
                            <h2 className='font-extrabold text-white text-lg tracking-tight'>MediCare</h2>
                            <p className='text-[10px] font-bold uppercase tracking-widest text-amber-400'>Accountant Portal</p>
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
                                                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
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
                        <div className='w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs shrink-0'>
                            {accountantUser.name ? accountantUser.name[0] : 'A'}
                        </div>
                        <div className='overflow-hidden'>
                            <p className='text-xs font-bold text-white truncate'>{accountantUser.name}</p>
                            <p className='text-[10px] text-slate-400 truncate'>{accountantUser.email}</p>
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

export default AccountantLayout;
