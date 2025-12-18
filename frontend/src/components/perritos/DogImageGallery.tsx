"use client";

import Image from "next/image";
import { DogImages } from "@/api";

interface DogImageGalleryProps {
  images: DogImages[];
  selected: string;
  onSelect: (url: string) => void;
}

export default function DogImageGallery({
  images,
  selected,
  onSelect,
}: DogImageGalleryProps) {
  return (
    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(img.url)}
          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            selected === img.url
              ? "border-blue-500"
              : "border-transparent hover:border-gray-300"
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
  );
}
