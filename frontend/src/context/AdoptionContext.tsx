'use client';

import { createContext, useState, ReactNode, useContext } from 'react';
import type { DetailedDog } from '@/api/types.gen';

interface AdoptionContextType {
  dogToAdopt: DetailedDog | null;
  setDogToAdopt: (dog: DetailedDog | null) => void;
}

const AdoptionContext = createContext<AdoptionContextType | undefined>(undefined);

export const AdoptionProvider = ({ children }: { children: ReactNode }) => {
  const [dogToAdopt, setDogToAdopt] = useState<DetailedDog | null>(null);

  return (
    <AdoptionContext.Provider value={{ dogToAdopt, setDogToAdopt }}>
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoptionContext = () => {
  const context = useContext(AdoptionContext);
  if (context === undefined) {
    throw new Error('useAdoptionContext must be used within an AdoptionProvider');
  }
  return context;
};
