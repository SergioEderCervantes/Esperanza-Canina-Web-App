# 🐾 Patitas WebApp

Aplicación web diseñada para apoyar al albergue **Patitas** en tres frentes principales:

1. Mostrar de manera atractiva y clara a los perritos disponibles.
2. Agilizar el proceso de adopción mediante formularios y notificaciones automatizadas.
3. Incentivar la ayuda al albergue por medio de donaciones y voluntariado.

---

## 🚀 Stack Tecnológico

- **Frontend (página pública):** [Next.js](https://nextjs.org/) con SSR
- **Backend (API):** [Django + Django REST Framework](https://www.django-rest-framework.org/)
- **Panel de administración:** Django Admin
- **Base de datos:** PostgreSQL
- **Mensajería:** [EvolutionAPI](https://evolution-api.com/) (WhatsApp)
- **Infraestructura:** Docker + Docker Compose
- **Hosting:** VPS (por definir)

---

## 📌 Requerimientos Funcionales

- **Acceso y navegación**

  - Landing page con CTA de donaciones y voluntariado.
  - Página individual de cada perrito con enlace único.
  - Sección de información del albergue (misión, visión, historia).

- **Donaciones y voluntariado**

  - Información sobre cómo ayudar al albergue.
  - Donaciones vía transferencia bancaria.
  - Contacto directo vía WhatsApp.
  - Registro de voluntarios.

- **Gestión de perritos**

  - Perritos destacados en landing.
  - Catálogo con todos los perritos (paginación/lazy loading).
  - Filtros (edad, tamaño, sexo, salud, etc.).
  - Vista individual con nombre, edad, características, fotos y estado de adopción.

- **Interacciones en perfil**

  - Compartir en redes sociales o copiar URL.
  - Botón “Adoptar” con formulario.

- **Proceso de adopción**

  - Formulario con: datos del adoptante, INE, dirección, fotos del espacio.
  - Al enviar: guardar datos en servidor + notificación vía WhatsApp.

- **Administración**

  - Autenticación de administradores.
  - CRUD de perritos.

- **Administración veterinaria (opcional)**
  - Autenticación de veterinarios.
  - CRUD con campos médicos.
  - Historial médico digital.

---

## ⚙️ Requerimientos No Funcionales

- **Rendimiento:** Paginación, lazy loading.
- **Usabilidad:** Interfaz responsiva y atractiva.
- **Seguridad:** Protección de datos sensibles.
- **Escalabilidad:** Posibilidad de agregar nuevas funcionalidades.

---

## 🖥️ Estructura del Proyecto

```bash
patitasWebApp/
│── frontend/              # Aplicación pública (Next.js)
│   ├── Dockerfile
│   └── README.md
│
│── backend/               # API y panel de administración (Django + DRF)
│   ├── Dockerfile
│   ├── manage.py
│   └── README.md
│
│── dockerCompose/         # Archivos de configuración Docker
│
└── README.md              # Documentación principal
```

---

## 🐳 Instalación y Ejecución con Docker

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-org/patitasWebApp.git
   cd patitasWebApp
   ```

2. Settear las Variables de entorno:

   ```bash
   mv backend/.env.example backend/.env

   mv frontend/.env.local
   ```

3. Construir y levantar servicios:

    ```bash
    docker compose -f ./deploy/docker-compose.dev.yml up --build
    ```

4. Acceder a la aplicación:

   - Frontend (Next.js): [http://localhost:3000](http://localhost:3000)
   - Backend (Django API/Admin): [http://localhost:8000](http://localhost:8000)

---

## 👩‍💻 Contribución

- Revisar los archivos `ReadME.md` en **frontend/** y **backend/** para lineamientos específicos.

---

## 📄 Licencia

Este proyecto se desarrolla para fines sociales y comunitarios. La licencia será definida según las necesidades del albergue.
