from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.conf import settings
from datetime import date
from cloudinary.models import CloudinaryField
# Create your models here.
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
    name = models.CharField(max_length=100)
    age_year = models.IntegerField(
        validators=[MinValueValidator(0),MaxValueValidator(30)],
        verbose_name= "Año de edad"
    )
    # TODO: que este campo sea opcional, poner un help text diciendo que se usa para cuando el perrito tiene menos de un año
    age_month = models.IntegerField(
        validators = [MinValueValidator(0),MaxValueValidator(11)],
        verbose_name= "Mes de edad"
    )
    genre = models.CharField(
        max_length = 1,
        choices = GENRE_CHOICES,
        verbose_name = "Genero"
    )
    adoption_state = models.BooleanField(
        default = False,
        help_text = "True si esta adptado",
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


    class Meta:
        db_table = "perros"
        verbose_name = "Perro"
        verbose_name_plural = "Perros"

class Dog_image(models.Model):
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE, related_name="images")
    # picture = models.ImageField(upload_to="dog_pictures/")
    image = CloudinaryField(
        'image',
        folder = f"{settings.CLOUDINARY_FOLDER}/dog_images",
        tags = [settings.CLOUDINARY_TAG]
    )
    is_primary = models.BooleanField(
        default = False,
        help_text = "True si es la imagen principal",
    )

    def __str__(self):
        return f"Imagen de {self.dog.name}"

    class Meta:
        db_table = "fotos_perros"
        verbose_name = "Foto de perro"
        verbose_name_plural = "Fotos de perros"

class Beheavior(models.Model):
    beheavior_name = models.CharField()
    beheavior_description = models.TextField()
    # TODO: poner el str y el meta
    
