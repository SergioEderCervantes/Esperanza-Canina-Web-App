import DogCard from "@/components/perritos/DogCard";
import { ButtonPagination } from "@/components/ui/buttonPagination";
import { Dog, DogStatus } from "@/types/dog";
import Image from "next/image";

export default function PerritosPage() {
  // Estos datos vendrán de la API Django después, por ahora mock
 const featuredDogsData: Dog[] = [
  {
 id: 1,
    name: 'Rocky',
    age: '2 años',
    imageUrl: '/perro1.jpg',
    sex: 'Macho',
    size: 'Grande (25kg)',
    tags: ['Juguetón', 'Activo'],
    description: 'Rocky es leal y protector, ideal para una familia activa.',
    status: DogStatus.Disponible,
    refugeTime: '3 meses',
  },
  {
    id: 2,
    name: 'Luna',
    age: '1 año',
    imageUrl: '/perro2.jpg',
    sex: 'Hembra',
    size: 'Mediano (15kg)',
    tags: ['Curiosa', 'Sociable'],
    description: 'Luna es curiosa y juguetona, se lleva bien con otros perros.',
    status: DogStatus.EnProceso,
    refugeTime: '1 mes',
  },
  {
    id: 3,
    name: 'Max',
    imageUrl: '/perro3.jpg',
    status: DogStatus.Disponible,
    age: '3 años',
    size: 'Pequeño (8kg)',
    sex: 'Macho',
    description: 'Max es un perrito tranquilo y cariñoso, perfecto para compañía.',
    tags: ['Tranquilo', 'Cariñoso'],
    refugeTime: '6 meses',
  },
];

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
        {featuredDogsData.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-10 gap-2">
        <ButtonPagination page={1} />
      </div>
    </main>
  );
}
