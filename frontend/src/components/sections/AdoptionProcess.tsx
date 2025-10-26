import Image from 'next/image';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faFileLines,
  faHandshake, 
  faHouse,
  faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const adoptionSteps = [
  {
    number: 1,
    title: 'Explora',
    description: 'Navega por nuestro catálogo y encuentra al perrito que conecte contigo.',
    icon: faMagnifyingGlass,
  },
  {
    number: 2,
    title: 'Solicita',
    description: 'Completa nuestro formulario de adopción con tus datos y fotos del espacio.',
    icon: faFileLines,
  },
  {
    number: 3,
    title: 'Evaluación',
    description: 'Nuestro equipo revisa tu solicitud y programa una visita si es necesario.',
    icon: faHandshake,
  },
  {
    number: 4,
    title: '¡A casa!',
    description: 'Una vez aprobada, coordinas la entrega y tu nuevo amigo va a casa.',
    icon: faHouse,
  },
];

const adoptionRequirements = [
  'Ser mayor de 18 años',
  'Tener espacio adecuado para el perrito',
  'Compromiso de cuidado a largo plazo',
  'Recursos para gastos veterinarios',
  'Paciencia y amor incondicional',
];

const ProcessStep = ({ number, title, description, icon } : { number: number; title: string; description: string; icon: IconProp; }) => (
  <div className="text-center">
    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
      <FontAwesomeIcon icon={icon} className="text-2xl text-neutral-800 w-8 h-8" />
    </div>
    <div className="bg-neutral-800 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const RequirementItem = ({ children } : { children: React.ReactNode }) => (
  <li className="flex items-center text-neutral-600">
    <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const AdoptionProcess = () => {
  return (
    <section id="adoption-process" className="md:p-16 py-16 px-8 bg-neutral-50">
      <div className="container mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Proceso de Adopción
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Seguimos un proceso sencillo y seguro para garantizar que cada
            perrito encuentre el hogar perfecto.
          </p>
        </div>

        {/* Mapeo de los pasos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {adoptionSteps.map((step) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>

        {/* Sección de requisitos */}
        <div className="mt-20 bg-white rounded-xl p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                Requisitos para Adoptar
              </h3>
              <ul className="space-y-4">
                {adoptionRequirements.map((req, index) => (
                  <RequirementItem key={index}>{req}</RequirementItem>
                ))}
              </ul>
            </div>
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
              <Image
                src="/family-with-dog.jpg"
                alt="Familia feliz con su perro adoptado"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;