'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CustomLoader from '@/components/ui/CustomLoader';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
        const linkPathname = new URL(link.href).pathname;
        if (linkPathname !== pathname) {
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
      <CustomLoader />
    </div>
  );
}
