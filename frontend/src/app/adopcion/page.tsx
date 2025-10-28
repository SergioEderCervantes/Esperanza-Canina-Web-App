'use client';

import { useEffect, useState } from 'react';
import { getAdoptionFormBase } from '@/lib/adoptionFormBase';
import type { FormularioAdopcion } from '@/api/types.gen';
import AdoptionForm from '@/components/ui/AdoptionForm';
import Spinner from '@/components/ui/Spinner';
import { useAdoptionContext } from '@/context/AdoptionContext';
import Link from 'next/link';

export default function AdoptionPage() {
  const [formData, setFormData] = useState<FormularioAdopcion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { dogToAdopt } = useAdoptionContext();
  console.log('[DEBUG] AdoptionPage received dog from context:', dogToAdopt);

  useEffect(() => {
    if (!dogToAdopt) {
      return;
    }

    const fetchFormBase = async () => {
      try {
        const formBase = await getAdoptionFormBase();
        formBase.datos_del_animal.dog_id = dogToAdopt.id;
        setFormData(formBase);
      } catch (err) {
        setError('No se pudo cargar el formulario de adopción. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      }
    };

    fetchFormBase();
  }, [dogToAdopt]);

  if (!dogToAdopt) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">No has seleccionado un perrito para adoptar.</h2>
        <p className="mb-4">Por favor, regresa a la lista de perritos y elige a tu futuro mejor amigo.</p>
        <Link href="/perritos" className="text-blue-600 hover:underline">
          Ver perritos disponibles
        </Link>
      </div>
    );
  }
  
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Formulario de Adopción para {dogToAdopt.name}</h1>
      <AdoptionForm formData={formData} setFormData={setFormData} />
    </div>
  );
}