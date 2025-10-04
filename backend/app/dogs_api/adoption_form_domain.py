from dataclasses import dataclass
from typing import Optional


@dataclass
class DatosDelAnimal:
    """Datos Bloqueados del Animal a adoptar."""
    dog_name: str
    dog_age: int
    dog_size: str
    dog_genre: str

@dataclass
class DatosDelSolicitante:
    """Información del solicitante/adoptante."""
    adpt_name: str
    adpt_age: int
    adpt_address: str
    adpt_form_field1: Optional[str] = None  # Bus/metro cercano
    adpt_form_field2: Optional[str] = None  # Número de celular
    adpt_form_field3: Optional[str] = None  # Número de emergencia
    adpt_form_field4: Optional[str] = None  # Horario dev bbcontacto
    adpt_form_field5: Optional[str] = None  # Correo electrónico
    adpt_form_field6: Optional[str] = None  # Ocupación
    adpt_form_field7: Optional[bool] = None  # Acuerdo de seguimiento
    adopt_form_field8: Optional[str] = None   # Razón de no seguimiento

@dataclass
class EspacioDondeVivira:
    """Detalles sobre el entorno de vida del perrito."""
    living_form_field1: Optional[str] = None   # Acuerdo familiar/Comentarios
    living_form_field3: Optional[bool] = None   # Tiene otras mascotas
    living_form_field4: Optional[str] = None   # Cuáles (si aplica)
    living_form_field5: Optional[str] = None   # Servicios/Cuidados a mascotas
    living_form_field6: Optional[bool] = None   # Mascotas esterilizadas
    living_form_field7: Optional[str] = None   # Razón de no esterilización
    living_form_field8: Optional[str] = None   # Dónde duermen las mascotas
    living_form_field9: Optional[str] = None   # Responsable de las mascotas
    living_form_field10: Optional[str] = None  # Tipo de vivienda (Propia/Rentada)
    living_form_field11: Optional[str] = None   # Qué pasaría si se cambia de casa/país

@dataclass
class CuidadoYCalidadDeVida:
    """Preguntas sobre el cuidado diario y posibles escenarios."""
    dogcare_field1: Optional[str] = None  # Persona indicada
    dogcare_field2: Optional[bool] = None  # Hay niños
    dogcare_field3: Optional[str] = None  # Edades de los niños
    dogcare_field4: Optional[bool] = None  # Niños acostumbrados a perros
    dogcare_field5: Optional[str] = None  # Morder niños/adultos
    dogcare_field6: Optional[str] = None  # Qué pasará en vacaciones
    dogcare_field7: Optional[str] = None  # Espacio para dormir/comer/defecar
    dogcare_field8: Optional[str] = None  # Destrozos en casa
    dogcare_field9: Optional[str] = None   # Dónde se quedará sin el adoptante

@dataclass
class FormularioAdopcion:
    """Objeto de Dominio Principal para el Formulario de Adopción."""
    datos_del_animal: DatosDelAnimal
    datos_del_solicitante: DatosDelSolicitante
    sobre_el_espacio: EspacioDondeVivira
    sobre_el_cuidado: CuidadoYCalidadDeVida

    def make_data_dict(self)-> dict:
        result = {}
        result.update(self.datos_del_animal.__dict__)
        result.update(self.datos_del_solicitante.__dict__)
        result.update(self.sobre_el_espacio.__dict__)
        result.update(self.sobre_el_cuidado.__dict__)
        return result


def make_example_form() -> FormularioAdopcion:

    datos_animal = DatosDelAnimal(
        dog_name="Firulais",
        dog_age=3,
        dog_size="Mediano",
        dog_genre="Macho"
    )

    datos_solicitante = DatosDelSolicitante(
        adpt_name="Juan Pérez",
        adpt_age=30,
        adpt_address="Calle Falsa 123",
        adpt_form_field1="Metro Centro",
        adpt_form_field2="5551234567",
        adpt_form_field3="5557654321",
        adpt_form_field4="9am-6pm",
        adpt_form_field5="juan.perez@email.com",
        adpt_form_field6="Ingeniero",
        adpt_form_field7=True,
        adopt_form_field8="No aplica"
    )

    espacio_vivira = EspacioDondeVivira(
        living_form_field1="Todos de acuerdo",
        living_form_field3=True,
        living_form_field4="Gato",
        living_form_field5="Veterinario anual",
        living_form_field6=True,
        living_form_field7="No aplica",
        living_form_field8="En la sala",
        living_form_field9="Juan Pérez",
        living_form_field10="Propia",
        living_form_field11="Llevaría al perro conmigo"
    )

    cuidado_calidad = CuidadoYCalidadDeVida(
        dogcare_field1="Juan Pérez",
        dogcare_field2=True,
        dogcare_field3="5, 8",
        dogcare_field4=True,
        dogcare_field5="No",
        dogcare_field6="Lo llevo conmigo",
        dogcare_field7="Sala, cocina, patio",
        dogcare_field8="No suele",
        dogcare_field9="Con familia"
    )

    formulario = FormularioAdopcion(
        datos_del_animal=datos_animal,
        datos_del_solicitante=datos_solicitante,
        sobre_el_espacio=espacio_vivira,
        sobre_el_cuidado=cuidado_calidad
    )

    return formulario
