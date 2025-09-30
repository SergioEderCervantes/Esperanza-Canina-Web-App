# Guía de Uso del SDK de la API

Este documento explica cómo utilizar el SDK autogenerado por `hey-api` para interactuar con el backend de Patitas, tanto en el servidor (SSR) como en el cliente, siguiendo las mejores prácticas para nuestra arquitectura Next.js.

## Principios Generales

-   **SDK:** Las funciones para llamar a la API se encuentran en `src/api/sdk.gen.ts`.
-   **Tipos:** Todos los tipos de datos y respuestas están en `src/api/types.gen.ts`. Siempre que sea posible, importa y usa estos tipos para garantizar la seguridad de tipo.
-   **Cliente:** El cliente base está en `src/api/client.gen.ts`. Se recomienda mover la `baseUrl` a variables de entorno (`NEXT_PUBLIC_API_BASE_URL`) para producción.

---

## 1. Uso en el Servidor (Server-Side Rendering)

Este es el método principal para obtener los datos que se necesitan para el renderizado inicial de una página. Se usa en los **React Server Components** (los componentes `async` por defecto en el App Router).

### Escenario: Cargar la página de detalle de un perrito.

Para la ruta `src/app/perritos/[slug]/page.tsx`, necesitamos obtener los datos del perrito por su ID antes de renderizar la página.

**Puntos Clave:**

-   El componente de página es una función `async`.
-   Se llama directamente a la función del SDK (`perritosRetrieve`) con `await`.
-   El manejo de errores es crucial: si el perrito no se encuentra, usamos la función `notFound()` de Next.js para renderizar la página 404.

#### Ejemplo: `src/app/perritos/[slug]/page.tsx`

```tsx
import { perritosRetrieve } from '@/api/sdk.gen';
import type { DetailedDog } from '@/api/types.gen';
import { notFound } from 'next/navigation';

// El componente de página ahora puede ser asíncrono
export default async function PerritoDetailPage({ params }: { params: { slug: string } }) {
  const dogId = Number(params.slug);

  // Validamos que el slug sea un número
  if (isNaN(dogId)) {
    notFound();
  }

  let dog: DetailedDog;

  try {
    // Llamamos al SDK directamente desde el Server Component
    const response = await perritosRetrieve({
      path: { id: dogId },
    });
    dog = response.data;
  } catch (error) {
    // Si la API devuelve un error (ej. 404), `hey-api` lo lanza.
    // Lo capturamos y mostramos la página de notFound de Next.js.
    console.error(`Error fetching dog with ID ${dogId}:`, error);
    notFound();
  }

  return (
    <div>
      <h1>{dog.name}</h1>
      <p>{dog.description}</p>
      {/* ... resto del renderizado con los datos del perro */}
    </div>
  );
}
```

---

## 2. Uso en el Cliente (Client-Side Rendering)

Este método se usa para funcionalidades interactivas que no requieren una recarga completa de la página, como aplicar filtros, buscar o cambiar de página.

### Escenario: Filtrar y paginar la lista de perritos.

La página `src/app/perritos/page.tsx` puede renderizar inicialmente la primera página de perros desde el servidor. Sin embargo, la lista interactiva (con sus filtros y botones de paginación) debería ser un **Client Component** (`'use client'`).

**Puntos Clave:**

-   El componente debe tener la directiva `'use client'` al inicio.
-   Se usa `useState` para manejar el estado de los filtros, la página actual, los datos, el estado de carga y los errores.
-   Se usa `useEffect` para volver a llamar a la API cuando cambian los filtros o la página.

#### Ejemplo: `src/components/perritos/InteractiveDogList.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { perritosList } from '@/api/sdk.gen';
import type { PaginatedDogListList, PerritosListData } from '@/api/types.gen';

type DogListFilters = PerritosListData['query'];

// Este componente recibiría los datos iniciales como prop desde el Server Component padre
export function InteractiveDogList({ initialData }: { initialData: PaginatedDogListList }) {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState<DogListFilters>({ page: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // No ejecutar en la carga inicial si la página es 1 y no hay otros filtros
    if (filters.page === 1 && Object.keys(filters).length === 1) {
        setData(initialData);
        return;
    }

    const fetchDogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await perritosList({ query: filters });
        setData(response);
      } catch (err) {
        setError('No se pudieron cargar los perritos. Inténtalo de nuevo.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [filters, initialData]);

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleGenreChange = (newGenre: 'Macho' | 'Hembra') => {
    setFilters(prev => ({ ...prev, page: 1, genre: newGenre }));
  }

  return (
    <div>
      {/* Aquí irían los controles de filtros (botones, selects) */}
      {/* que llaman a handleGenreChange, etc. */}

      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista de perritos */}
      <div>
        {data.data.map(dog => (
          <div key={dog.id}>{dog.name}</div>
        ))}
      </div>

      {/* Paginación */}
      <div>
        <button
          onClick={() => handlePageChange(data.current_page - 1)}
          disabled={!data.previous || isLoading}
        >
          Anterior
        </button>
        <span>Página {data.current_page} de {data.total_pages}</span>
        <button
          onClick={() => handlePageChange(data.current_page + 1)}
          disabled={!data.next || isLoading}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
```