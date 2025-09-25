// components/perritos/DogCard.tsx

import { ButtonDogCard } from "@/components/ui/buttonDogCard";
import { Dog } from "@/types/dog";
import type { DogList } from "@/api/types.gen";

type DogListProps = {
  dog: DogList;
};

export default function DogCard({ dog }: DogListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-max-80">
      {/* Imagen */}
      <div className="h-60 bg-gray-200 flex items-center justify-center text-gray-500">
        <img
          src={dog.primary_image || "/placeholder-dog.png"}
          alt={dog.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Estado */}
        {/* <span
          className={`text-xs px-2 py-1 rounded-full ${
            dog.status === "Disponible"
              ? "bg-green-100 text-green-700"
              : dog.status === "En proceso"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {dog.status}
        </span> */}

        <h2 className="text-lg font-bold mt-2 text-gray-500">{dog.name}</h2>
        <p className="text-sm text-gray-600">
          {dog.dog_life_stage} • {dog.genre_display} • {dog.size_display}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-2">
          {dog.beheaviors?.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              {tag.beheavior_name}
            </span>
          ))}
        </div>

        {/* Descripción
        <p className="text-gray-600 text-sm line-clamp-2">{dog.description}</p> */}

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          {/* <span className="text-xs text-gray-500">
            En refugio: {dog.refugeTime}
          </span> */}
          <ButtonDogCard text="Ver perfil" />
        </div>
      </div>
    </div>
  );
}
