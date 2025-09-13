from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.conf import settings
from datetime import date
from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError 
import random


# TODO: Comentar los Modelos, descripcion simple
class Dog(models.Model):

    GENRE_CHOICES = {
        "H": "Macho",
        "M": "Hembra",
    }

    SIZE_CHOICES = {
        "S": "Chico",
        "M": "Mediano",
        "L": "Grande",
    }

    MALE_DOG_NAMES = [
        "Max", "Rocky", "Bruno", "Thor", "Milo", "Rex", "Simba", "Zeus", 
        "Jack", "Toby", "Bobby", "Chester", "Duke", "Tommy", "Rocco"
    ]
    FEMALE_DOG_NAMES = [
        "Luna", "Kira", "Maya", "Daisy", "Nina", "Sasha", "Nala", "Lola",
        "Canela", "Mila", "Molly", "Akira", "Bella", "Greta", "Dulce", "Kiara"
    ]
    NEUTRAL_NAMES = [
        "Coco", "Lucky", "Chispa","Terry"
    ]
    name = models.CharField(
        max_length=100,
        verbose_name= "Nombre",
        blank= True
    )
    age_year = models.IntegerField(
        validators=[MinValueValidator(0),MaxValueValidator(30)],
        verbose_name= "Año de edad",
        default= 0
    )
    age_month = models.IntegerField(
        validators = [MinValueValidator(0),MaxValueValidator(11)],
        verbose_name= "Mes de edad",
        default= 0
    )
    genre = models.CharField(
        max_length = 1,
        choices = GENRE_CHOICES,
        verbose_name = "Genero"
    )
    adoption_state = models.BooleanField(
        default = False,
        help_text = "Seleccionar si esta adptado",
        verbose_name = "Estado de adopcion"
    )
    size = models.CharField(
        max_length= 1,
        choices = SIZE_CHOICES,
        verbose_name = "Tamaño"
    )
    arrive_date = models.DateField(
        default=date.today,
        verbose_name = "Fecha de llegada"
    )
    description = models.TextField(
        blank =True,
        null = True,
        verbose_name = "Descripcion"
    )
    beheaviors = models.ManyToManyField("Beheavior")

    def __str__(self):
        return self.name
    
    def dog_life_stage(self):
        if self.age_year == 0 and self.age_month < 6:
            return "Cachorro"
        elif self.age_year < 2:
            return "Joven"
        elif self.age_year < 7:
            return "Adulto"
        else:
            return "Adulto Mayor"
        
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
    
    def clean(self):
        # Valida que no haya años y meses de edad en 0 al mismo tiempo
        if self.age_year == 0 and self.age_month == 0:
            raise ValidationError("El año y el mes de edad no pueden ser ambos cero.")
    
    def save(self, *args, **kwargs):
        if not self.name or not self.name.strip():
            # Elige lista por genero
            if self.genre == "H":
                base_list = self.MALE_DOG_NAMES + self.NEUTRAL_NAMES
            elif self.genre == "M":
                base_list = self.FEMALE_DOG_NAMES + self.NEUTRAL_NAMES
            else:
                base_list = self.MALE_DOG_NAMES + self.FEMALE_DOG_NAMES + self.NEUTRAL_NAMES
            self.name = random.choice(base_list)
        super().save(*args, **kwargs)
    


    class Meta:
        db_table = "perros"
        verbose_name = "Perro"
        verbose_name_plural = "Perros"

class DogImage(models.Model):
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE, related_name="images")
    # picture = models.ImageField(upload_to="dog_pictures/")
    image = CloudinaryField(
        'image',
        folder = f"dog_images/{settings.CLOUDINARY_FOLDER}",
        tags = [settings.CLOUDINARY_TAG]
    )
    is_primary = models.BooleanField(
        default = False,
        help_text = "Seleccionar si es la imagen principal",
    )

    def __str__(self):
        return f"Imagen de {self.dog.name}"
    
    def url(self):
        return self.image.url

    class Meta:
        db_table = "fotos_perros"
        verbose_name = "Foto de perro"
        verbose_name_plural = "Fotos de perros"


class Beheavior(models.Model):
    beheavior_name = models.CharField(
        max_length=30,
        unique=True,  
        verbose_name="Nombre del Comportamiento"
    )
    beheavior_description = models.TextField(
        blank=True, 
        null=True,
        verbose_name="Descripción del Comportamiento"
    )

    class Meta:
        db_table = "comportamientos"
        verbose_name = "Comportamiento"
        verbose_name_plural = "Comportamientos"
    

    def __str__(self):
        return self.beheavior_name
    
