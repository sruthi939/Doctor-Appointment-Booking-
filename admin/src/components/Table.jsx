import React from 'react';

const Table = ({ headers = [], children, emptyText = 'No records found.' }) => {
    return (
        <div className='bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-4 text-left'>
            <div className='overflow-x-auto'>
                <table className='w-full text-left text-xs'>
                    <thead>
                        <tr className='border-b border-slate-800 text-slate-400 uppercase tracking-wider pb-3'>
                            {headers.map((h, i) => (
                                <th key={i} className={`pb-3 px-2 ${i === headers.length - 1 ? 'text-right' : ''}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-800/60'>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
