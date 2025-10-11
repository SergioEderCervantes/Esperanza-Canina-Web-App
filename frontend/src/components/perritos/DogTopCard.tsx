import type { DogTop } from "@/api/types.gen";
import Link from "next/link";

// 1. Definimos el tipo para los props del componente, usando el tipo DogTop que nos pasaste.
type DogTopCardProps = {
  dog: DogTop;
};

/**
 * DogTopCard es un componente visualmente atractivo que muestra la imagen de un perro
 * con su nombre superpuesto sobre un degradado.
 */
const DogTopCard = ({ dog }: DogTopCardProps) => {
  return (
    <Link href={`/perritos/${dog.id}`}>
      <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg">
        <img
          src={dog.primary_image}
          alt={dog.name || "Perrito destacado"}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-4">
          <h3 className="text-xl font-bold text-white tracking-wide md:text-2xl">
            {dog.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default DogTopCard;
