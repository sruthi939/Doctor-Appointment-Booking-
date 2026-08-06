import { useState } from 'react';

export const usePagination = (items = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToPage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

    return { currentPage, totalPages, currentItems, nextPage, prevPage, goToPage };
};
