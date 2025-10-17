'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { initialAdoptionFormState } from '@/lib/adoptionFormBase';
import AdoptionForm from '@/components/ui/AdoptionForm';

export default function AdoptionPage() {
  const [formData, setFormData] = useState(initialAdoptionFormState);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const dogId = Number(params.id);
      setFormData(prev => ({
        ...prev,
        datos_del_animal: {
          ...prev.datos_del_animal,
          dog_id: dogId,
        },
      }));
    }
  }, [params.id]);

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Formulario de Adopción</h1>
      <AdoptionForm formData={formData} setFormData={setFormData} />
    </div>
  );
}