import DogCard from "@/components/perritos/DogCard";
import { Dog } from "@/types/dog";
import { DogStatus } from "@/types/dog";
import Link from "next/link";


const featuredDogsData: Dog[] = [
  {
    id: 1,
    slug: 'rocky',
    name: 'Rocky',
    age: '2 años',
    imageUrl: '/perro1.jpg',
    sex: 'Macho',
    size: 'Grande (25kg)',
    tags: ['Juguetón', 'Activo'],
    description: 'Rocky es leal y protector, ideal para una familia activa.',
    status: DogStatus.Disponible,
    refugeTime: '3 meses',
    breed: 'Pastor Alemán',
  },
  {
    id: 2,
    slug: 'luna',
    name: 'Luna',
    age: '1 año',
    imageUrl: '/perro2.jpg',
    sex: 'Hembra',
    size: 'Mediano (15kg)',
    tags: ['Curiosa', 'Sociable'],
    description: 'Luna es curiosa y juguetona, se lleva bien con otros perros.',
    status: DogStatus.EnProceso,
    refugeTime: '1 mes',
    breed: 'Labrador Retriever',
  },
  {
    id: 3,
    slug: 'max',
    name: 'Max',
    imageUrl: '/perro3.jpg',
    status: DogStatus.Disponible,
    age: '3 años',
    size: 'Pequeño (8kg)',
    sex: 'Macho',
    description: 'Max es un perrito tranquilo y cariñoso, perfecto para compañía.',
    tags: ['Tranquilo', 'Cariñoso'],
    refugeTime: '6 meses',
    breed: 'Golden Retriever',
  },
];

export const FeaturedDogs = () => {
  return (
    <section className="mx-auto bg-gray-100 md:p-16 py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-800 mb-4">Perritos Destacados</h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Conoce a algunos de nuestros adorables amigos que están buscando un
          hogar lleno de amor. ¡Tu próximo mejor amigo podría estar aquí!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mx-12">
        {featuredDogsData.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
          
        ))}
      </div>

      <div className="text-center">
        <button className="bg-neutral-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-700 transition-colors">
          <Link href="/perritos">Ver todos los perritos</Link>
        </button>
      </div>
    </section>
  );
};