"use client";
import { useState } from "react";
import DogListClient from "@/components/perritos/DogListClient";

export default function PerritosPage() {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("Todos");
  const [age, setAge] = useState("Todas");

  return (
    <main className="mx-auto p-0 bg-gray-100">
      <div className="text-center py-12  w-full">
        <h1 className="text-3xl font-bold text-black">
          Encuentra tu Compañero Perfecto
        </h1>
        <p className="text-gray-900 mt-2">
          Cada uno de nuestros perritos está esperando encontrar una familia amorosa.
          Descubre a tu nuevo mejor amigo y cambia dos vidas para siempre.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-5 rounded-md">
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
  );
}
