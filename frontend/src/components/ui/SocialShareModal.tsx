import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { DetailedDog } from "@/api/types.gen";
import { useState } from "react";

interface SocialShareModalProps {
  dog: DetailedDog;
  onClose: () => void;
}

export default function SocialShareModal({ dog, onClose }: SocialShareModalProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `🐶 ¡Conoce a ${dog.name}! Está buscando un hogar lleno de amor ❤️.`;
  const title = `Adopta a ${dog.name}`;
  const shareText = `${text}\n\n👉 ${url}`;

  const socialLinks = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
      icon: <FaWhatsapp size={28} />,
      bg: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <FaFacebook size={28} />,
      bg: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      name: "Instagram",
      href: `https://www.instagram.com`,
      icon: <FaInstagram size={28} />,
      bg: "bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400",
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`,
      icon: <FaEnvelope size={28} />,
      bg: "bg-gradient-to-br from-gray-300 to-gray-400",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("No se pudo copiar el enlace.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white/10 backdrop-blur-lg flex items-center justify-center z-50 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm mx-4 relative shadow-xl border border-white/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
          Compartir a {dog.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bg} text-white flex flex-col items-center justify-center p-4 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform`}
            >
              {link.icon}
              <span className="mt-2 text-sm font-semibold">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all font-semibold shadow-sm"
          >
            <FaLink size={18} className="mr-2" />
            <span>{copied ? "¡Enlace Copiado!" : "Copiar Enlace"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
