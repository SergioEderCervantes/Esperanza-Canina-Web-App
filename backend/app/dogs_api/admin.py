from django.contrib import admin
from app.dogs_api import models
from django.utils.html import format_html
from django.contrib.admin import SimpleListFilter

class AdoptionStateFilter(SimpleListFilter):
    title = 'Estado de adopción'
    parameter_name = 'adoption_state'

    def lookups(self, request, model_admin):
        return (
            ('1', 'Adoptados'),
            ('0', 'No Adoptados'),
        )

    def queryset(self, request, queryset):
        if self.value() == '1':
            return queryset.filter(adoption_state=True)
        if self.value() == '0':
            return queryset.filter(adoption_state=False)
        return queryset

class DogAdmin(admin.ModelAdmin):
    list_display = ("name", "dog_life_stage", "adoption_state", "view_image_button")
    list_editable = ("adoption_state",)
    list_filter = (AdoptionStateFilter,)
    exclude = ("adoption_state",)

    def view_image_button(self, obj):
        if obj.primary_image() is not None:
            return format_html(
                '<img src="{}" width="70" style="margin-right:8px; border-radius:4px;" />'
                '<a href="{}" target="_blank">Ampliar</a>',
                obj.primary_image(), obj.primary_image()
            )
        return "Sin foto"
    view_image_button.short_description = "Imagen"

admin.site.register(models.Beheavior)
admin.site.register(models.DogImage)
admin.site.register(models.Dog, DogAdmin)