from app.dogs_api.domain import FormularioAdopcion
from app.dogs_api.serializers import FormularioAdopcionSerializer
from app.dogs_api.services import AdoptionFormManager


def process_adoption_form(data_json):
    """
    data_json: json con los campos necesarios para reconstruir el objeto de dominio
    """
    try:
        # Reconstruir objeto
        serializer = FormularioAdopcionSerializer(data=data_json)
        serializer.is_valid(raise_exception=True)
        domain_object: FormularioAdopcion = serializer.save()
        # Ejecuta el servicio
        AdoptionFormManager(domain_object).execute()
    except Exception as e:
        print(e)
