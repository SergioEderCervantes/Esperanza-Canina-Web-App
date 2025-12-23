"use client";
import { useState, useEffect, useCallback } from "react";
import DogCard from "@/components/perritos/DogCard";
import DogCardSkeleton from "@/components/ui/DogCardSkeleton";
import { ButtonPagination } from "@/components/ui/buttonPagination";
// import  CustomLoader  from "@/components/ui/CustomLoader";
import { perritosList } from "@/api/sdk.gen";
import type { PaginatedDogListList, DogList } from "@/api/types.gen";

interface DogListClientProps {
  search: string;
  size: string;
  age: string;
}

export default function DogListClient({ search, size, age }: DogListClientProps) {
  const [dogsData, setDogsData] = useState<PaginatedDogListList | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadDogs = useCallback(async () => {
    setLoading(true);
    try {
      // objeto de query con los filtros activos
      const query: Record<string, string | number> = { page };

      if (search.trim() !== "") query.search = search;
      if (size !== "Todos") query.size = size;
      if (age !== "Todas") query.life_stage = age;

      // llamada al endpoint /api/perritos/ 
      const response = await perritosList({ query });
      const data = response.data; // SDK con los códigos de respuesta
      setDogsData(data ?? null);
    } catch (err) {
      console.error("Error cargando perritos:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, size, age]);

  // refresh de los perritos
  useEffect(() => {
    setPage(1); // reinicio a la primera página al cambiar filtros
  }, [search, size, age]);

  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  // if (!dogsData) return <CustomLoader />;
  if (!dogsData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <DogCardSkeleton key={i} style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-500 bg-[#f3f4f6]">
        {loading ? (
          <>
            {[...Array(8)].map((_, i) => (
              <DogCardSkeleton key={i} />
            ))}
          </>
        ) : dogsData.data && dogsData.data.length > 0 ? (
          dogsData.data.map((dog: DogList, index: number) => (
            <div 
              key={dog.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <DogCard 
                dog={dog} 
                priority={index < 4}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700 py-8">
            No hay perritos que coincidan con los filtros
          </div>
        )}
      </div>

      {/* Paginación */}
      {dogsData.total_pages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <ButtonPagination
            currentPage={dogsData.current_page}
            totalPages={dogsData.total_pages}
            onChangePage={(newPage) => {
              setPage(newPage);
              const el = document.getElementById('filters');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </div>
      )}
    </>
  );
}
