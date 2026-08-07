import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import StatusBadge from '../../components/StatusBadge';
import { fetchPatients } from '../../services/patientService';

const PatientList = () => {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchPatients();
            if (res.users) setPatients(res.users);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = patients.filter(p =>
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Patient Directory'
                    subtitle='Manage registered patient accounts.'
                    action={<SearchBar value={search} onChange={setSearch} placeholder='Search patient...' />}
                />

                <Table headers={['Patient Name', 'Email', 'Phone', 'Status']}>
                    {loading ? (
                        <tr><td colSpan={4} className='py-6 text-center text-slate-400'>Loading patients...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={4} className='py-6 text-center text-slate-400'>No patients found.</td></tr>
                    ) : (
                        filtered.map((item) => (
                            <tr key={item._id || item.id} className='hover:bg-slate-800/40 transition-colors'>
                                <td className='py-4 px-2 font-bold text-white'>{item.name}</td>
                                <td className='py-4 px-2 text-slate-300'>{item.email}</td>
                                <td className='py-4 px-2 text-slate-300'>{item.phone || 'N/A'}</td>
                                <td className='py-4 px-2 text-right'><StatusBadge status='Active' /></td>
                            </tr>
                        ))
                    )}
                </Table>
            </div>
        </AdminLayout>
    );
};

export default PatientList;
