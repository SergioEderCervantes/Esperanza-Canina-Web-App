import requests

from app.dogs_api.models import Dog
from app.dogs_api.serializers import AdoptionRequestSerializer


class AdoptionFormManager:
    EVO_API_URL = "http://evoApiOla"

    # FORMATO DE RESPUESTA PROPUUESTPO:
    # PRIMER MENSAJE CON TODOS LOS DATOS DEL ADOPTANTE MENOS IDENTIFICACION Y LUGAR, PERO CON UNA FOTO DEL PERRITO A ADOPTAR
    # SEGUNDO MENSAJE CON LA IDENTIFICACION DEL ADOPTANTE
    # TERCER MENSAJE CON LA FOTO O VIDEO DEL LUGAR DONDE SE VA A QUEDAR EL PERRITO

    MESSAGE_PLACE_TEMPLATE = """
    {{foto/video}}
    Espacio donde vivirá {{dog.name}}"""

    def __init__(self, dog: Dog, serialized_adoption_form: AdoptionRequestSerializer):
        self.dog_instance = dog
        self.adoptionForm = serialized_adoption_form.validated_data

    # TODO: hacer un super buen manejo de los errores aqui, si algo falla aqui no se debe de quebrar el back o avisar al usuario del formulario
    # Pero si tenemos que guardar bien los logs para poder revisarlos, maybe mandar un mensaje a nosotros
    def execute(self):
        print("Procesando request para mandar a EvolutionAPI")
        print(f"Dog: {self.dog_instance}, Request: {self.adoptionForm}")
        # Se tiene que formatear todo, construir el mensaje y mandar a llamar a evolutionAPI
        wha_url = self.build_wha_link()
        message = self.build_message(wha_url)
        print(message)
        # self.make_request(message)

    # https://wa.me/1<number>
    def build_wha_link(self) -> str:
        URL_TEMPLATE = "https://wa.me/1{number}?text=Hola, he leido tu solicitud para adoptar a {dog} y la he acpetado, puedes venir a visitarnos el dia que quieras para terminar el proceso de adopcion."
        number_str = self.validate_number()
        return URL_TEMPLATE.format(
            number=number_str, dog=self.dog_instance.name
        ).replace(" ", "%20")

    def validate_number(self) -> str:
        unformatted_number = self.adoptionForm.get("cellphone_number")
        # TODO: Se tiene que validar que se ingreso un numero correcto, que esta en formato correcto (los 10 digitos juntos sin nada mas)
        # Opcional: se puede verificar que solo sea de ags, o solo de mexico
        print(unformatted_number)
        return unformatted_number

    def build_message(self, wha_url: str) -> str:
        message = (
            "Esperanza Canina Web App\n"
            f"Una solicitud de adopción para {self.dog_instance.name} ha sido enviada\n"
            "Datos del adoptante:\n"
            f"Nombre: {self.adoptionForm.get('adoptant_name')}\n"
            f"Numero de Celular: {self.validate_number()}\n"
            f"Domicilio: {self.adoptionForm.get('adress')}\n"
            "Los demas datos se mandan en los siguientes mensajes\n"
            f"Si decides aceptar la solicitud de adopción, se lo puedes comentar a {self.adoptionForm.get('adoptant_name')} con el siguiente link: {wha_url}"
        )
        return message

    def build_identification_message(self) -> str:
        pass

    def build_place_message(self) -> str:
        pass

    def make_request(self, msg: str) -> None:
        pass
