import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { DetailedDog } from "@/api/types.gen";
import SocialShareModal from "./SocialShareModal";

function ShareButton({ dog }: { dog: DetailedDog }) {
  const [showModal, setShowModal] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Adopta a ${dog.name}`,
      text: `🐶 ¡Conoce a ${dog.name}! Está buscando un hogar lleno de amor ❤️`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("El usuario canceló o falló el share:", err);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="border-gray-800 bg-transparent text-gray-800 hover:bg-gray-700 hover:text-white"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2 text-gray-600 hover:text-white" />
        Compartir
      </Button>
      {showModal && <SocialShareModal dog={dog} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default ShareButton;
