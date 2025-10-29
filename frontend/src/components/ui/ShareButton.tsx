import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { DetailedDog } from "@/api/types.gen";

function ShareButton({ dog }: { dog: DetailedDog }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Adopta a ${dog.name}`,
      text: `🐶 ¡Conoce a ${dog.name}! Está buscando un hogar lleno de amor ❤️`,
      url: window.location.href,
    };

    if (navigator.share) {
      // Si el navegador soporta compartir nativo
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("El usuario canceló o falló el share:", err);
      }
    } else {
      // Fallback: copiar al portapapeles
      await navigator.clipboard.writeText(
        `${shareData.text}\n\n👉 ${shareData.url}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      className="border-gray-800 bg-transparent text-gray-800 hover:bg-gray-700 hover:text-white"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2 text-gray-600 hover:text-white" />
      {copied ? "¡Copiado!" : "Compartir"}
    </Button>
  );
}

export default ShareButton;
