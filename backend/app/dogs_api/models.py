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
    name = models.CharField(
        max_length=100,
        verbose_name= "Nombre"
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
    
    def get_dog_life_stage(self):
        if self.age_year == 0 and self.age_month < 6:
            return "Cachorro"
        elif self.age_year < 2:
            return "Joven"
        elif self.age_year < 7:
            return "Adulto"
        else:
            return "Adulto Mayor"
        
    def get_primary_image(self):
    
        # Intentar obtener la imagen marcada como principal
        primary_img = self.images.filter(is_primary=True).first()
        if primary_img and primary_img.image:
            return primary_img.image.url
        
        # Si no hay imagen principal tomar la primera disponible
        first_img = self.images.first()
        if first_img and first_img.image:
            return first_img.image.url
        
        return None


    class Meta:
        db_table = "perros"
        verbose_name = "Perro"
        verbose_name_plural = "Perros"

class Dog_image(models.Model):
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

    class Meta:
        db_table = "fotos_perros"
        verbose_name = "Foto de perro"
        verbose_name_plural = "Fotos de perros"

class Beheavior(models.Model):
    beheavior_name = models.CharField()
    beheavior_description = models.TextField()

    class Meta:
        db_table = "comportamientos"
        verbose_name = "Comportamiento"
        verbose_name_plural = "Comportamientos"
    

    def __str__(self):
        return self.beheavior_name
    
