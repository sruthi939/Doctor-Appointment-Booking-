import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import StatusBadge from '../../components/StatusBadge';
import { fetchUsers } from '../../services/userService';

const UserList = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchUsers();
            if (res.users) setUsers(res.users);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = users.filter(u =>
        (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Users List'
                    subtitle='Manage system user accounts.'
                    action={<SearchBar value={search} onChange={setSearch} placeholder='Search user...' />}
                />

                <Table headers={['User Name', 'Email', 'Role', 'Status']}>
                    {loading ? (
                        <tr><td colSpan={4} className='py-6 text-center text-slate-400'>Loading users...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={4} className='py-6 text-center text-slate-400'>No users found.</td></tr>
                    ) : (
                        filtered.map((item) => (
                            <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                <td className='py-4 px-2 font-bold text-white'>{item.name}</td>
                                <td className='py-4 px-2 text-slate-300'>{item.email}</td>
                                <td className='py-4 px-2 font-bold text-purple-400'>{item.role === 'USER' ? 'Patient' : item.role}</td>
                                <td className='py-4 px-2 text-right'><StatusBadge status='Active' /></td>
                            </tr>
                        ))
                    )}
                </Table>
            </div>
        </AdminLayout>
    );
};

export default UserList;
