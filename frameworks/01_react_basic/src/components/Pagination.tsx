import React from "react";

interface PaginationProps {
    currentPage: number;
    hasMore: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, hasMore, onPrevious, onNext }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            {/* Botón de página anterior */}
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-4 ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 cursor-pointer"
                    }`}
            >
                Previous
            </button>

            {/* Indicador de página actual */}
            <span className="text-gray-700 font-medium">Page {currentPage}</span>

            {/* Botón de página siguiente */}
            <button
                onClick={onNext}
                disabled={!hasMore}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-4 ${!hasMore
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 cursor-pointer"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
