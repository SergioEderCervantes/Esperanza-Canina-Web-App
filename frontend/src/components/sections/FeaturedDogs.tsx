import { DogTop, perritosTopRetrieve } from "@/api";
import Link from "next/link";
import DogTopCard from "../perritos/DogTopCard";

function fallback(){
  return (
      <section className="mx-auto bg-gray-100 md:p-16 py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Perritos Destacados
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            No se encontraron perritos
          </p>
        </div>
      </section>
    );
}


export const FeaturedDogs = async () => {
  let res;
  try{
    res = await perritosTopRetrieve();

  } catch (e){
    // Fallback component en caso de que la query falle
    console.log("Error en Query top: ", e);
    return fallback();
  }

  // Fallback component en caso de que no se obtengan datos del fetch
  if (!res.data?.data) {
    return fallback();
  }
  
  const dogs_data: DogTop[] = res.data?.data;

  return (
    <section className="mx-auto bg-gray-100 md:p-16 py-16 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-800 mb-4">
          Perritos Destacados
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Conoce a algunos de nuestros adorables amigos que están buscando un
          hogar lleno de amor, ¡Tu próximo mejor amigo podría estar aquí!
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
