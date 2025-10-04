'use client'

import React from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center mt-6 mb-6 items-center gap-1">
      {/* Prev Button */}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-[#d4b262] hover:text-white'
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
            currentPage === i + 1
              ? 'bg-[#d4b262] text-white border-[#d4b262]'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-[#d4b262] hover:text-white'
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-[#d4b262] hover:text-white'
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
