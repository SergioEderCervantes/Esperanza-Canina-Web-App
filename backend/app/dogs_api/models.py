import random
from datetime import date

from cloudinary.models import CloudinaryField
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


# TODO: Comentar los Modelos, descripcion simple
class Dog(models.Model):
    # TODO: Cambiar la clave, M de Macho y H de hembra
    GENRE_CHOICES = {
        "M": "Macho",
        "H": "Hembra",
    }

    SIZE_CHOICES = {
        "S": "Chico",
        "M": "Mediano",
        "L": "Grande",
    }

    MALE_DOG_NAMES = [
        "Max",
        "Rocky",
        "Bruno",
        "Thor",
        "Milo",
        "Rex",
        "Simba",
        "Zeus",
        "Jack",
        "Toby",
        "Bobby",
        "Chester",
        "Duke",
        "Tommy",
        "Rocco",
    ]
    FEMALE_DOG_NAMES = [
        "Luna",
        "Kira",
        "Maya",
        "Daisy",
        "Nina",
        "Sasha",
        "Nala",
        "Lola",
        "Canela",
        "Mila",
        "Molly",
        "Akira",
        "Bella",
        "Greta",
        "Dulce",
        "Kiara",
    ]
    NEUTRAL_NAMES = ["Coco", "Lucky", "Chispa", "Terry"]

    SECTION_CHOICES = {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
    }
    
    LIFE_STAGE_CHOICES = {
        "CACHORRO": "Cachorro",
        "JOVEN": "Joven",
        "ADULTO": "Adulto",
        "ADULTO_MAYOR": "Adulto Mayor",
    }
    
    name = models.CharField(max_length=100, verbose_name="Nombre", blank=True)
    
    # Campos deprecados (mantener por compatibilidad)
    age_year = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(30)],
        verbose_name="Año de edad",
        default=0,
        blank=True,
        null=True,
    )
    age_month = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(11)],
        verbose_name="Mes de edad",
        default=0,
        blank=True,
        null=True,
    )

    life_stage = models.CharField(
        max_length=15,
        choices=LIFE_STAGE_CHOICES,
        verbose_name="Etapa de vida",
    )

    section = models.CharField(
        max_length=1,
        choices=SECTION_CHOICES,
        verbose_name="Sección",
        default="0",
    )

    genre = models.CharField(max_length=1, choices=GENRE_CHOICES, verbose_name="Genero")
    adoption_state = models.BooleanField(
        default=False,
        help_text="Seleccionar si esta adptado",
        verbose_name="Estado de adopcion",
    )
    description = models.TextField(blank=True, default="", verbose_name="Descripcion")
    size = models.CharField(max_length=1, choices=SIZE_CHOICES, verbose_name="Tamaño")
    arrive_date = models.DateField(default=date.today, verbose_name="Fecha de llegada")
    beheaviors = models.ManyToManyField("Beheavior", verbose_name="Comportamientos")

    class Meta:
        db_table = "perros"
        verbose_name = "Perro"
        verbose_name_plural = "Perros"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.name or not self.name.strip():
            # Elige lista por genero
            if self.genre == "M":
                base_list = self.MALE_DOG_NAMES + self.NEUTRAL_NAMES
            elif self.genre == "H":
                base_list = self.FEMALE_DOG_NAMES + self.NEUTRAL_NAMES
            else:
                base_list = (
                    self.MALE_DOG_NAMES + self.FEMALE_DOG_NAMES + self.NEUTRAL_NAMES
                )
            self.name = random.choice(base_list)
        super().save(*args, **kwargs)

    def dog_life_stage(self):
        # Priorizar el campo directo life_stage
        if self.life_stage:
            return self.get_life_stage_display()

        if self.age_year == 0 and self.age_month and self.age_month < 6:
            return "Cachorro"
        elif self.age_year and self.age_year < 2:
            return "Joven"
        elif self.age_year and self.age_year < 7:
            return "Adulto"
        elif self.age_year and self.age_year >= 7:
            return "Adulto Mayor"
        return "Adulto"  # Default

    dog_life_stage.short_description = "Etapa de vida"

    def primary_image(self):
        # Intentar obtener la imagen marcada como principal
        primary_img = self.images.filter(is_primary=True).first()
        if primary_img and primary_img.image:
            return primary_img.image.url

        # Si no hay imagen principal tomar la primera disponible
        first_img = self.images.first()
        if first_img and first_img.image:
            return first_img.image.url

        return None

    @property
    def size_display(self):
        return self.get_size_display()

    @property
    def genre_display(self):
        return self.get_genre_display()


class DogImage(models.Model):
    dog = models.ForeignKey(
        Dog,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Perro"
    )
    image = CloudinaryField(
        "Archivo de imagen",
        folder=f"dog_images/{settings.CLOUDINARY_FOLDER}",
        tags=[settings.CLOUDINARY_TAG]
    )
    is_primary = models.BooleanField(
        default=False,
        help_text="Seleccionar si es la imagen principal",
        verbose_name="Principal"
    )

    class Meta:
        db_table = "fotos_perros"
        verbose_name = "Foto de perro"
        verbose_name_plural = "Fotos de perros"

    def __str__(self):
        return f"Imagen de {self.dog.name}"

    def save(self, *args, **kwargs):
        # Si se está guardando como primaria, quitar la primaria de las demás
        if self.is_primary:
            DogImage.objects.filter(dog=self.dog, is_primary=True).exclude(pk=self.pk).update(is_primary=False)
        else:
            # Si ninguna imagen de ese perro es primaria después de guardar, esta se vuelve primaria
            if not DogImage.objects.filter(dog=self.dog, is_primary=True).exclude(pk=self.pk).exists():
                self.is_primary = True
        super().save(*args, **kwargs)

    def url(self):
        return self.image.url


class Beheavior(models.Model):
    beheavior_name = models.CharField(
        max_length=30, unique=True, verbose_name="Nombre del Comportamiento"
    )
    beheavior_description = models.TextField(
        blank=True, default="", verbose_name="Descripción del Comportamiento"
    )
    color = models.CharField(
        max_length=7, default="#FFFFFF", verbose_name="Color"
    )

    class Meta:
        db_table = "comportamientos"
        verbose_name = "Comportamiento"
        verbose_name_plural = "Comportamientos"

    def __str__(self):
        return self.beheavior_name
