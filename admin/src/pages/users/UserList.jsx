import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Plus, Search, Shield, X, Check } from 'lucide-react';
import { fetchUsers, addUser, updateUserRoleApi } from '../../services/userService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleNotice, setRoleNotice] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('RECEPTIONIST');
    const [phone, setPhone] = useState('');

    const load = async () => {
        setLoading(true);
        const res = await fetchUsers();
        if (res.users) {
            setUsers(res.users);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        await addUser({ name, email, role, phone });
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPhone('');
        load();
    };

    const handleRoleChange = async (userId, newRole) => {
        const res = await updateUserRoleApi(userId, newRole);
        if (res.success) {
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            setRoleNotice(`Access role updated to ${newRole}`);
            setTimeout(() => setRoleNotice(''), 3000);
        }
    };

    const filtered = users.filter(u =>
        (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Users className='text-purple-500' size={28} />
                            Hospital Staff & User Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Admin panel to grant, update or revoke hospital staff access permissions.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search staff or user...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> + Add Staff Account
                        </button>
                    </div>
                </div>

                {roleNotice && (
                    <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2'>
                        <Check size={18} /> {roleNotice}
                    </div>
                )}

                {/* Table with Interactive Role Access Control */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading hospital accounts...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No accounts found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Name</th>
                                        <th className='pb-3 px-2'>Email</th>
                                        <th className='pb-3 px-2'>Access Role</th>
                                        <th className='pb-3 px-2 text-right'>Grant Role Permission</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-white'>{item.name}</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.email}</td>
                                            <td className='py-4 px-2 font-bold text-purple-400'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                    item.role === 'ADMIN'
                                                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                                                        : item.role === 'DOCTOR'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                        : item.role === 'ACCOUNTANT'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                        : item.role === 'RECEPTIONIST'
                                                        ? 'bg-pink-500/10 text-pink-400 border-pink-500/30'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                }`}>
                                                    {item.role === 'USER' ? 'Patient' : item.role}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right'>
                                                <select
                                                    value={item.role}
                                                    onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                                    className='bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer font-semibold'
                                                >
                                                    <option value='USER'>Patient</option>
                                                    <option value='DOCTOR'>Doctor</option>
                                                    <option value='RECEPTIONIST'>Receptionist</option>
                                                    <option value='ACCOUNTANT'>Accountant</option>
                                                    <option value='ADMIN'>Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Modal "+ Add Staff Account" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <Shield className='text-purple-500' size={20} /> Grant Hospital Staff Access
                            </h2>

                            <form onSubmit={handleCreateUser} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Staff Full Name</label>
                                    <input
                                        type='text'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter name...'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Email Address</label>
                                    <input
                                        type='email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='staff@medicare.com'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Assign Access Role</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold'
                                    >
                                        <option value='RECEPTIONIST'>Receptionist</option>
                                        <option value='ACCOUNTANT'>Accountant</option>
                                        <option value='DOCTOR'>Doctor</option>
                                        <option value='ADMIN'>Admin</option>
                                        <option value='USER'>Patient</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Phone Number</label>
                                    <input
                                        type='text'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder='+1 987 654 3210'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-purple-500/25 cursor-pointer uppercase tracking-wider'
                                >
                                    Confirm Access & Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UserList;
