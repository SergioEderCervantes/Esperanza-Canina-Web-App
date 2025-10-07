"use client"

import { perritosRetrieve } from "@/api/sdk.gen";
import { DetailedDog } from "@/api/types.gen";
import { CldImage } from "next-cloudinary";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin, Calendar } from "lucide-react";
import Link from "next/link";


export default async function DogProfilePage({
  params,
}: {
  params: { id: number };
}) {
  console.log("[DogProfilePage] Received params:", params);

  const dogId = params.id;
  console.log("[DogProfilePage] Parsed dogId:", dogId);

  //  const dog = dogsData.find((d) => d.slug === params.slug)

  if (isNaN(dogId)) {
    notFound();
  }

  const res = await perritosRetrieve({
    path: { id: dogId },
  });
  console.log("[DogProfilePage] API response:", res);

  if (res.error || res.data?.data === undefined) {
    {
      notFound();
    }
  }
  let dog: DetailedDog = res.data?.data!;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Refugio
            </Link>
            <span className="mx-2">›</span>
            <Link href="/perritos" className="hover:text-blue-600">
              Perros disponibles
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{dog.name} - Perfil</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Imagen principal */}
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="relative">
                <CldImage
                  width="960"
                  height="600"
                  src={
                    dog.images && dog.images.length > 0
                      ? dog.images[0].url
                      : "placeholder-dog.png"
                  }
                  sizes="100vw"
                  alt="Description of my image"
                  className="w-full aspect-square object-cover"
                />

                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    <Heart className="w-3 h-3 mr-1" />
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Información principal */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {dog.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{dog.dog_life_stage}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500 block">Tamaño</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {dog.size_display}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {dog.beheaviors.map((behavior) => (
                  <Badge
                    key={behavior.id}
                    className="bg-blue-100 text-blue-800 border-blue-200"
                  >
                    {behavior.beheavior_name}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Solicitar Adopción
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
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
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {behavior.beheavior_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Estado de adopción e información rápida */}
          <div className="space-y-6">
            <Card className="p-6 bg-white">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Estado de Adopción
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Disponible para Adopción
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex justify-between py-1">
                    <span>Fecha de ingreso:</span>
                    <span className="font-medium">15 Jun 2025</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Visitas recibidas:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Solicitudes:</span>
                    <span className="font-medium">3 pendientes</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información Rápida
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium text-gray-900">{dog.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Edad:</span>
                  <span className="font-medium text-gray-900">
                    {dog.dog_life_stage}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sexo:</span>
                  <span className="font-medium text-gray-900">
                    {dog.genre_display}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="font-medium text-gray-900">
                    {dog.size_display}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contactar Refugio
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">(555) 123-4567</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">info@refugio.com</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
