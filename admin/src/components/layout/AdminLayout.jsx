import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className='min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col md:flex-row font-sans text-left'>
            <Sidebar />
            <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
                <Navbar />
                <main className='flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
