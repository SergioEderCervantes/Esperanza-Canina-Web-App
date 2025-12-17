"""
Rutas principales del módulo core.

- admin/: panel de administración.
- api/perritos/: rutas de la API de perros (app.dogs_api.urls).
- api/schema/ y api/docs/: esquema OpenAPI y Swagger UI (drf_spectacular).
- health/: comprobación básica de salud.
- raíz y path comodín: redirigen a la documentación (swagger-ui).

Las redirecciones son permanentes (301) por defecto.
"""

from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import redirect
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path, include
from app.dogs_api.views import TestMetricView



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/perritos/", include("app.dogs_api.urls")),
    path("api/registros-medicos/", include("app.vet_api.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path('', include('django_prometheus.urls')),
    path("visitas-test/", TestMetricView.as_view(), name="test-metric"),
    path("health/", lambda request: HttpResponse("Healthy", 200)),
    path("", lambda request: redirect("swagger-ui", permanent=True)),
    path(
        "<path:unused_path>",
        lambda request, unused_path: redirect("swagger-ui", permanent=True),
    ),
]
