'use client';

import { useState, useEffect } from "react";
import DogCard from "@/components/perritos/DogCard";
import { ButtonPagination } from "@/components/ui/buttonPagination";
import { DogList, PaginatedDogListList } from "@/api";
import CustomLoader from "@/components/ui/CustomLoader";


export default function DogListClient() {

  const [dogsData, setDogsData] = useState<PaginatedDogListList | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadDogs = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api?page=${pageNum}`);
      const data = await res.json();
      setDogsData(data);
    } catch (err) {
      console.error("Error cargando perritos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDogs(page);
  }, [page]);

  if (!dogsData) return <CustomLoader />;

  return (
    <>
      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-500">
        {loading ? (
          <div className="col-span-full">
            <CustomLoader />
          </div>
        ) : dogsData.data && dogsData.data.length > 0 ? (
          dogsData.data.map((dog: DogList) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <div className="col-span-full text-center text-gray-700 py-8">
            No hay perritos que enseñar
          </div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-10 gap-2">
        <ButtonPagination
          currentPage={dogsData.current_page}
          totalPages={dogsData.total_pages}
          onChangePage={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}