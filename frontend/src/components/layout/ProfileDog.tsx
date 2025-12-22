"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import DogGallery from "../perritos/DogImageGallery";
import { useAdoptionContext } from "@/context/AdoptionContext";
import { useRouter } from "next/navigation";
import { DetailedDog } from "@/api/types.gen";
import ShareButton from "@/components/ui/ShareButton";
import DogMainImage from "../perritos/DogMainImage";
import DogImageGallery from "../perritos/DogImageGallery";
import PawPrint from "@/components/ui/PawPrint";

// Function to determine if a color is light or dark
const isColorLight = (color: string) => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 4), 16);
  const c_b = parseInt(hex.substring(4, 6), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

export default function ProfileDog({ dog }: { dog: DetailedDog }) {
  const { setDogToAdopt } = useAdoptionContext();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(dog.images[0]?.url || "");
  const handleAdoptClick = () => {
    setDogToAdopt(dog);
    router.push("/adopcion");
  };

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
        <PawPrint className="absolute bottom-[40%] left-[35%] w-28 h-28 text-gray-300/50 opacity-25" />
        <PawPrint className="absolute bottom-[50%] right-[5%] w-36 h-36 text-gray-300/50 opacity-15 rotate-[60deg]" />
        <PawPrint className="absolute top-[75%] left-[50%] w-20 h-20 text-gray-300/50 opacity-20 rotate-[-30deg]" />
        <PawPrint className="absolute bottom-[5%] right-[40%] w-28 h-28 text-gray-300/50 opacity-15 rotate-10" />
        <PawPrint className="absolute top-[90%] left-[5%] w-24 h-24 text-gray-300/50 opacity-20 rotate-5" />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="bg-white border-b flex justify-start h-16 shadow-sm">
          <div className="max-w-6xl px-6 py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-500">
                Refugio
              </Link>
              <span className="mx-2">›</span>
              <Link href="/perritos" className="hover:text-blue-500">
                Perros disponibles
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{dog.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-2xl  m-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dispaly imagenes */}
            <div className="relative">
              <DogMainImage src={selectedImage} />
            </div>

            {/* Información principal */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {dog.name}
                </h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500 block">Tamaño</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {dog.size_display}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {dog.beheaviors.map((behavior) => {
                    const textColor = isColorLight(behavior.color || "#FFFFFF")
                      ? "#000000"
                      : "#FFFFFF";
                    return (
                      <Badge
                        key={behavior.id}
                        style={{
                          backgroundColor: behavior.color,
                          color: textColor,
                        }}
                      >
                        {behavior.beheavior_name}
                      </Badge>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={handleAdoptClick}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Solicitar Adopción
                  </Button>
                  <ShareButton dog={dog} />
                </div>
              </div>
              <DogImageGallery
                images={dog.images}
                selected={selectedImage}
                onSelect={setSelectedImage}
              />{" "}
            </div>
          </div>

          {/* Información detallada */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Sobre el perro */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sobre {dog.name}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {dog.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Características Positivas
                    </h3>
                    <ul className="space-y-2">
                      {dog.beheaviors?.map((behavior) => (
                        <li
                          key={behavior.id}
                          className="flex items-center text-gray-700"
                        >
                          <div
                            className="w-2 h-2 rounded-full mr-3"
                            style={{ backgroundColor: behavior.color }}
                          ></div>
                          {behavior.beheavior_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Descripcion de Atributos
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ">
                  {dog.beheaviors.map((attr) => (
                    <li key={attr.id} className="flex items-center text-gray-700">
                      <div
                        className="w-2 h-2 rounded-full mr-3"
                        style={{ backgroundColor: attr.color }}
                      ></div>
                      <span className="font-semibold text-blue-500 mr-2">
                        {attr.beheavior_name}:
                      </span>{" "}
                      {attr.beheavior_description}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="mt-6 p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contactar Refugio
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">(449) 467-7305</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      marthaelvagutierrezramirez@gmail.com
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Estado de adopción e información rápida */}
            <div className="space-y-6">
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 ">
                  Información Rápida
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between mr-40">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium text-gray-900">{dog.name}</span>
                  </div>
                  <div className="flex justify-between mr-40">
                    <span className="text-gray-600">Etapa de vida:</span>
                    <span className="font-medium text-gray-900">
                      {(dog as any).life_stage_display}
                    </span>
                  </div>
                  <div className="flex justify-between mr-40">
                    <span className="text-gray-600">Sexo:</span>
                    <span className="font-medium text-gray-900">
                      {dog.genre_display}
                    </span>
                  </div>

                  <div className="flex justify-between mr-40">
                    <span className="text-gray-600">Tamaño:</span>
                    <span className="font-medium text-gray-900">
                      {dog.size_display}
                    </span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-white">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Requisitos para la Adopción
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Formulario de adopción completo.</li>
                  <li>Entrevista con el equipo de adopciones.</li>
                  <li>Evidencia solicitada por el equipo.</li>
                  <li>Compromiso de cuidado y bienestar del perro.</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
