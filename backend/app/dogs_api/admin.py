from django import forms
from django.contrib import admin
from django.contrib.admin import SimpleListFilter
from django.contrib.auth.models import Group, User
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_q.models import Failure, Schedule, Success
from unfold.admin import ModelAdmin, TabularInline

from app.dogs_api.models import Beheavior, Dog, DogImage
from app.vet_api.models import Medical_record

# Acomodar los base models de User y Groups
admin.site.unregister(User)
admin.site.unregister(Group)

# Quitar Django_Q things
admin.site.unregister(Success)
admin.site.unregister(Failure)
admin.site.unregister(Schedule)


class CustomClearableFileInput(forms.ClearableFileInput):
    # Wrapper para que js pueda anclase
    def render(self, name, value, attrs=None, renderer=None):
        output = super().render(name, value, attrs, renderer)
        return mark_safe(f'<div class="custom-file-input-container">{output}</div>')

class DogImageForm(forms.ModelForm):
    class Meta:
        model = DogImage
        fields = "__all__"  # noqa: DJ007
        widgets = {
            'image': CustomClearableFileInput(),
        }


class DogImageInline(TabularInline):
    model = DogImage
    form = DogImageForm
    extra = 1
    fields = ("image_thumbnail", "image", "is_primary")
    readonly_fields = ("image_thumbnail",)
    show_change_link = True
    verbose_name = "Imagen"
    verbose_name_plural = "Imágenes"

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{0}" style="height: 80px;" class="img_zoom-thumbnail" />',
                obj.image.url
            )
        return "-"
    image_thumbnail.short_description = "Vista Previa"
