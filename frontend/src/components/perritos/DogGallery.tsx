"use client";

import Image from "next/image";
import { useState } from "react";
import { DogImages } from "@/api";

export default function DogGallery({ images }: { images: Array<DogImages> }) {
  const validImages = images.filter(img => img.url !== 'https://placehold');

  const [selected, setSelected] = useState(
    validImages.length > 0 ? validImages[0].url : "/perro1.jpg"
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Imagen principal */}
      <div className="w-full aspect-square border rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
        <Image
          src={selected}
          alt="Imagen principal del producto"
          width={600}
          height={600}
          priority
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Carrusel de miniaturas */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {validImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img.url)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selected === img.url ? "border-blue-500" : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={img.url}
              alt={`Miniatura ${i + 1}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
