import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { FileText, Plus, Download, Mail, Search, CheckCircle2, X } from 'lucide-react';
import { fetchInvoices, createInvoiceApi } from '../../services/accountantService';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');

    const load = async () => {
        setLoading(true);
        const res = await fetchInvoices();
        if (res.invoices) {
            setInvoices(res.invoices);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateInvoice = async (e) => {
        e.preventDefault();
        await createInvoiceApi({
            patientName,
            patientEmail,
            amount,
            status: 'Paid',
            items: [{ description: serviceDesc || 'Consultation & Treatment', cost: Number(amount) }]
        });
        setIsModalOpen(false);
        setPatientName('');
        setPatientEmail('');
        setAmount('');
        setServiceDesc('');
        load();
    };

    const filtered = invoices.filter(inv =>
        inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <FileText className='text-amber-500' size={28} />
                            Invoices & Billing
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Generate invoices and manage billing details for patient appointments.
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search invoice by ID, patient...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold rounded-2xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5'
                        >
                            <Plus size={16} /> + New Invoice
                        </button>
                    </div>
                </div>

                {/* Invoices List Table matching Step 4 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading invoices...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No invoices found.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Invoice ID</th>
                                        <th className='pb-3 px-2'>Patient</th>
                                        <th className='pb-3 px-2'>Amount</th>
                                        <th className='pb-3 px-2'>Status</th>
                                        <th className='pb-3 px-2 text-right'>Date</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id || item.invoiceId} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-amber-400'>{item.invoiceId}</td>
                                            <td className='py-4 px-2 font-semibold text-white'>{item.patientName}</td>
                                            <td className='py-4 px-2 font-bold text-white'>${item.amount}.00</td>
                                            <td className='py-4 px-2'>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                                                    item.status === 'Paid'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right text-slate-400 font-medium'>{item.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Recent Invoice Detail Preview Card matching Step 4 diagram */}
                {filtered.length > 0 && (
                    <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4 max-w-md'>
                        <h2 className='text-sm font-bold text-slate-300 uppercase tracking-wider'>Recent Invoice</h2>
                        <div className='p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs'>
                            <p className='font-bold text-amber-400 text-sm'>{filtered[0].invoiceId}</p>
                            <p className='text-slate-400'>Patient: <strong className='text-white'>{filtered[0].patientName}</strong></p>
                            <p className='text-slate-400'>Amount: <strong className='text-white'>${filtered[0].amount}.00</strong> &bull; Date: <span className='text-white'>{filtered[0].date}</span></p>
                            <div className='flex items-center gap-2 pt-3'>
                                <button className='flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer'>
                                    <Download size={14} /> Download
                                </button>
                                <button className='flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-500/20'>
                                    <Mail size={14} /> Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for "+ New Invoice" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <FileText className='text-amber-500' size={20} /> Create New Invoice
                            </h2>

                            <form onSubmit={handleCreateInvoice} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Patient Name</label>
                                    <input
                                        type='text'
                                        required
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder='Enter patient name...'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Patient Email (Optional)</label>
                                    <input
                                        type='email'
                                        value={patientEmail}
                                        onChange={(e) => setPatientEmail(e.target.value)}
                                        placeholder='patient@example.com'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Invoice Amount ($)</label>
                                    <input
                                        type='number'
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder='150'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Service Description</label>
                                    <input
                                        type='text'
                                        value={serviceDesc}
                                        onChange={(e) => setServiceDesc(e.target.value)}
                                        placeholder='e.g. General Consultation & Lab Test'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 cursor-pointer uppercase tracking-wider'
                                >
                                    Generate Invoice
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AccountantLayout>
    );
};

export default Invoices;
