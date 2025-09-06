from django.db import models
from app.dogs_api.models import Dog
from django.utils import timezone

class Medical_record(models.Model):
    dog = models.OneToOneField(
        Dog,
        on_delete=models.CASCADE,
        primary_key=True
    )
    
    last_update_date = models.DateTimeField(auto_now=True)
    
    vaccined = models.BooleanField(
        "Vacunado",
        help_text="Marca si este perrito tiene completo su esquema de Vacunación",
        default=False
        )
    
    sterilized = models.BooleanField(
        "Esterilizado",
        help_text="Marca si este perrito ya ha sido esterilizado",
        default=False
    )
    
    dewormed = models.BooleanField(
        "Desparacitado",
        help_text="Marca si este perrito ya ha sido desparacitado",
        default=False
        )
    
    diseases = models.CharField(
        "Enfermedades",
        blank= True,
        max_length=250,
        default="",
        help_text= "Anota las enfermedades que padece, si no tiene ninguna, dejar en blanco"
        )
    
    weight = models.PositiveSmallIntegerField("Peso", help_text="En Kilogramos")

    # ESTO SI PONEMOS SOLO UN REPORTE POR PERRO 
    report = models.TextField(
        "Reportes",
        help_text="Aqui puedes poner todos los reportes del seguimiento de la salud del perrito",
        blank=True,
        default=""
        )
    
    next_dose = models.DateTimeField(
        "Siguiente Dosis",
        help_text="Si el perrito esta sobre tratamiento, pon aqui la fecha y hora de la siguiente dosis que debe de tomar",
        blank=True,
        null=True
    )
    
    def __str__(self):
        return f"Expediente Medico de {self.dog.name}"
        
    class Meta:
        verbose_name = 'Registro Medico'
        verbose_name_plural = 'Registros Medicos'
        


# ESTO SI DECIDIMOS TENER MAS DE UN REPORTE POR PERRITO
# class Reports(models.Model):
#     medical_record = models.ForeignKey(
#         Medical_record,
#         on_delete=models.CASCADE
#         )
    
#     content = models.TextField(
#         "Reportes",
#         help_text="Aqui puedes poner el reporte del seguimiento de la salud del perrito",
#         blank=True,
#         default=""
#         )
    
#     date = models.DateField(auto_now_add=True)
    
#     registered_weight = models.PositiveSmallIntegerField("Peso")
    