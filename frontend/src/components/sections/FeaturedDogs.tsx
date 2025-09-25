import { DogTop, perritosTopRetrieve } from "@/api";
import Link from "next/link";
import DogTopCard from "../perritos/DogTopCard";


export const FeaturedDogs = async () => {
  // Esto esta horrible y no deberia de ser aqui pero para mañana its okay
  const res = await perritosTopRetrieve({ security: [] });
  let dogs_data: DogTop[];
  if (!res.data?.data) {
    return (
      <section className="mx-auto bg-gray-100 md:p-16 py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Perritos Destacados
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            No hay perritos
          </p>
        </div>
      </section>
    );
  }

  dogs_data = res.data?.data;

  return (
    <section className="mx-auto bg-gray-100 md:p-16 py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-800 mb-4">
          Perritos Destacados
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Conoce a algunos de nuestros adorables amigos que están buscando un
          hogar lleno de amor. ¡Tu próximo mejor amigo podría estar aquí!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 mx-12">
        {dogs_data.map((dog) => (
          <DogTopCard key={dog.id} dog={dog} />
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
