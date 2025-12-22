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

  const handleChangePage = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    onChangePage(page);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
        className="px-1 py-1 rounded-lg bg-transparent disabled:opacity-50"
      >
        <ChevronLeft size={24} className="text-blue-500" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const num = i + 1;
        return (
          <button
            key={num}
            onClick={() => handleChangePage(num)}
            className={`px-3 text-lg bg-transparent ${
              currentPage === num
                ? "text-blue-500 text-xl font-bold"
                : "text-black hover:text-blue-400"
            }`}
          >
            {num}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
        className="px-2 py-2 rounded-lg bg-transparent disabled:opacity-50"
      >
        <ChevronRight size={24} className="text-blue-500" />
      </button>
    </div>
  );
}
