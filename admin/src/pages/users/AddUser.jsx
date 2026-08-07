import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import { addUser } from '../../services/userService';
import { UserPlus } from 'lucide-react';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Patient');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser({ name, email, role: role === 'Patient' ? 'USER' : role });
        alert('User account created!');
        setName('');
        setEmail('');
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl mx-auto space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Add New User' subtitle='Register a new system user or staff account.' />

                <form onSubmit={handleSubmit} className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-5 text-xs'>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Full Name</label>
                        <input
                            type='text'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='John Doe'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Email Address</label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='john@example.com'
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        />
                    </div>
                    <div>
                        <label className='block font-bold text-slate-300 mb-1.5'>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-white'
                        >
                            <option value='Patient'>Patient</option>
                            <option value='Doctor'>Doctor</option>
                            <option value='Receptionist'>Receptionist</option>
                            <option value='Accountant'>Accountant</option>
                        </select>
                    </div>

                    <button type='submit' className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-2 cursor-pointer uppercase tracking-wider'>
                        <UserPlus size={16} /> Create User
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddUser;
