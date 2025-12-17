'use client';

import { AdoptionProvider } from '@/context/AdoptionContext';
import NavigationLoader from '@/components/layout/NavigationLoader';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AdoptionProvider>
      <NavigationLoader />
      {children}
    </AdoptionProvider>
  );
}
