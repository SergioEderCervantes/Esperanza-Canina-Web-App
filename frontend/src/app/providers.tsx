'use client';

import { AdoptionProvider } from '@/context/AdoptionContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdoptionProvider>
      {children}
    </AdoptionProvider>
  );
}
