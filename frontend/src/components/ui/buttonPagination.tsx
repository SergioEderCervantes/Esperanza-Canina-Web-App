"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ButtonPaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

export function ButtonPagination({
  currentPage,
  totalPages,
  onChangePage,
}: ButtonPaginationProps) {
  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
        className="px-1 py-1 rounded-lg bg-transparent disabled:opacity-50 text-white"
      >
        <ChevronLeft size={24} className="text-blue-500" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const num = i + 1;
        return (
          <button
            key={num}
            onClick={() => onChangePage(num)}
            className={`px-3 text-lg bg-transparent ${
              currentPage === num
                ? " text-blue-500 text-xl font-bold"
                : " text-black hover:text-blue-400"
            }`}
          >
            {num}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className="px-2 py-2 rounded-lg bg-transparent disabled:opacity-50 text-white"
      >
        <ChevronRight size={24} className="text-blue-500" />
      </button>
    </div>
  );
}
