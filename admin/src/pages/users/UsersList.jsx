import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Users, Plus, Search, X } from 'lucide-react';
import { fetchUsers, addUser } from '../../services/userService';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Patient');
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
        await addUser({ name, email, role: role === 'Patient' ? 'USER' : 'DOCTOR', phone });
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPhone('');
        load();
    };

    const filtered = users.filter(u =>
        (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header matching Diagram */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <Users className='text-purple-500' size={28} />
                            Users Management
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            View and manage system users, patients and doctors.
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search user...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer'
                        >
                            <Plus size={16} /> + Add User
                        </button>
                    </div>
                </div>

                {/* Table matching Diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading users...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No users registered.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Name</th>
                                        <th className='pb-3 px-2'>Email</th>
                                        <th className='pb-3 px-2'>Role</th>
                                        <th className='pb-3 px-2'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-white'>{item.name}</td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.email}</td>
                                            <td className='py-4 px-2 font-bold text-purple-400'>{item.role === 'USER' ? 'Patient' : item.role}</td>
                                            <td className='py-4 px-2'>
                                                <span className='px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'>
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Modal "+ Add User" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <Users className='text-purple-500' size={20} /> Add New User
                            </h2>

                            <form onSubmit={handleCreateUser} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Full Name</label>
                                    <input
                                        type='text'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='John Doe'
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
                                        placeholder='john@example.com'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Role</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    >
                                        <option value='Patient'>Patient</option>
                                        <option value='Doctor'>Doctor</option>
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
                                    Create User Account
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UsersList;
