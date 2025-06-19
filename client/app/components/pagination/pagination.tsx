import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2000;

    return (
        <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
        />
    );
}
