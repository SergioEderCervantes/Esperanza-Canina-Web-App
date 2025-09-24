# app/dogs_api/filters.py

import django_filters
from django.db.models import Case, CharField, Value, When

from app.dogs_api.models import Dog


class DogFilter(django_filters.FilterSet):
    # Diccionarios de mapeo para convertir los valores de Swagger a los valores del modelo
    GENRE_MAP = {"Macho": "M", "Hembra": "H"}
    SIZE_MAP = {"Chico": "S", "Mediano": "M", "Grande": "L"}

    life_stage = django_filters.CharFilter(method="filter_life_stage")
    genre = django_filters.CharFilter(method="filter_genre")
    size = django_filters.CharFilter(method="filter_size")

    class Meta:
        model = Dog
        fields = ["beheaviors"]

    def filter_life_stage(self, queryset, name, value):
        annotated_queryset = queryset.annotate(
            life_stage_db=Case(
                When(age_year=0, age_month__lt=6, then=Value("Cachorro")),
                When(age_year__lt=2, then=Value("Joven")),
                When(age_year__lt=7, then=Value("Adulto")),
                default=Value("Adulto Mayor"),
                output_field=CharField(),
            )
        )
        return annotated_queryset.filter(life_stage_db=value)

    def filter_genre(self, queryset, name, value):
        mapped_value = self.GENRE_MAP.get(value)
        if mapped_value:
            return queryset.filter(genre=mapped_value)
        return queryset

    def filter_size(self, queryset, name, value):
        mapped_value = self.SIZE_MAP.get(value)
        if mapped_value:
            return queryset.filter(size=mapped_value)
        return queryset
