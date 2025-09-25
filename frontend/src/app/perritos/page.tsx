import DogCard from "@/components/perritos/DogCard";
import { ButtonPagination } from "@/components/ui/buttonPagination";
import { Dog, DogStatus } from "@/types/dog";
import Image from "next/image";
import { perritosList } from "@/api/sdk.gen"
import { DogList } from "@/api";

export default async function PerritosPage() {
  // Estos datos vendrán de la API Django después, por ahora mock
// TODO quitar el la llamada aqui, no es buena practica
  const res = await perritosList({security : []})
  let dogs_data: DogList[] = [];
  if (res.data?.data){
    dogs_data = res.data.data
  }



  return (
    <main className="mx-auto p-6 bg-gray-100">
      {/* Encabezado */}
      <div className="text-center m-12">
        <h1 className="text-3xl font-bold text-black ">
          Encuentra tu Compañero Perfecto
        </h1>
        <p className="text-gray-900 mt-2">
          Cada uno de nuestros perritos está esperando encontrar una familia amorosa. Descubre a tu nuevo mejor amigo y cambia dos vidas para siempre.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-5 rounded-md">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border-2 rounded-md px-4 py-2 w-60 border-gray-400 placeholder-gray-400 text-gray-700"
        />
        <select className="border-2 rounded-md px-4 py-2 border-gray-400 text-gray-400 ">
          <option>Todos los tamaños</option>
          <option>Pequeño</option>
          <option>Mediano</option>
          <option>Grande</option>
        </select>
        <select className="border-2 rounded-md px-4 py-2 border-gray-400 text-gray-400">
          <option>Todas las edades</option>
          <option>Cachorro</option>
          <option>Adulto</option>
          <option>Senior</option>
        </select>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-500">
        {dogs_data && dogs_data.length > 0
          ? dogs_data.map((dog) => <DogCard key={dog.id} dog={dog} />)
          : <div className="col-span-full text-center text-gray-700 py-8">No hay perritos que enseñar</div>}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-10 gap-2">
        <ButtonPagination page={1} />
      </div>
    </main>
  );
}
