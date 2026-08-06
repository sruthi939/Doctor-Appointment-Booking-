import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <div className='relative w-full sm:w-64'>
            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
            <input
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className='w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
            />
        </div>
    );
};

export default SearchBar;
