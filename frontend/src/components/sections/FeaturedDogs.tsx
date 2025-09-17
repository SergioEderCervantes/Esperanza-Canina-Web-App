import DogCard from "../ui/DogCard";

const featuredDogsData: Dog[] = [
  {
    id: 1,
    name: 'Rocky',
    imageUrl: '/perro1.jpg',
    status: 'Disponible',
    age: '2 años',
    size: 'Grande (25kg)',
    gender: 'Macho',
    description: 'Rocky es leal y protector, ideal para una familia activa.'
  },
  {
    id: 2,
    name: 'Luna',
    imageUrl: '/perro2.jpg',
    status: 'En proceso',
    age: '1 año',
    size: 'Mediano (15kg)',
    gender: 'Hembra',
    description: 'Luna es curiosa y juguetona, se lleva bien con otros perros.'
  },
  {
    id: 3,
    name: 'Max',
    imageUrl: '/perro3.jpg',
    status: 'Disponible',
    age: '3 años',
    size: 'Pequeño (8kg)',
    gender: 'Macho',
    description: 'Max es un perrito tranquilo y cariñoso, perfecto para compañía.'
  },
];

export const FeaturedDogs = () => {
  return (
    <section className="mx-auto bg-white md:p-16 py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-800 mb-4">Perritos Destacados</h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Conoce a algunos de nuestros adorables amigos que están buscando un
          hogar lleno de amor. ¡Tu próximo mejor amigo podría estar aquí!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredDogsData.map((dog) => (
          <DogCard key={dog.id} {...dog} />
        ))}
      </div>

      <div className="text-center">
        <button className="bg-neutral-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-700 transition-colors">
          Ver Todos los Perritos
        </button>
      </div>
    </section>
  );
};