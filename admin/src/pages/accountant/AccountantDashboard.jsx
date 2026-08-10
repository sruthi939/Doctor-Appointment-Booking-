import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DollarSign, CreditCard, Users, Stethoscope, RefreshCw, UserCheck, ShieldCheck, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const AccountantDashboard = () => {
    const { aToken, backendUrl: adminBackendUrl } = useContext(AdminContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || adminBackendUrl || 'http://localhost:5000';
    const accountantToken = localStorage.getItem('accountantToken') || aToken;
    const accountantName = localStorage.getItem('accountant_name') || 'Accountant';
    const accountantEmail = localStorage.getItem('accountant_email') || 'accountant@medicare.com';

    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/accountant/dashboard', {
                headers: { atoken: aToken, actoken: accountantToken, token: accountantToken }
            });
            if (data.success) {
                setDashData(data.dashData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, [aToken]);

    return (
        <div className='space-y-6 text-left w-full max-w-6xl m-auto'>
            {/* Account Profile Card showing exact Logged In Email & Name */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold text-2xl shrink-0'>
                        {accountantName.charAt(0).toUpperCase()}
                    </div>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl font-extrabold text-slate-900'>{accountantName}</h1>
                            <span className='px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200'>
                                Finance & Payments Desk
                            </span>
                        </div>
                        <p className='text-xs text-slate-500 font-mono flex items-center gap-1.5'>
                            <Mail size={13} className='text-amber-500' />
                            <span>Logged In Email: <strong className='text-slate-800'>{accountantEmail}</strong></span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={getDashboardData}
                    className='px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer'
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Financial Data
                </button>
            </div>

            {/* Financial Overview Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0'>
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Total Revenue</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            ${dashData?.totalRevenue || 0}.00
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0'>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Total Transactions</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalTransactions || 0}
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0'>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Registered Doctors</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalDoctors || 0}
                        </h3>
                    </div>
                </div>

                <div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0'>
                        <Users size={24} />
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs font-bold uppercase tracking-wider'>Registered Patients</p>
                        <h3 className='text-2xl font-extrabold text-slate-900 mt-0.5'>
                            {dashData?.totalPatients || 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Transactions & Financial Records Table */}
            <div className='bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4'>
                <div>
                    <h2 className='text-lg font-bold text-slate-900'>Recent Billing & Transactions</h2>
                    <p className='text-slate-500 text-xs mt-0.5'>Real patient appointment payment records from database.</p>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-xs'>
                        <thead className='bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]'>
                            <tr>
                                <th className='p-4 rounded-tl-2xl'>Transaction ID</th>
                                <th className='p-4'>Patient</th>
                                <th className='p-4'>Doctor</th>
                                <th className='p-4'>Date</th>
                                <th className='p-4'>Payment Method</th>
                                <th className='p-4'>Amount</th>
                                <th className='p-4 rounded-tr-2xl'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {dashData?.recentTransactions && dashData.recentTransactions.length > 0 ? (
                                dashData.recentTransactions.map((txn, index) => (
                                    <tr key={txn.id || index} className='hover:bg-slate-50/80 transition-colors'>
                                        <td className='p-4 font-mono font-bold text-[#5F6FFF]'>{txn.transactionId}</td>
                                        <td className='p-4 font-bold text-slate-900'>{txn.patientName}</td>
                                        <td className='p-4 text-slate-600'>{txn.doctorName}</td>
                                        <td className='p-4 text-slate-500 font-mono'>{txn.date}</td>
                                        <td className='p-4 text-slate-600 font-medium'>{txn.paymentMethod}</td>
                                        <td className='p-4 font-extrabold text-slate-900'>${txn.amount}.00</td>
                                        <td className='p-4'>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                txn.status === 'Completed'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    : txn.status === 'Refund Pending'
                                                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='p-8 text-center text-slate-400 font-medium'>
                                        No billing transactions recorded in database yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountantDashboard;
