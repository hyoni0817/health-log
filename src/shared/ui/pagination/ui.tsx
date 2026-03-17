import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React, { FC, useState } from 'react';

interface PaginationProps {
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { total, pageSize = 10, onPageChange } = props;
  const pageRange = 5;
  const totalPages = Math.ceil(total / pageSize);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const groupIndex = Math.floor((currentPage - 1) / pageRange);
  const startPage = groupIndex * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  if (totalPages === 0) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevGroup = () => {
    const prevGroupStart = startPage - pageRange;
    handlePageChange(prevGroupStart);
  };

  const handleNextGroup = () => {
    const nextGroupStart = endPage + 1;
    handlePageChange(nextGroupStart);
  };

  return (
    <div className="flex items-center gap-2">
      {startPage > 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>
            <ChevronsLeft className={ChevronButtonClasses} />
          </button>
          <button onClick={handlePrevGroup}>
            <ChevronLeft className={ChevronButtonClasses} />
          </button>
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
        const page = index + startPage;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-md ${currentPage === page ? 'bg-(--color-gray-100) text-(--color-gray-800)' : 'border border-(--color-gray-100) text-(--color-gray-100) font-medium'}`}
          >
            {page}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          <button onClick={handleNextGroup}>
            <ChevronRight className={ChevronButtonClasses} />
          </button>
          <button onClick={() => handlePageChange(totalPages)}>
            <ChevronsRight className={ChevronButtonClasses} />
          </button>
        </>
      )}
    </div>
  );
};

const ChevronButtonClasses = 'text-(--color-gray-100)';
