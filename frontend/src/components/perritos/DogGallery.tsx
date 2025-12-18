"use client";

import { useState } from "react";
import { DogImages } from "@/api";
import DogMainImage from "./DogMainImage";
import DogImageGallery from "./DogImageGallery";

export default function DogGallery({ images }: { images: DogImages[] }) {
  const validImages = images.filter(
    (img) => img.url !== "https://placehold"
  );

  const [selected, setSelected] = useState(
    validImages.length > 0 ? validImages[0].url : "/images/perro1.jpg"
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <DogMainImage src={selected} />

      <DogImageGallery
        images={validImages}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}
