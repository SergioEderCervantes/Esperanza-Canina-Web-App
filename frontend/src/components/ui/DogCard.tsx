import Image from "next/image";
import {
  faBirthdayCake,
  faVenusMars,
  faWeightHanging,
  faHeart,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";

const DogCard = ({
  name,
  imageUrl,
  status,
  age,
  size,
  gender,
  description,
}: Dog) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={`Imagen de ${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-neutral-800">{name}</h3>
          <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded-full text-sm">
            {status}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-neutral-600">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faBirthdayCake}
              className="mr-2 text-neutral-400 text-2xl w-3.5 h-3.5"
            />
            <span>{age}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faWeightHanging}
              className="mr-2 text-neutral-400 text-2xl w-3.5 h-3.5"
            />
            <span>{size}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faVenusMars}
              className="mr-2 text-neutral-400 text-2xl w-3.5 h-3.5"
            />
            <span>{gender}</span>
          </div>
        </div>

        <p className="text-neutral-600 mb-6 flex-grow">{description}</p>

        <div className="flex space-x-2 mt-auto">
          <button className={status === "Disponible" ? "flex align-center items-center w-3/5 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-neutral-700 transition-colors cursor-pointer" : "flex align-center items-center w-3/5 bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold opacity-50 cursor-not-allowed"} disabled={status !== "Disponible"}>
            <FontAwesomeIcon
              icon={status == "Disponible" ? faHeart : faClock}
              className="mr-3 w-3.5 h-3.5"
            />
            {status == "Disponible" ? "Adoptar" : "En proceso"}
          </button>
          <button className="flex items-center border border-neutral-300 text-neutral-600 px-4 py-2 rounded-lg font-semibold hover:bg-neutral-100 transition-colors w-2/5" >
            <FontAwesomeIcon icon={faShare} className="mr-3 w-3.5 h-3.5" />
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
