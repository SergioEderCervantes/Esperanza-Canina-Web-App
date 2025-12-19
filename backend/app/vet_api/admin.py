from django.contrib import admin
from django.contrib.admin import SimpleListFilter
from django.urls import reverse
from django.utils import timezone
from django.utils.html import format_html
from django.utils.safestring import mark_safe
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
    class Media:
        css = {
            "all": (
                "css/custom_admin.css",
            )
        }
    list_display = ("edit_button", "dog", "next_dose", "vaccined", "sterilized", "dewormed")
    search_fields = ("dog__name",)
    list_filter = ("vaccined", "sterilized", "dewormed", NextDoseFilter)
    autocomplete_fields = ("dog",)

    def edit_button(self, obj):
        url = reverse('admin:vet_api_medical_record_change', args=[obj.pk])
        svg_icon = '''<svg fill="#000000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
          <g>
            <g>
              <path d="m455.1,137.9l-32.4,32.4-81-81.1 32.4-32.4c6.6-6.6 18.1-6.6 24.7,0l56.3,56.4c6.8,6.8 6.8,17.9 0,24.7zm-270.7,271l-81-81.1 209.4-209.7 81,81.1-209.4,209.7zm-99.7-42l60.6,60.7-84.4,23.8 23.8-84.5zm399.3-282.6l-56.3-56.4c-11-11-50.7-31.8-82.4,0l-285.3,285.5c-2.5,2.5-4.3,5.5-5.2,8.9l-43,153.1c-2,7.1 0.1,14.7 5.2,20 5.2,5.3 15.6,6.2 20,5.2l153-43.1c3.4-0.9 6.4-2.7 8.9-5.2l285.1-285.5c22.7-22.7 22.7-59.7 0-82.5z"/>
            </g>
          </g>
        </svg>'''
        return format_html('<a href="{}" class="edit-svg-button">{}</a>', url, mark_safe(svg_icon))
    edit_button.short_description = 'Editar'
