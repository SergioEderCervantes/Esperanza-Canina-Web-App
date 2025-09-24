import DogCard, { DogStatus } from "@/components/perritos/DogCard";
import { ButtonPagination } from "@/components/ui/buttonPagination";

export default function PerritosPage() {
  // Estos datos vendrán de la API Django después, por ahora mock
  const dogs = [
    {
      id: 1,
      name: "Max",
      age: "2 años",
      sex: "Macho",
      size: "Grande",
      tags: ["Juguetón", "Sociable", "Activo"],
      description: "Max es un perro muy cariñoso que adora jugar en el patio.",
      status: DogStatus.Disponible,
      refugeTime: "3 meses",
    },
    {
      id: 2,
      name: "Luna",
      age: "1 año",
      sex: "Hembra",
      size: "Mediano",
      tags: ["Cariñosa", "Tranquila", "Obediente"],
      description: "Luna es una perra muy dulce y tranquila.",
      status: DogStatus.Disponible,
      refugeTime: "1 mes",
    },
    {
      id: 3,
      name: "Luna",
      age: "1 año",
      sex: "Hembra",
      size: "Mediano",
      tags: ["Cariñosa", "Tranquila", "Obediente"],
      description: "Luna es una perra muy dulce y tranquila.",
      status: DogStatus.Disponible,
      refugeTime: "1 mes",
    },
    {
      id: 4,
      name: "Luna",
      age: "1 año",
      sex: "Hembra",
      size: "Mediano",
      tags: ["Cariñosa", "Tranquila", "Obediente"],
      description: "Luna es una perra muy dulce y tranquila aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.llllllllllllllmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      status: DogStatus.Disponible,
      refugeTime: "1 mes",
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
        {dogs.map((dog) => (
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
