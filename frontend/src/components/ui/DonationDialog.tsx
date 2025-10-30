"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/StylishDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";

interface DonationDialogProps {
  type: "especie" | "transferencia";
}

export const DonationDialog = ({ type }: DonationDialogProps) => {
  const content =
    type === "especie"
      ? {
          icon: faBowlFood,
          title: "Donación en Especie",
          description: "Apoya con artículos esenciales para nuestros perritos.",
          details: (
            <>
              <p>Puedes traer croquetas, medicinas, mantas o juguetes.</p>
              <p>
                📍 <strong>Dirección:</strong> Calle Esperanza #45, Col. Centro.
              </p>
              <p>
                🕓 <strong>Horario:</strong> Lunes a Sábado, 9:00am - 6:00pm
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://wa.me/524494677305?text=Hola!%20Quisiera%20información%20sobre%20cómo%20hacer%20una%20donación%20en%20especie."
                  target="_blank"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>
            </>
          ),
        }
      : {
          icon: faBuildingColumns,
          title: "Transferencia Bancaria",
          description: "Apoya al albergue mediante transferencia o depósito.",
          details: (
            <>
              <p>💳 <strong>Banco:</strong> BBVA</p>
              <p>🏦 <strong>Cuenta:</strong> 0123456789</p>
              <p>🔢 <strong>CLABE:</strong> 012345678901234567</p>
              <p>📄 Envía tu comprobante para agradecértelo!!</p>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://wa.me/524494677305?text=Hola!%20He%20realizado%20una%20donación%20por%20transferencia."
                  target="_blank"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Enviar comprobante</span>
                </a>
              </div>
            </>
          ),
        };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-start p-4 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-all duration-300 group">
          <FontAwesomeIcon icon={content.icon} className="text-neutral-600 mr-4 w-5 h-5" />
          <span className="font-medium text-neutral-700">{content.title}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-8">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        <section className="space-y-3 mt-4 text-base leading-relaxed text-neutral-600">
          {content.details}
        </section>
      </DialogContent>
    </Dialog>
  );
};
