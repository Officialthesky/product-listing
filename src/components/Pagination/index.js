import React from 'react';

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20]
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 1; // Number of pages to show before and after current page
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current page
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t gap-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label htmlFor="itemsPerPage" className="text-gray-600 whitespace-nowrap">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          className="border border-gray-300 rounded px-2 py-1"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-gray-500 whitespace-nowrap">
          Total: {totalItems} items
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-100 rounded border disabled:opacity-50 hover:bg-gray-200 transition-colors"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">←</span>
        </button>

        <div className="hidden xs:flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 transition-colors'
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <span className="xs:hidden text-sm text-gray-600">
          {currentPage} / {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-100 rounded border disabled:opacity-50 hover:bg-gray-200 transition-colors"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;