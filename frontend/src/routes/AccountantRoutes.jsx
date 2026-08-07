import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AccountantLogin from '../pages/accountant/AccountantLogin';
import AccountantDashboard from '../pages/accountant/Dashboard';
import Transactions from '../pages/accountant/Transactions';
import Invoices from '../pages/accountant/Invoices';
import Reports from '../pages/accountant/Reports';
import Expenses from '../pages/accountant/Expenses';
import Refunds from '../pages/accountant/Refunds';
import Settings from '../pages/accountant/Settings';
import { ProtectedAccountantRoute } from '../components/RoleProtectedRoutes';

const AccountantLogoutSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-center font-sans'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200'>
                <div className='w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/20'>
                    <CheckCircle2 size={44} />
                </div>
                <div>
                    <h2 className='text-2xl font-extrabold text-white'>Logged Out Successfully!</h2>
                    <p className='text-slate-400 text-xs mt-1'>You have been logged out securely from the accountant portal.</p>
                </div>
                <button
                    onClick={() => navigate('/accountant/login')}
                    className='w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 cursor-pointer'
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

const AccountantRoutes = () => {
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path='/accountant/login' element={<AccountantLogin />} />
            <Route path='/login' element={<AccountantLogin />} />
            <Route path='/accountant/logout-success' element={<AccountantLogoutSuccess />} />
            <Route path='/logout-success' element={<AccountantLogoutSuccess />} />

            {/* Protected Accountant Routes */}
            <Route element={<ProtectedAccountantRoute />}>
                <Route path='/accountant/dashboard' element={<AccountantDashboard />} />
                <Route path='/accountant/transactions' element={<Transactions />} />
                <Route path='/accountant/invoices' element={<Invoices />} />
                <Route path='/accountant/reports' element={<Reports />} />
                <Route path='/accountant/expenses' element={<Expenses />} />
                <Route path='/accountant/refunds' element={<Refunds />} />
                <Route path='/accountant/settings' element={<Settings />} />

                {/* Fallbacks */}
                <Route path='/dashboard' element={<AccountantDashboard />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='/refunds' element={<Refunds />} />
                <Route path='/settings' element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default AccountantRoutes;
