'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  // Aplica el padding solo si NO es la landing page
  const className = isLanding ? '' : 'pt-28';

  return <main className={className}>{children}</main>;
}
