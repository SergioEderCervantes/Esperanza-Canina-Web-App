import DogListClient from "@/components/perritos/DogListClient";


export default function PerritosPage() {
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
          <option>Chico</option>
          <option>Mediano</option>
          <option>Grande</option>
        </select>
        <select className="border-2 rounded-md px-4 py-2 border-gray-400 text-gray-400">
          <option>Todas las edades</option>
          <option>Cachorro</option>
          <option>Adulto</option>
          <option>Adulto Mayor</option>
        </select>
      </div>

      {/* Componente de lista con paginación */}
      <DogListClient />
    </main>
  );
}
