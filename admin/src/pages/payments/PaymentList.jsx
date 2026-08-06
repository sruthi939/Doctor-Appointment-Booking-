import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import StatusBadge from '../../components/StatusBadge';
import { fetchPayments } from '../../services/paymentService';

const PaymentList = () => {
    const [search, setSearch] = useState('');
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetchPayments();
            if (res.payments) setPayments(res.payments);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = payments.filter(p =>
        (p.patient || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.transactionId || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header
                    title='Payment List'
                    subtitle='Track system-wide payment transactions.'
                    action={<SearchBar value={search} onChange={setSearch} placeholder='Search transaction...' />}
                />

                <Table headers={['Transaction ID', 'Patient', 'Amount', 'Method', 'Status']}>
                    {loading ? (
                        <tr><td colSpan={5} className='py-6 text-center text-slate-400'>Loading payments...</td></tr>
                    ) : filtered.length === 0 ? (
                        <tr><td colSpan={5} className='py-6 text-center text-slate-400'>No transactions found.</td></tr>
                    ) : (
                        filtered.map((item, idx) => (
                            <tr key={idx} className='hover:bg-slate-800/40 transition-colors'>
                                <td className='py-4 px-2 font-bold text-purple-400'>{item.transactionId}</td>
                                <td className='py-4 px-2 font-semibold text-white'>{item.patient}</td>
                                <td className='py-4 px-2 font-bold text-white'>${item.amount}.00</td>
                                <td className='py-4 px-2 text-slate-300'>{item.method}</td>
                                <td className='py-4 px-2 text-right'><StatusBadge status={item.status} /></td>
                            </tr>
                        ))
                    )}
                </Table>
            </div>
        </AdminLayout>
    );
};

export default PaymentList;
