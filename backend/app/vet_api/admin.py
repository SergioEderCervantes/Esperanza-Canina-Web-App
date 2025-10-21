from django.contrib import admin
from django.contrib.admin import SimpleListFilter
from django.utils import timezone
from unfold.admin import ModelAdmin

from app.vet_api.models import Medical_record


class NextDoseFilter(SimpleListFilter):
    title = 'Próxima Dosis'
    parameter_name = 'next_dose_status'

    def lookups(self, request, model_admin):
        return (
            ('upcoming', 'Próximas Dosis'),
            ('past', 'Dosis Pasadas'),
        )

    def queryset(self, request, queryset):
        today = timezone.now().date()
        if self.value() == 'upcoming':
            return queryset.filter(next_dose__gte=today)
        if self.value() == 'past':
            return queryset.filter(next_dose__lt=today)
        return queryset


@admin.register(Medical_record)
class MedicalRecordAdmin(ModelAdmin):
    list_display = ("dog", "next_dose", "vaccined", "sterilized", "dewormed")
    search_fields = ("dog__name",)
    list_filter = ("vaccined", "sterilized", "dewormed", NextDoseFilter)
    autocomplete_fields = ("dog",)