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
import { faBowlFood, faBuildingColumns, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState } from "react";

interface DonationDialogProps {
  type: "especie" | "transferencia";
}

const CopyableRow = ({
  label,
  value,
  ariaLabel,
}: {
  label: string;
  value: string;
  ariaLabel?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
      <div className="text-sm text-neutral-700 min-w-0">
        <span className="font-medium">{label}</span>
        <div className="mt-1 select-all font-mono text-neutral-900 text-sm break-words">{value}</div>
      </div>

      <button
        onClick={handleCopy}
        aria-label={ariaLabel ?? `Copiar ${label}`}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 transition flex-shrink-0"
      >
        <FontAwesomeIcon icon={faCopy} className="w-4 h-4 text-neutral-600" />

        <span className="hidden sm:inline text-sm text-neutral-700">{copied ? "¡Copiado!" : "Copiar"}</span>
      </button>
    </div>
  );
};

export const DonationDialog = ({ type }: DonationDialogProps) => {
  const content =
    type === "especie"
      ? {
          icon: faBowlFood,
          title: "Donación en Especie",
          description: "Apoya con artículos esenciales para nuestros perritos.",
          details: (
            <div className="space-y-3">
              <p className="text-sm text-neutral-700">
                Puedes traer croquetas, medicinas, mantas o juguetes. Gracias por pensar en ellos — cada
                aporte hace la diferencia.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="text-sm text-neutral-700">
                  <strong>📍 No compartimos la ubicación exacta por diversos problemas de abandono de cachorros en la entrada de nuestras instalaciones.</strong>
                  
                </div>

                <div className="text-sm text-neutral-700">
                  <strong>🕓 Horario</strong>
                  <div className="mt-1 font-medium">Lunes a Sábado · 9:00 — 18:00</div>
                </div>
              </div>

              <p className="text-sm text-neutral-600">
                Si necesitas que alguien reciba la donación fuera de horario, contáctanos por WhatsApp y
                lo coordinamos.
              </p>
            </div>
          ),
          button: (
            <a
              href="https://wa.me/524494677305?text=Hola!%20Quisiera%20información%20sobre%20cómo%20hacer%20una%20donación%20en%20especie."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="font-medium">Contactar por WhatsApp</span>
            </a>
          ),
        }
      : {
          icon: faBuildingColumns,
          title: "Transferencia Bancaria",
          description: "Apoya al albergue mediante transferencia o depósito.",
          details: (
            <div className="space-y-4">
              <p className="text-sm text-neutral-700">
                Gracias por tu apoyo. A continuación tienes los datos para realizar la transferencia. Por
                favor envía el comprobante para poder agradecerte y registrar tu donación.
              </p>

              <div className="space-y-3">
                <CopyableRow label="Banco" value="BBVA" ariaLabel="Copiar banco" />
                <CopyableRow label="Cuenta" value="0123456789" ariaLabel="Copiar número de cuenta" />
                <CopyableRow label="CLABE" value="012345678901234567" ariaLabel="Copiar CLABE" />
              </div>

              <p className="text-sm text-neutral-600">
                Cuando envíes tu comprobante por WhatsApp, por favor indica tu nombre para poder agradecerte
                correctamente.
              </p>
            </div>
          ),
          button: (
            <a
              href="https://wa.me/524494677305?text=Hola!%20He%20realizado%20una%20donación%20por%20transferencia."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-md transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="font-medium">Enviar comprobante</span>
            </a>
          ),
        };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center justify-start p-4 border border-neutral-200 rounded-lg hover:shadow-sm hover:bg-neutral-50 transition-all duration-200 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-neutral-100 text-neutral-700 mr-4">
            <FontAwesomeIcon icon={content.icon} className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-neutral-800">{content.title}</div>
            <div className="text-xs text-neutral-500 truncate hidden sm:block">{content.description}</div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600">
              <FontAwesomeIcon icon={content.icon} className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <DialogTitle>{content.title}</DialogTitle>
              <DialogDescription>{content.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 pb-8">
          <section className="mt-4 bg-neutral-50 border border-neutral-100 rounded-xl p-6 text-base leading-relaxed text-neutral-700">
            {content.details}
          </section>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-neutral-500">Gracias por apoyar a nuestros peluditos 🐶</div>
            <div>{content.button}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};