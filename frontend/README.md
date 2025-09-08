# 📦 Frontend (Next.js + Tailwind)

El frontend está desarrollado con **Next.js (App Router)** y **TailwindCSS**.  
Se encarga de mostrar la interfaz pública de la aplicación: landing, catálogo de perritos, vista individual, sección de ayuda y formularios de adopción.

---

## 🚀 Tecnologías principales

- **Next.js** → Framework React con App Router, para enrutamiento, SSR e ISR.  
- **TailwindCSS** → Framework de utilidades CSS para estilos rápidos y consistentes.  
- **TypeScript** → Tipado estático para mayor robustez.  

---

## 📂 Estructura de carpetas del frontend

```bash
frontend/
├── app/                     # Páginas y rutas públicas
│   ├── page.tsx             # Landing page
│   ├── perritos/            # Catálogo y detalle de perritos
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx  # Vista individual
│   ├── ayuda/               # Donaciones y voluntariado
│   │   └── page.tsx
│   └── adopcion/            # Formulario de adopción
│       └── page.tsx
│
├── components/              # Componentes reutilizables
│   ├── ui/                  # Botones, inputs, tarjetas genéricas
│   ├── layout/              # Navbar, Footer, Layout principal
│   └── perritos/            # Componentes específicos de catálogo
│
├── lib/                     # Funciones auxiliares y conexión API
│   ├── api.ts               # Cliente para consumir la API Django
│   ├── fetchDogs.ts         # Funciones de perritos
│   └── utils.ts             # Helpers generales
│
├── styles/                  # Estilos globales y utilitarios
│   └── globals.css          # Tailwind base + resets
│   
│
├── types/                   # Tipos TypeScript compartidos
│   ├── perrito.d.ts         # Modelo de datos Perrito
│   └── adopcion.d.ts        # Modelo de formulario de adopción
│
└── public/                  # Archivos estáticos (logos, imágenes, íconos)
```
---

## 📌 Convenciones

**Idiomas**  
- Código y carpetas internas → inglés.  
- Rutas públicas → español (`/perritos/firulais`, `/ayuda`).  

**Estilos**  
- Se usa TailwindCSS en componentes.  
- Estilos globales mínimos en `styles/globals.css`.  

**Datos dinámicos**  
- Catálogo de perritos y perfil individual usan **SSR/ISR** para mantenerse actualizados desde el backend Django.  

**Componentes**  
- `components/ui/` → genéricos reutilizables.  
- `components/layout/` → Navbar, Footer, etc.  
- `components/perritos/` → específicos del dominio.  
