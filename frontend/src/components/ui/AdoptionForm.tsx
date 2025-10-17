
'use client';

import type { FormularioAdopcion } from '@/api/types.gen';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

interface AdoptionFormProps {
  formData: FormularioAdopcion;
  setFormData: Dispatch<SetStateAction<FormularioAdopcion>>;
}


import Spinner from './Spinner';
import dynamic from 'next/dynamic';

const DatosDelSolicitanteSection = dynamic(() => import('./form-sections/DatosDelSolicitanteSection'), { loading: () => <Spinner /> });
const SobreElEspacioSection = dynamic(() => import('./form-sections/SobreElEspacioSection'), { loading: () => <Spinner /> });
const SobreElCuidadoSection = dynamic(() => import('./form-sections/SobreElCuidadoSection'), { loading: () => <Spinner /> });

export default function AdoptionForm({ formData, setFormData }: AdoptionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.');
    
    let parsedValue: string | number | boolean = value;

    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    if (e.target.type === 'checkbox') {
        parsedValue = (e.target as HTMLInputElement).checked;
    }


    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormularioAdopcion],
        [field]: parsedValue,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Aquí puedes agregar la lógica para enviar los datos a tu API
    console.log(formData);
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Formulario enviado. Revisa la consola para ver los datos.');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <DatosDelSolicitanteSection formData={formData} handleChange={handleChange} />
      <SobreElEspacioSection formData={formData} handleChange={handleChange} />
      <SobreElCuidadoSection formData={formData} handleChange={handleChange} />

      <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : 'Enviar Solicitud de Adopción'}
      </button>
    </form>
  );
}
