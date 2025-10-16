"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Clases dinámicas basadas en el estado 'scrolled'
  const navbarClasses = `
        fixed top-0 w-full z-20 px-8 py-4 transition-all duration-300 ease-in-out
        ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}
    `;

  const textClasses = `
        transition-colors duration-300 ease-in-out
        ${scrolled ? "text-gray-900" : "text-white"}
    `;

  const buttonBorderClasses = `
        transition-colors duration-300 ease-in-out
        ${
          scrolled
            ? "border-gray-900 hover:text-white" // Sólido: Borde oscuro, hover blanco
            : "border-white " // Transparente: Borde blanco, hover oscuro
        }
    `;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGOTIPO Y NOMBRE */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-16 w-16" />
          <Link
            href="/"
            className={`font-amigable text-2xl font-extrabold ${textClasses}`}
          >
            Esperanza Canina
          </Link>
        </div>

        {/* ENLACES DE NAVEGACIÓN (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link
            href="/"
            className={`hover:border-b-2 border-transparent eaFse-in-out hover:border-blue-500 transition duration-300 ${textClasses}`}
          >
            Inicio
          </Link>

          {/* BOTÓN PRINCIPAL: Adoptar (Destacado) */}
          <Link
            href="/perritos"
            className="px-5 py-2 rounded-full bg-blue-400 text-white font-bold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Adoptar
          </Link>

          {/* BOTÓN SECUNDARIO: Apoyanos (Destacado con borde) */}
          <Link
            href="/ayuda"
            className={`px-5 py-2 rounded-full font-bold bg-blue-400 hover:bg-blue-600 text-white transition duration-300 shadow-md`}
          >
            Apoyanos
          </Link>

          <Link
            href="#contacto"
            className={`hover:border-b-2 border-transparent eaFse-in-out 
               hover:border-blue-500 transition duration-300 ${textClasses}`}
          >
            Contacto
          </Link>
        </div>

        {/* MENÚ HAMBURGUESA PARA MÓVIL IRÍA AQUÍ */}
      </div>
    </nav>
  );
}
