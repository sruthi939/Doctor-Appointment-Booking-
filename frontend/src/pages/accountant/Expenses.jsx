import React, { useEffect, useState } from 'react';
import AccountantLayout from '../../components/accountant/AccountantLayout';
import { TrendingDown, Plus, Trash2, Search, X } from 'lucide-react';
import { fetchExpenses, addExpenseApi, deleteExpenseApi } from '../../services/accountantService';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [category, setCategory] = useState('Utilities');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const load = async () => {
        setLoading(true);
        const res = await fetchExpenses();
        if (res.expenses) {
            setExpenses(res.expenses);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        await addExpenseApi({ category, amount, description });
        setIsModalOpen(false);
        setAmount('');
        setDescription('');
        load();
    };

    const handleDelete = async (id) => {
        await deleteExpenseApi(id);
        setExpenses(prev => prev.filter(e => e._id !== id));
    };

    const filtered = expenses.filter(e =>
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AccountantLayout>
            <div className='space-y-6 text-left animate-in fade-in duration-300'>
                {/* Header */}
                <div className='bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2'>
                            <TrendingDown className='text-rose-500' size={28} />
                            Manage Expenses
                        </h1>
                        <p className='text-slate-400 text-sm mt-1'>
                            Add and manage clinic operational, utility and equipment expenses.
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='relative flex-1 sm:w-64'>
                            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search expense...'
                                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500'
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold rounded-2xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5'
                        >
                            <Plus size={16} /> + Add Expense
                        </button>
                    </div>
                </div>

                {/* Expenses Table matching Step 6 diagram */}
                <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4'>
                    <div className='overflow-x-auto'>
                        {loading ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>Loading expenses...</p>
                        ) : filtered.length === 0 ? (
                            <p className='text-slate-400 text-xs py-8 text-center'>No expenses recorded.</p>
                        ) : (
                            <table className='w-full text-left text-xs'>
                                <thead>
                                    <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                                        <th className='pb-3 px-2'>Category</th>
                                        <th className='pb-3 px-2'>Description</th>
                                        <th className='pb-3 px-2'>Amount</th>
                                        <th className='pb-3 px-2'>Date</th>
                                        <th className='pb-3 px-2 text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/60'>
                                    {filtered.map((item) => (
                                        <tr key={item._id} className='hover:bg-slate-800/40 transition-colors'>
                                            <td className='py-4 px-2 font-bold text-white'>
                                                <span className='px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-[11px] font-bold'>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-slate-300 font-medium'>{item.description || item.category}</td>
                                            <td className='py-4 px-2 font-bold text-rose-400'>${item.amount}.00</td>
                                            <td className='py-4 px-2 text-slate-400 font-medium'>{item.date}</td>
                                            <td className='py-4 px-2 text-right'>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className='p-2 text-slate-400 hover:text-rose-400 bg-slate-950 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer border border-slate-800'
                                                    title='Delete Expense'
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Modal for "+ Add Expense" */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 text-left font-sans'>
                        <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative'>
                            <button onClick={() => setIsModalOpen(false)} className='absolute top-5 right-5 text-slate-400 hover:text-white'>
                                <X size={18} />
                            </button>
                            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
                                <TrendingDown className='text-rose-500' size={20} /> Add Clinic Expense
                            </h2>

                            <form onSubmit={handleAddExpense} className='space-y-4 text-xs'>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Expense Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    >
                                        <option value='Utilities'>Utilities</option>
                                        <option value='Equipment'>Equipment</option>
                                        <option value='Marketing'>Marketing</option>
                                        <option value='Stationery'>Stationery</option>
                                        <option value='Maintenance'>Maintenance</option>
                                        <option value='Salaries'>Salaries</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Expense Amount ($)</label>
                                    <input
                                        type='number'
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder='120'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-slate-400 mb-1'>Description / Details</label>
                                    <input
                                        type='text'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder='e.g. Electricity Bill & Water Charge'
                                        className='w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 cursor-pointer uppercase tracking-wider'
                                >
                                    Save Expense Record
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AccountantLayout>
    );
};

export default Expenses;
