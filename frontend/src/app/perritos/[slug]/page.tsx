import { type Dog, DogStatus } from "@/types/dog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data - esto vendría de tu API Django
const dogsData: Dog[] = [
  {
    id: 1,
    slug: "rocky",
    name: "Rocky",
    age: "2 años",
    imageUrl: "/perro1.jpg",
    sex: "Macho",
    size: "Grande (25kg)",
    tags: ["Juguetón", "Activo"],
    description: "Rocky es leal y protector, ideal para una familia activa.",
    status: DogStatus.Disponible,
    refugeTime: "3 meses",
    breed: "Pastor Alemán",
     },
  {
    id: 2,
    slug: "luna",
    name: "Luna",
    age: "1 año",
    imageUrl: "/perro2.jpg",
    sex: "Hembra",
    size: "Mediano (15kg)",
    tags: ["Curiosa", "Sociable"],
    description: "Luna es curiosa y juguetona, se lleva bien con otros perros.",
    status: DogStatus.EnProceso,
    refugeTime: "1 mes",
    breed: "Labrador Retriever",
   },
  {
    id: 3,
    slug: "max",
    name: "Max",
    imageUrl: "/perro3.jpg",
    status: DogStatus.Disponible,
    age: "3 años",
    size: "Pequeño (8kg)",
    sex: "Macho",
    description: "Max es un perrito tranquilo y cariñoso, perfecto para compañía.",
    tags: ["Tranquilo", "Cariñoso"],
    refugeTime: "6 meses",
    breed: "Golden Retriever",
    
   
 },
]

interface PageProps {
  params: { slug: string }
}

export default function DogProfilePage({ params }: PageProps) {
  const dog = dogsData.find((d) => d.slug === params.slug)

  if (!dog) {
    notFound()
  }

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
                <Image
                  src={dog.imageUrl || "/placeholder.svg"}
                  alt={`Foto Principal de ${dog.name}`}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    <Heart className="w-3 h-3 mr-1" />
                    {dog.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
                  En refugio: {dog.refugeTime}
                </div>
              </div>
            </Card>
          </div>

          {/* Información principal */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{dog.name}</h1>
              <p className="text-xl text-gray-600 mb-4">
                {dog.breed} • {dog.sex} • {dog.age}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
               
                <div>
                  <span className="text-sm text-gray-500 block">Tamaño</span>
                  <span className="text-lg font-semibold text-gray-900">Grande</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {dog.tags.map((tag) => (
                  <Badge key={tag} className="bg-blue-100 text-blue-800 border-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Solicitar Adopción
                </Button>
                <Button variant="outline" className="border-gray-300 bg-transparent">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre {dog.name}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{dog.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Características Positivas</h3>
                  <ul className="space-y-2">
                    {dog.tags?.map((trait) => (
                      <li key={trait} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {trait}
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
                <h3 className="text-lg font-semibold text-gray-900">Estado de Adopción</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Disponible para Adopción</span>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex justify-between py-1">
                    <span>Tiempo en refugio:</span>
                    <span className="font-medium">{dog.refugeTime}</span>
                  </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Rápida</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium text-gray-900">{dog.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Edad:</span>
                  <span className="font-medium text-gray-900">{dog.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sexo:</span>
                  <span className="font-medium text-gray-900">{dog.sex}</span>
                </div>
             
                <div className="flex justify-between">
                  <span className="text-gray-600">Tamaño:</span>
                  <span className="font-medium text-gray-900">Grande</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Raza:</span>
                  <span className="font-medium text-gray-900">{dog.breed}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactar Refugio</h3>
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
  )
}
