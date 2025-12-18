"use client";

import Image from "next/image";

interface DogMainImageProps {
  src: string;
}

export default function DogMainImage({ src }: DogMainImageProps) {
  return (
    <div className="w-full aspect-square border rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100">
      <Image
        src={src}
        alt="Imagen principal del producto"
        width={600}
        height={600}
        priority
        className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
