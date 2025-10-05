from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group, User
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from app.dogs_api.models import Beheavior, Dog, DogImage

# Acomodar los base models de User y Groups
admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    # Forms loaded from `unfold.forms`
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    icon = "person"


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    icon = "group"
    pass

class DogImageInline(admin.TabularInline):
    model = DogImage
    extra = 1
    fields = ("image_thumbnail", "image", "is_primary")
    readonly_fields = ("image_thumbnail",)
    show_change_link = True

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<a href="{0}" target="_blank"><img src="{0}" style="height: 80px;"/></a>',
                obj.image.url
            )
        return "-"
    image_thumbnail.short_description = "Imagen"

@admin.register(Dog)
class DogAdminCLass(ModelAdmin):
    inlines = [DogImageInline]
    list_display = ("name", "adoption_state_display", "primary_image_thumbnail")
    search_fields = ("name",)
    list_filter = ("adoption_state",)
    # filter_horizontal = ("beheaviors",)
    fields = ("name", "age_year", "age_month", "genre", "adoption_state",
              "description", "size", "arrive_date", "beheaviors")

    def adoption_state_display(self, obj):
        return "Adoptado" if obj.adoption_state else "No adoptado"
    adoption_state_display.short_description = "Estado de adopción"

    def primary_image_thumbnail(self, obj):
        url = obj.primary_image()
        if url:
            return format_html(
                '<a href="{0}" target="_blank"><img src="{0}" style="height: 80px;"/></a>',
                url
            )
        return "-"
    primary_image_thumbnail.short_description = "Imagen primaria"

@admin.register(Beheavior)
class BeheaviorAdmin(ModelAdmin):
    list_display = ("beheavior_name", "beheavior_description")
    search_fields = ("beheavior_name",)

@admin.register(DogImage)
class DogImageAdmin(ModelAdmin):
    list_display = ("dog_id", "dog", "image_thumbnail")
    search_fields = ("dog__name",)
    list_filter = ("dog",)
    list_display_links = ("dog",)
    readonly_fields = ("image_preview",)
    fields = ("dog", "image_preview", "image", "is_primary")

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<a href="{0}" target="_blank"><img src="{0}" style="height: 80px;"/></a>',
                obj.image.url
            )
        return "-"
    image_thumbnail.short_description = "Imagen"

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{0}" style="height: 200px;"/>',
                obj.image.url
            )
        return "-"
    image_preview.short_description = "Vista previa"

