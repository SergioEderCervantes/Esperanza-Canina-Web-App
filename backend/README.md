# 🐾 Backend - Patitas WebApp

Este módulo corresponde al **backend de la aplicación Patitas**, desarrollado con **Django** y **Django REST Framework (DRF)**.  
Aquí se gestionan dos aspectos principales:

1. **API REST:** expone los servicios para la aplicación pública (frontend en Next.js).  
2. **Panel de administración:** interfaz privada basada en Django Admin para la gestión interna del albergue.  

---

## 🚀 Tecnologías principales

- [Django](https://www.djangoproject.com/)  
- [Django REST Framework](https://www.django-rest-framework.org/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Docker](https://www.docker.com/)  

---

## 📂 Estructura del proyecto

```bash
backend/
│── app/                    # Carpeta raíz para todas las apps de Django
│   ├── core/               # Configuración base del proyecto
│   │   ├── settings.py       # Configuración principal
│   │   ├── urls.py         # URLs principales del proyecto
│   │   └── wsgi.py
│   │
│   ├── nombre_app/         # Ejemplo de app 
│   │   ├── migrations/
│   │   ├── tests.py          # Tests unitarios 
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   │
│   └── ...
│
├── manage.py               # Entry point de Django
├── Dockerfile
└── README.md               # Este documento
```

👉 **Nota:** Todas las apps deben estar dentro de la carpeta `app/` para mantener la organización clara.

---

## ✅ Checklist para crear una nueva app en Django

### 1. Crear la app

Dentro del contenedor de docker, o con el entorno virtual encendido, navega a la carpeta `backend/` (donde está `manage.py`):

```bash
python manage.py startapp nombre_app app/nombre_app
```

> 🚨 Importante: siempre crearla dentro de `backend/app/`.

---

### 2. Estructurar la app

La app debe seguir este formato:

```
nombre_app/
├── migrations/
├── __init__.py
├── models.py
├── views.py
├── serializers.py   # si usas DRF
├── urls.py
└── tests.py
    
```

---

### 3. Registrar la app en `settings`

En `backend/app/core/settings.py`, agrega la app:

```python
INSTALLED_APPS = [
    ...
    "app.nombre_app",
]
```

---

### 4. Definir URLs

En `backend/app/nombre_app/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path("", views.ExampleView.as_view(), name="example"),
]
```

Y enlazar en `backend/app/core/urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    path("nombre_app/", include("app.nombre_app.urls")),
]
```

---

### 5. Migraciones

```bash
docker compose exec backend python manage.py makemigrations nombre_app
docker compose exec backend python manage.py migrate
```

> 🚨 Importante: Estos dos comandos no se deben de ejecutar en terminal dentro del virtual enviroment, saldra un error, esto solo funciona dentro del contenedor de docker

---

### 6. Escribir tests

Ejemplo en `tests.py`:

```python
from django.test import TestCase
from app.nombre_app.models import MiModelo

class MiModeloTest(TestCase):
    def test_str(self):
        obj = MiModelo.objects.create(nombre="Test")
        self.assertEqual(str(obj), "Test")
```

Ejecutar:

```bash
docker compose exec backend pytest
```

---

## 🔒 Panel de administración

El backend incluye un **Django Admin** personalizado para gestionar:

* Información de los perritos (CRUD).
* Estado de adopción.
* Información veterinaria de cada perrito

---

## 📄 Notas

* Se recomienda mantener las apps pequeñas y enfocadas en un dominio (ejemplo: `dogs`, `adoptions`, `donations`).
* Los tests deben escribirse por cada modelo, vista y serializer creado.
* Antes de hacer push, ejecutar los tests para garantizar la estabilidad.

---
    