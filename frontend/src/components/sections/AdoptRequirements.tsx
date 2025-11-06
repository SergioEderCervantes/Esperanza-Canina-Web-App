import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const adoptionRequirements = [
  'Ser mayor de 18 años',
  'Tener espacio adecuado para el perrito',
  'Compromiso de cuidado a largo plazo',
  'Recursos para gastos veterinarios',
  'Paciencia y amor incondicional',
];

const RequirementItem = ({ children } : { children: React.ReactNode }) => (
  <li className="flex items-center text-neutral-600">
    <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

export default function AdoptRequirements(){
    return(
        <div className=" bg-white rounded-xl p-8 shadow-sm py-35 ">
          <div className="grid md:grid-cols-2 gap-5 items-center ml-8">
            <div className="flex flex-col">
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
                src="/images/linda.jpg"
                alt="Familia feliz con su perro adoptado"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
    )
}