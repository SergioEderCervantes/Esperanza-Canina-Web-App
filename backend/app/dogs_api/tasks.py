import logging

from app.dogs_api.domain import FormularioAdopcion
from app.dogs_api.serializers import FormularioAdopcionSerializer
from app.dogs_api.services import AdoptionFormManager

logger = logging.getLogger(__name__)


def process_adoption_form(data_json):
    """
    data_json: json con los campos necesarios para reconstruir el objeto de dominio
    """
    try:
        # Reconstruir objeto
        serializer = FormularioAdopcionSerializer(data=data_json)
        serializer.is_valid(raise_exception=True)
        domain_object: FormularioAdopcion = serializer.save()
        print(f"En la task: {domain_object.datos_del_animal.dog_section}")
        # Ejecuta el servicio
        AdoptionFormManager(domain_object).execute()
    except Exception:
        logger.error(
            "Falló el procesamiento del formulario de adopción.",
            exc_info=True,  # Adjunta la información completa de la excepción (traceback)
        )
        raise  # Vuelve a lanzar la excepción para que Django-Q sepa que la tarea falló
