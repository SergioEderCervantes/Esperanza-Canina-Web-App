"use client";

import Image from "next/image";
import { faCheck, faBuildingColumns, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, ElementType } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { DonationDialog } from "@/components/ui/DonationDialog";

const donationOptions = [
  { text: "Donaciones Monetarias: Cada aporte, grande o pequeño, hace una gran diferencia." },
  { text: "Donaciones en Especie: Siempre necesitamos alimentos, medicinas, mantas y juguetes." },
  { text: "Donaciones de Tiempo: Ayuda con el cuidado de los perros, limpieza o eventos." },
];

const volunteerTasks = [
  { text: "Cuidar y socializar con los perros." },
  { text: "Ayudar en eventos y campañas de adopción." },
  { text: "Asistir en tareas administrativas y de mantenimiento." },
];

const FeatureListItem = ({
  icon,
  children,
}: {
  icon: IconDefinition;
  children: ReactNode;
}) => (
  <div className="flex items-center">
    <FontAwesomeIcon
      icon={icon}
      className="text-neutral-800 w-3 h-4 mx-3 flex-shrink-0"
    />
    <span className="text-neutral-600">{children}</span>
  </div>
);

const ActionButton = ({
  icon,
  text,
  href,
  badgeBg = "bg-neutral-100",
  badgeColor = "text-neutral-700",
}: {
  icon: IconDefinition | ElementType;
  text: string;
  href: string;
  badgeBg?: string;
  badgeColor?: string;
}) => {
  const isReactIcon = typeof icon === "function";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-full flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-all duration-300 group"
    >
      <div className={`flex items-center justify-center w-9 h-9 rounded-md ${badgeBg} ${badgeColor}`}>
        {isReactIcon ? <FaWhatsapp className="w-5 h-5" /> : <FontAwesomeIcon icon={icon as IconDefinition} className="w-5 h-5" />}
      </div>

      <span className="font-medium text-neutral-700 flex-grow text-center">{text}</span>

      <div className="w-9 h-9" />
    </a>
  );
};

export default function AyudaPage() {
  return (
    <div className="container mx-auto px-8 md:px-20 py-16 bg-neutral-100">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
          Ayuda al Albergue
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Tu apoyo hace la diferencia. Descubre las diferentes formas en que
          puedes ayudar a nuestros perritos a tener una vida mejor.
        </p>
      </div>

      <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-semibold text-neutral-800 mb-6">
            Donaciones
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Cada donación nos ayuda a proporcionar alimento, cuidado médico y un
            refugio seguro para nuestros rescatados.
          </p>

          <div className="space-y-4 mb-8">
            {donationOptions.map((option, index) => (
              <FeatureListItem key={index} icon={faCheck}>
                {option.text}
              </FeatureListItem>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">
              Formas de Donar
            </h3>

            <div className="space-y-3">
              <DonationDialog type="transferencia" />
              <DonationDialog type="especie" />

              <ActionButton
                icon={FaWhatsapp}
                text="Contacto por WhatsApp"
                href="https://wa.me/524494677305?text=Hola!%20Quisiera%20información%20para%20ayudar%20al%20albergue."
                badgeBg="bg-neutral-100"
                badgeColor="text-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 h-96 relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/dog-receiving-food.jpg"
            alt="Perrito recibiendo cuidados"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="h-96 relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/volunteer-with-dog.jpg"
            alt="Voluntario jugando con un perrito"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-neutral-800 mb-6">
            Voluntariado
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Únete a nuestro equipo de voluntarios y marca una diferencia directa
            en la vida de estos perros. Como voluntario, puedes:
          </p>

          <div className="space-y-4 mb-8">
            {volunteerTasks.map((task, index) => (
              <FeatureListItem key={index} icon={faCheck}>
                {task.text}
              </FeatureListItem>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h4 className="text-neutral-800 mb-4">
              ¡Tu ayuda es invaluable! Contáctanos para saber cómo puedes
              empezar.
            </h4>

            <ActionButton
              icon={FaWhatsapp}
              text="Registrarse como Voluntario"
              href="https://wa.me/524494677305?text=Hola!%20Quisiera%20información%20para%20registrarme%20como%20voluntario."
              badgeBg="bg-neutral-100"
              badgeColor="text-emerald-600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}