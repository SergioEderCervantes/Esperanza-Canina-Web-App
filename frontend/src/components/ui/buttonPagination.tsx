"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  const [maxNumbers, setMaxNumbers] = useState(9);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setMaxNumbers(w < 480 ? 5 : w < 768 ? 7 : 9);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = useMemo(() => {
    const items: Array<number | "…"> = [];
    const total = totalPages;
    const max = Math.max(5, maxNumbers);
    if (total <= max) {
      for (let i = 1; i <= total; i++) items.push(i);
      return items;
    }
    const range = max - 3; 
    let start = Math.max(2, currentPage - Math.floor(range / 2));
    let end = Math.min(total - 1, start + range - 1);
    start = Math.max(2, end - range + 1);

    items.push(1);
    if (start > 2) items.push("…");
    for (let i = start; i <= end; i++) items.push(i);
    if (end < total - 1) items.push("…");
    items.push(total);
    return items;
  }, [currentPage, totalPages, maxNumbers]);

  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
        className="px-1 py-1 rounded-lg bg-transparent disabled:opacity-50 text-white"
        aria-label="Página anterior"
      >
        <ChevronLeft size={24} className="text-blue-500" />
      </button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChangePage(p as number)}
            aria-current={currentPage === p ? "page" : undefined}
            className={`px-3 text-lg bg-transparent ${
              currentPage === p
                ? " text-blue-500 text-xl font-bold"
                : " text-black hover:text-blue-400"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className="px-2 py-2 rounded-lg bg-transparent disabled:opacity-50 text-white"
        aria-label="Página siguiente"
      >
        <ChevronRight size={24} className="text-blue-500" />
      </button>
    </div>
  );
}
