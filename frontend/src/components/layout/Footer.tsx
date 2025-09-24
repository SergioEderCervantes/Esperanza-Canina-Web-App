import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPaw, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0d1321] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-15">
        
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FaPaw className="text-2xl text-white" />
            <span className="text-xl font-bold">Patitas</span>
          </div>
          <p className="text-sm leading-relaxed">
            Refugio dedicado al rescate, cuidado y adopción responsable de perros
            abandonados. Trabajamos para darles una segunda oportunidad de
            encontrar un hogar lleno de amor.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

  
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Adoptar</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ayudanos</a></li>
            
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <ul className="space-y-3">
           
            <li className="flex items-center space-x-2">
              <FaPhone />
              <span>+52 555 123 4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope />
              <span>info@patitas.org</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        © 2025 Patitas. Todos los derechos reservados. Hecho con{" "}
        <span className="text-red-500">❤️</span> para nuestros amigos de cuatro patas.
      </div>
    </footer>
  );
}
