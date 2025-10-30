"use client";
import type { FormularioAdopcion } from "@/api/types.gen";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import CustomLoader from "./CustomLoader";
import dynamic from "next/dynamic";
import adoptionFormManager from "@/lib/adoptionFormManager";

interface AdoptionFormProps {
  formData: FormularioAdopcion | null;
  setFormData: Dispatch<SetStateAction<FormularioAdopcion | null>>;
}

const DatosDelSolicitanteSection = dynamic(
  () => import("./form-sections/DatosDelSolicitanteSection")
);
const SobreElEspacioSection = dynamic(
  () => import("./form-sections/SobreElEspacioSection")
);
const SobreElCuidadoSection = dynamic(
  () => import("./form-sections/SobreElCuidadoSection")
);

export default function AdoptionForm({
  formData,
  setFormData,
}: AdoptionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split(".");

    let parsedValue: string | number | boolean = value;

    if (type === "number") {
      parsedValue = value === "" ? 0 : Number(value);
    }

    if (e.target.type === "checkbox") {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof FormularioAdopcion],
          [field]: parsedValue,
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("SUBMITTING")
    if (formData) {
      // API call
      // console.log(formData.datos_del_solicitante);
      const result = await adoptionFormManager(formData);
      // TODO: el result da falso si hubo un error, el cual sera un 400, hacer un error bonito
    }
    setIsSubmitting(false);
  };

  if (!formData) {
    return <CustomLoader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // evita que se dispare submit
        }
      }}
    >
      <DatosDelSolicitanteSection
        formData={formData}
        handleChange={handleChange}
      />
      <SobreElEspacioSection formData={formData} handleChange={handleChange} />
      <SobreElCuidadoSection formData={formData} handleChange={handleChange} />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Solicitud de Adopción"}
      </button>
    </form>
  );
}
