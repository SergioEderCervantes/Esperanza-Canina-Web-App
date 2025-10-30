import Image from "next/image";
import Link from "next/link";


export const FirstView = () => {
    return (
  <section className="relative bg-cover bg-center h-screen">
    <Image
      src="/landing.jpg"
      alt="Imagen de Refugio de Perros"
      fill
      className="object-cover -z-10"
    />

    {/* Contenedor del overlay en la parte baja */}
    <div
      className="absolute bottom-0 left-0 w-full text-gray-300 px-4 py-8"
      style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
        clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0% 100%)',
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Esperanza Canina</h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl">
        Un refugio dedicado a rescatar, cuidar y encontrar hogares amorosos para perros necesitados.
      </p>
      <Link
        href="/ayuda"
        className="bg-sky-700 hover:bg-sky-900 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
      >
        Conoce Más
      </Link>
    </div>
  </section>
);

}

