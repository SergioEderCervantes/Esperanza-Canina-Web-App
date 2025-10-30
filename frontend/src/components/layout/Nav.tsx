"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export default function Nav() {
  const pathname = usePathname(); 
  const isLanding = pathname === "/"; 

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobil] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    const mobile = () => {
      setIsMobil(window.innerWidth < 768);
    };

    mobile();

    window.addEventListener("resize", mobile);
    if (isLanding) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", mobile);
      if (isLanding) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLanding]); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  
  const shouldBeTransparent = isLanding && !scrolled && !isMobile;

  const navbarClasses = `
        fixed top-0 w-full z-20 px-8 py-4 transition-all duration-300 ease-in-out
        ${shouldBeTransparent ? "bg-transparent" : "bg-white shadow-lg"}
    `;

  const textClasses = `
        transition-colors duration-300 ease-in-out
        ${shouldBeTransparent ? "text-white" : "text-gray-900"}
    `;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGOTIPO Y NOMBRE */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
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
            className={`hover:border-b-2 border-transparent ease-in-out hover:border-blue-500 transition duration-300 ${textClasses}`}
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
            href="/#contacto"
            className={`hover:border-b-2 border-transparent ease-in-out 
               hover:border-blue-500 transition duration-300 ${textClasses}`}
          >
            Contacto
          </Link>
        </div>

        {/* MENÚ HAMBURGUESA PARA MÓVIL */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-md ${textClasses}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg p-4`}>
          <div className="flex flex-col items-center gap-4 ">
            <Link
              href="/"
              className="text-gray-900 hover:text-blue-500 transition duration-300 "
              onClick={toggleMobileMenu}
            >
              Inicio
            </Link>
            <Link
              href="/perritos"
              className="px-5 py-2 rounded-full bg-blue-400 text-white font-bold shadow-md hover:bg-blue-600 transition 
                duration-300"
              onClick={toggleMobileMenu}
            >
              Adoptar
            </Link>
            <Link
              href="/ayuda"
              className="px-5 py-2 rounded-full bg-blue-400 text-white font-bold shadow-md hover:bg-blue-600 transition 
                 duration-300"
              onClick={toggleMobileMenu}
            >
              Apoyanos
            </Link>
            <Link
              href="/#contacto"
              className="text-gray-900 hover:text-blue-500 transition duration-300"
              onClick={toggleMobileMenu}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}