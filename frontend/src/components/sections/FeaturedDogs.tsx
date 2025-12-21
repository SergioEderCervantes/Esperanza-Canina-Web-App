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
  try {
    console.log("Iniciando perritosTopRetrieve desde el servidor...");
    res = await perritosTopRetrieve();
  } catch (e) {
    console.error("Excepción CRÍTICA al llamar a perritosTopRetrieve:", e);
    if (e instanceof Error) {
      console.error("Mensaje de error:", e.message);
      console.error("Stack trace:", e.stack);
    }
    return fallback();
  }

  if (res.error) {
    console.error(
      "perritosTopRetrieve retornó un error estructurado:",
      JSON.stringify(res.error, null, 2)
    );
    return fallback();
  }

  if (!res.data?.data) {
    console.error(
      "perritosTopRetrieve no retornó datos (res.data.data es falso). Respuesta completa:",
      JSON.stringify(res, null, 2)
    );
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