class AdoptionStateFilter(SimpleListFilter):
    title = 'Estado de adopción'
    parameter_name = 'adoption_state'

    def lookups(self, request, model_admin):
        return (
            ('adopted', 'Adoptado'),
            ('not_adopted', 'No adoptado'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'adopted':
            return queryset.filter(adoption_state=True)
        if self.value() == 'not_adopted':
            return queryset.filter(adoption_state=False)
        return queryset

@admin.register(Dog)
class DogAdminCLass(ModelAdmin):
    class Media:
        css = {
            "all": (
                "css/btn_img.css",
                "css/img_zoom.css",
                "css/custom_admin.css",
            )
        }
        js = (
            "js/image_preview.js",
            "js/img_zoom.js",
            "js/responsive_doginline.js",
        )

    inlines = [DogImageInline]
    list_display = (
        "edit_button",
        "name",
        "dog_life_stage_display",
        "dog_size_display",
        "dog_genre_display",
        "adoption_state",
        "section",
        "primary_image_thumbnail",
        "medical_history_link",
    )
    search_fields = ("name", "size", "genre", "section")
    list_filter = (AdoptionStateFilter, "size", "genre","section")
    fields = ("name", "age_year", "age_month", "genre","section", "adoption_state",
            "description", "size", "arrive_date", "beheaviors")
    filter_horizontal = ('beheaviors',)

    def edit_button(self, obj):
        url = reverse('admin:dogs_api_dog_change', args=[obj.pk])
        svg_icon = '''<svg fill="#000000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
            <g>
            <g>
                <path d="m455.1,137.9l-32.4,32.4-81-81.1 32.4-32.4c6.6-6.6 18.1-6.6 24.7,0l56.3,56.4c6.8,6.8 6.8,17.9 0,24.7zm-270.7,271l-81-81.1 209.4-209.7 81,81.1-209.4,209.7zm-99.7-42l60.6,60.7-84.4,23.8 23.8-84.5zm399.3-282.6l-56.3-56.4c-11-11-50.7-31.8-82.4,0l-285.3,285.5c-2.5,2.5-4.3,5.5-5.2,8.9l-43,153.1c-2,7.1 0.1,14.7 5.2,20 5.2,5.3 15.6,6.2 20,5.2l153-43.1c3.4-0.9 6.4-2.7 8.9-5.2l285.1-285.5c22.7-22.7 22.7-59.7 0-82.5z"/>
            </g>
            </g>
        </svg>'''
        return format_html('<a href="{}" class="edit-svg-button">{}</a>', url, mark_safe(svg_icon))
    edit_button.short_description = 'Editar' 
    def medical_history_link(self, obj):
        try:
            medical_record = obj.medical_record
            url = reverse('admin:vet_api_medical_record_change', args=[medical_record.pk])
            return format_html('<a href="{}" class="btn-link">Editar Registro</a>', url)
        except Medical_record.DoesNotExist:
            url = reverse('admin:vet_api_medical_record_add') + f'?dog={obj.pk}'
            return format_html('<a href="{}" class="btn-link btn-link-add">Crear Registro</a>', url)
    medical_history_link.short_description = 'Registro Médico'


    def dog_life_stage_display(self, obj):
        return obj.dog_life_stage()
    dog_life_stage_display.short_description = "Etapa de Vida"

    def dog_size_display(self, obj):
        return obj.get_size_display()
    dog_size_display.short_description = "Tamaño"

    def dog_genre_display(self, obj):
        return obj.get_genre_display()
    dog_genre_display.short_description = "Género"

    # def adoption_state_display(self, obj):
    #     return "Adoptado" if obj.adoption_state else "No adoptado"
    # adoption_state_display.short_description = "Estado de adopción"
    def primary_image_thumbnail(self, obj):
        url = obj.primary_image()
        if url:
            return format_html(
                '<img src="{0}" style="height: 80px;" class="img_zoom-thumbnail" />',
                url
            )
        return "-"
    primary_image_thumbnail.short_description = "Imagen primaria"

    def get_search_results(self, request, queryset, search_term):
        queryset, use_distinct = super().get_search_results(request, queryset, search_term)

        size_map = {"chico": "S", "mediano": "M", "grande": "L"}
        if search_term.lower() in size_map:
            queryset |= self.model.objects.filter(size=size_map[search_term.lower()])


        genre_map = {"macho": "M", "hembra": "H"}
        if search_term.lower() in genre_map:
            queryset |= self.model.objects.filter(genre=genre_map[search_term.lower()])

        return queryset, use_distinct


class BeheaviorForm(forms.ModelForm):
    class Meta:
        model = Beheavior
        fields = "__all__"
        widgets = {
            'color': forms.TextInput(attrs={'type': 'color'}),
        }

@admin.register(Beheavior)
class BeheaviorAdmin(ModelAdmin):
    form = BeheaviorForm
    class Media:
        css = {
            "all": (
                "css/custom_admin.css",
            )
        }
    list_display = ("edit_button", "beheavior_name", "beheavior_description", "color_display")
    search_fields = ("beheavior_name",)
    fields = ('beheavior_name', 'beheavior_description', 'color')

    def color_display(self, obj):
        return format_html(
            '<div style="width: 30px; height: 30px; background-color: {0};"></div>',
            obj.color
        )
    color_display.short_description = 'Color'

    def edit_button(self, obj):
        url = reverse('admin:dogs_api_beheavior_change', args=[obj.pk])
        svg_icon = '''<svg fill="#000000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
          <g>
            <g>
              <path d="m455.1,137.9l-32.4,32.4-81-81.1 32.4-32.4c6.6-6.6 18.1-6.6 24.7,0l56.3,56.4c6.8,6.8 6.8,17.9 0,24.7zm-270.7,271l-81-81.1 209.4-209.7 81,81.1-209.4,209.7zm-99.7-42l60.6,60.7-84.4,23.8 23.8-84.5zm399.3-282.6l-56.3-56.4c-11-11-50.7-31.8-82.4,0l-285.3,285.5c-2.5,2.5-4.3,5.5-5.2,8.9l-43,153.1c-2,7.1 0.1,14.7 5.2,20 5.2,5.3 15.6,6.2 20,5.2l153-43.1c3.4-0.9 6.4-2.7 8.9-5.2l285.1-285.5c22.7-22.7 22.7-59.7 0-82.5z"/>
            </g>
          </g>
        </svg>'''
        return format_html('<a href="{}" class="edit-svg-button">{}</a>', url, mark_safe(svg_icon))
    edit_button.short_description = 'Editar'

# @admin.register(DogImage)
# class DogImageAdmin(ModelAdmin):
#     list_display = ("dog_id", "dog", "image_thumbnail")
#     search_fields = ("dog__name",)
#     list_filter = ("dog",)
#     list_display_links = ("dog",)
#     readonly_fields = ("image_preview",)
#     fields = ("dog", "image_preview", "image", "is_primary")

#     def image_thumbnail(self, obj):
#         if obj.image:
#             return format_html(
#                 '<a href="{0}" target="_blank"><img src="{0}" style="height: 80px;"/></a>',
#                 obj.image.url
#             )
#         return "-"
#     image_thumbnail.short_description = "Imagen"

#     def image_preview(self, obj):
#         if obj.image:
#             return format_html(
#                 '<img src="{0}" style="height: 200px;"/>',
#                 obj.image.url
#             )
#         return "-"
#     image_preview.short_description = "Vista previa"

