from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group, User
from django.contrib.admin import SimpleListFilter
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.admin import TabularInline
from app.dogs_api.models import Beheavior, Dog, DogImage
from django import forms
from django.utils.safestring import mark_safe



# Acomodar los base models de User y Groups
admin.site.unregister(User)
admin.site.unregister(Group)
admin


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    icon = "person"


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    icon = "group"
    pass

class CustomClearableFileInput(forms.ClearableFileInput):
    # Wrapper para que js pueda anclase
    def render(self, name, value, attrs=None, renderer=None):
        output = super().render(name, value, attrs, renderer)
        return mark_safe(f'<div class="custom-file-input-container">{output}</div>')

class DogImageForm(forms.ModelForm):
    class Meta:
        model = DogImage
        fields = "__all__"
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
            )
        }
        js = (
            "js/image_preview.js",
            "js/img_zoom.js",
            "js/responsive_doginline.js",
        )

    inlines = [DogImageInline]
    list_display = (
        "name",
        "dog_life_stage_display",
        "dog_size_display",
        "dog_genre_display",
        "adoption_state_display",
        "section",
        "primary_image_thumbnail",
    )
    search_fields = ("name", "size", "genre", "section")
    list_filter = (AdoptionStateFilter, "size", "genre","section")
    fields = ("name", "age_year", "age_month", "genre","section", "adoption_state",
            "description", "size", "arrive_date", "beheaviors")


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

    def adoption_state_display(self, obj):
        return "✅" if obj.adoption_state else "❌"
    adoption_state_display.short_description = "Estado de adopción"

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


@admin.register(Beheavior)
class BeheaviorAdmin(ModelAdmin):
    list_display = ("beheavior_name", "beheavior_description")
    search_fields = ("beheavior_name",)

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

