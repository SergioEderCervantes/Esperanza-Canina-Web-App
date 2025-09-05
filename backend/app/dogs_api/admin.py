from django.contrib import admin
from dogs_api import models

admin.site.register(models.Dog)
admin.site.register(models.Beheavior)
admin.site.register(models.Dog_image)

