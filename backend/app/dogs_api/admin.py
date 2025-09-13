from django.contrib import admin
from app.dogs_api import models
from django.utils.html import format_html

class DogAdmin(admin.ModelAdmin):
    list_display = ("name", "dog_life_stage", "adoption_state", "view_image_button")

    list_editable = ("adoption_state",)
    
    exclude = ('adoption_state',)
    
    def view_image_button(self, obj):
        if obj.primary_image() is not None:
            return format_html(
                '<img src="{}" width="70" style="margin-right:8px; border-radius:4px;" />'
                '<a href="{}" target="_blank">Ampliar</a>',
                obj.primary_image(), obj.primary_image()
            )
        return "Sin foto"
    view_image_button.short_description = "Imagen"

    list_filter = ('adoption_state',)
    
    
admin.site.register(models.Beheavior)
admin.site.register(models.DogImage)

admin.site.register(models.Dog,DogAdmin)
