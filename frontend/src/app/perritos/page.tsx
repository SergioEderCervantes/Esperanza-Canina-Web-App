"use client";
import { useState } from "react";
import DogListClient from "@/components/perritos/DogListClient";
import PawPrint from "@/components/ui/PawPrint";

export default function PerritosPage() {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("Todos");
  const [age, setAge] = useState("Todas");

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Fondo de patitas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PawPrint className="absolute top-[5%] left-[10%] w-24 h-24 text-gray-300/50 opacity-20 rotate-12" />
        <PawPrint className="absolute top-[20%] right-[5%] w-32 h-32 text-gray-300/50 opacity-20 -rotate-20" />
        <PawPrint className="absolute top-[50%] left-[2%] w-40 h-40 text-gray-300/50 opacity-10 rotate-45" />
        <PawPrint className="absolute bottom-[10%] right-[15%] w-28 h-28 text-gray-300/50 opacity-25" />
        <PawPrint className="absolute bottom-[2%] left-[25%] w-36 h-36 text-gray-300/50 opacity-15 rotate-[60deg]" />
        <PawPrint className="absolute top-[35%] left-[45%] w-20 h-20 text-gray-300/50 opacity-20 rotate-[-30deg]" />
        <PawPrint className="absolute bottom-[25%] left-[5%] w-28 h-28 text-gray-300/50 opacity-15 rotate-10" />
        <PawPrint className="absolute top-[5%] right-[30%] w-24 h-24 text-gray-300/50 opacity-20 rotate-5" />
        <PawPrint className="absolute top-[60%] right-[25%] w-24 h-24 text-gray-300/50 opacity-20 rotate-12" />
        <PawPrint className="absolute top-[80%] left-[15%] w-32 h-32 text-gray-300/50 opacity-20 -rotate-20" />
        {/* <PawPrint className="absolute top-[5%] right-[50%] w-40 h-40 text-gray-300/50 opacity-10 rotate-45" /> */}
        <PawPrint className="absolute bottom-[40%] left-[35%] w-28 h-28 text-gray-300/50 opacity-25" />
        <PawPrint className="absolute bottom-[50%] right-[5%] w-36 h-36 text-gray-300/50 opacity-15 rotate-[60deg]" />
        <PawPrint className="absolute top-[75%] left-[50%] w-20 h-20 text-gray-300/50 opacity-20 rotate-[-30deg]" />
        <PawPrint className="absolute bottom-[5%] right-[40%] w-28 h-28 text-gray-300/50 opacity-15 rotate-10" />
        <PawPrint className="absolute top-[90%] left-[5%] w-24 h-24 text-gray-300/50 opacity-20 rotate-5" />
      </div>

      <main className="relative z-10 mx-auto p-6">
        <div className="text-center m-12">
          <h1 className="text-3xl font-bold text-black">
            Encuentra tu Compañero Perfecto
          </h1>
          <p className="text-gray-900 mt-2">
            Cada uno de nuestros perritos está esperando encontrar una familia
            amorosa. Descubre a tu nuevo mejor amigo y cambia dos vidas para
            siempre.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white/80 backdrop-blur-sm p-5 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="border-2 rounded-md px-4 py-2 w-60 border-gray-400 placeholder-gray-400 text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border-2 rounded-md px-4 py-2 border-gray-400 text-gray-700"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="Todos">Todos los tamaños</option>
            <option value="Chico">Chico</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>

          <select
            className="border-2 rounded-md px-4 py-2 border-gray-400 text-gray-700"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="Todas">Todas las edades</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Joven">Joven</option>
            <option value="Adulto">Adulto</option>
            <option value="Adulto Mayor">Adulto Mayor</option>
          </select>
        </div>

      {/* Lista con filtros */}
      <div className="p-6">
        <DogListClient search={search} size={size} age={age} />
      </div>
    </main>
    </div>
  );
}
