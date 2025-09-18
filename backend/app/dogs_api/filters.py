import django_filters

from app.dogs_api.models import Dog


class DogFilter(django_filters.FilterSet):
    life_stage = django_filters.CharFilter(method="filter_life_stage")

    class Meta:
        model = Dog
        fields = ["size", "genre", "beheaviors"]

    # TODO: Esto no es precisamente lo mas eficiente, ya que recorre todo el queryset, si vemos que hay problemas de
    # rendimiento, cambiar por un metodo que haga el filter en sql (if value == "Cachorro" queryset.filter(age=0)....)
    def filter_life_stage(self, queryset, name, value):
        # value será "Cachorro", "Joven", "Adulto", "Adulto Mayor"
        dogs = []
        for dog in queryset:
            if dog.dog_life_stage() == value:
                dogs.append(dog.id)
        return queryset.filter(id__in=dogs)
