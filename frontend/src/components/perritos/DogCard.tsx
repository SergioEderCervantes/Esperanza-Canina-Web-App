"use client";
import { ButtonDogCard } from "@/components/ui/buttonDogCard";
import Image from "next/image";
import Link from "next/link";
import type { DogList } from "@/api";
import { useState } from "react";

// Function to determine if a color is light or dark
const isColorLight = (color: string) => {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
};


type DogListProps = {
  dog: DogList;
  priority?: boolean;
};

export default function DogCard({ dog, priority = false }: DogListProps) {
  const {id} = dog;
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-max-80 animate-[fadeIn_0.4s_ease-in]">
      {/* Imagen */}
      <div className="relative h-80 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
        <Image
          src={dog.primary_image || "/placeholder-dog.png"}
          alt={dog.name || 'perrito'}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
       

        <h2 className="text-lg font-bold mt-2 text-gray-500">{dog.name}</h2>
        <p className="text-sm text-gray-600">
          {(dog as any).life_stage_display || (dog as any).dog_life_stage} • {dog.genre_display} • {dog.size_display}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-2">
          {dog.beheaviors.map((tag) => {
            const textColor = isColorLight(tag.color || '#FFFFFF') ? '#000000' : '#FFFFFF';
            return (
              <span
                key={tag.id}
                className="text-xs px-2 py-1 rounded-md"
                style={{ backgroundColor: tag.color, color: textColor }}
              >
                {tag.beheavior_name}
              </span>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          {/* <span className="text-xs text-gray-500">En refugio: {dog.refugeTime}</span> */}
          
          <Link href={`/perritos/${id}`}>
            <ButtonDogCard text={"Adoptar"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
