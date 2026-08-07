import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Header from '../../components/Header';
import Table from '../../components/Table';
import StatusBadge from '../../components/StatusBadge';

const PaymentHistory = () => {
    const history = [
        { id: '#PAY001', patient: 'John Smith', amount: 50, date: '15 May 2026', status: 'Completed' },
        { id: '#PAY002', patient: 'Sarah Wilson', amount: 80, date: '14 May 2026', status: 'Completed' }
    ];

    return (
        <AdminLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                <Header title='Payment Log History' subtitle='Historical audit log of all financial receipts.' />

                <Table headers={['Log ID', 'Patient', 'Amount', 'Date', 'Status']}>
                    {history.map((h, i) => (
                        <tr key={i} className='hover:bg-slate-800/40 transition-colors'>
                            <td className='py-4 px-2 font-bold text-purple-400'>{h.id}</td>
                            <td className='py-4 px-2 font-semibold text-white'>{h.patient}</td>
                            <td className='py-4 px-2 font-bold text-white'>${h.amount}.00</td>
                            <td className='py-4 px-2 text-slate-300'>{h.date}</td>
                            <td className='py-4 px-2 text-right'><StatusBadge status={h.status} /></td>
                        </tr>
                    ))}
                </Table>
            </div>
        </AdminLayout>
    );
};

export default PaymentHistory;
