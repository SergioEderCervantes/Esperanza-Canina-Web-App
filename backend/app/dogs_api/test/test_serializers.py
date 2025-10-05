# tests/test_serializers.py
import pytest

from app.dogs_api.domain import FormularioAdopcion
from app.dogs_api.models import Beheavior, Dog, DogImage
from app.dogs_api.serializers import (
    DetailedDogBehaviorSerializer,
    DetailedDogSerializer,
    DogListSerializer,
    DogTopSerializer,
    FormularioAdopcionSerializer,
    SimpleDogBehaviorSerializer,
)


@pytest.mark.django_db
class TestDogSerializers:
    def test_dog_top_serializer(self):
        dog = Dog.objects.create(
            name="Firulais",
            age_year=1,
            age_month=2,
            genre="H",
            adoption_state=False,
            size="M",
        )
        DogImage.objects.create(
            dog=dog, is_primary=True, image="http://test.com/img1.jpg"
        )
        serializer = DogTopSerializer(dog)
        data = serializer.data
        assert "id" in data
        assert data["name"] == "Firulais"
        assert "primary_image" in data  # campo definido en fields

    def test_simple_behavior_serializer(self):
        behavior = Beheavior.objects.create(
            beheavior_name="Juguetón", beheavior_description="Le gusta jugar"
        )
        serializer = SimpleDogBehaviorSerializer(behavior)
        data = serializer.data
        assert data["beheavior_name"] == "Juguetón"
        assert "id" in data
        assert "beheavior_description" not in data  # no debería estar

    def test_dog_list_serializer_with_behaviors(self):
        dog = Dog.objects.create(
            name="Kira",
            age_year=3,
            age_month=0,
            genre="M",
            adoption_state=False,
            size="L",
        )
        behavior = Beheavior.objects.create(
            beheavior_name="Protector", beheavior_description="Cuida mucho"
        )
        dog.beheaviors.add(behavior)
        DogImage.objects.create(
            dog=dog, is_primary=False, image="http://test.com/img2.jpg"
        )

        serializer = DogListSerializer(dog)
        data = serializer.data
        assert data["name"] == "Kira"
        assert data["size_display"] == dog.get_size_display()
        assert data["genre_display"] == dog.get_genre_display()
        assert data["dog_life_stage"] == dog.dog_life_stage()
        assert "primary_image" in data
        assert len(data["beheaviors"]) == 1
        assert data["beheaviors"][0]["beheavior_name"] == "Protector"

    def test_detailed_behavior_serializer(self):
        behavior = Beheavior.objects.create(
            beheavior_name="Tranquilo", beheavior_description="No ladra mucho"
        )
        serializer = DetailedDogBehaviorSerializer(behavior)
        data = serializer.data
        assert data["beheavior_name"] == "Tranquilo"
        assert data["beheavior_description"] == "No ladra mucho"


    def test_detailed_dog_serializer(self):
        dog = Dog.objects.create(
            name="Zeus",
            age_year=5,
            age_month=0,
            genre="H",
            adoption_state=False,
            size="M",
            description="Un perro fuerte",
        )
        behavior = Beheavior.objects.create(
            beheavior_name="Guardia", beheavior_description="Cuida la casa"
        )
        dog.beheaviors.add(behavior)
        DogImage.objects.create(
            dog=dog, is_primary=True, image="http://test.com/img4.jpg"
        )

        serializer = DetailedDogSerializer(dog)
        data = serializer.data
        assert data["name"] == "Zeus"
        assert data["size_display"] == dog.get_size_display()
        assert data["genre_display"] == dog.get_genre_display()
        assert data["dog_life_stage"] == dog.dog_life_stage()
        assert data["description"] == "Un perro fuerte"
        assert len(data["beheaviors"]) == 1
        assert data["beheaviors"][0]["beheavior_description"] == "Cuida la casa"
        assert len(data["images"]) == 1
        assert "url" in data["images"][0]


@pytest.mark.django_db
class TestFormularioAdopcionSerializer:
    def test_deserialization_happy_path(self):
        """
        Prueba la deserialización de un JSON válido (con dog_id) al objeto de dominio FormularioAdopcion.
        """
        # 1. Crear un perro en la base de datos de prueba
        dog = Dog.objects.create(
            name="Firulais",
            age_year=3,
            age_month=0,
            genre="H",
            size="M",
        )

        # 2. Definir el JSON de entrada con el dog_id
        json_data = {
            "datos_del_animal": {"dog_id": dog.id},
            "datos_del_solicitante": {
                "adpt_name": "Juan Pérez",
                "adpt_age": 30,
                "adpt_address": "Calle Falsa 123",
                "adpt_form_field1": "Metro Centro",
                "adpt_form_field2": "5551234567",
                "adpt_form_field3": "5557654321",
                "adpt_form_field4": "9am-6pm",
                "adpt_form_field5": "juan.perez@email.com",
                "adpt_form_field6": "Ingeniero",
                "adpt_form_field7": True,
                "adopt_form_field8": "No aplica",
            },
            "sobre_el_espacio": {
                "living_form_field1": "Todos de acuerdo",
                "living_form_field3": True,
                "living_form_field4": "Gato",
                "living_form_field5": "Veterinario anual",
                "living_form_field6": True,
                "living_form_field7": "No aplica",
                "living_form_field8": "En la sala",
                "living_form_field9": "Juan Pérez",
                "living_form_field10": "Propia",
                "living_form_field11": "Llevaría al perro conmigo",
            },
            "sobre_el_cuidado": {
                "dogcare_field1": "Juan Pérez",
                "dogcare_field2": True,
                "dogcare_field3": "5, 8",
                "dogcare_field4": True,
                "dogcare_field5": "No",
                "dogcare_field6": "Lo llevo conmigo",
                "dogcare_field7": "Sala, cocina, patio",
                "dogcare_field8": "No suele",
                "dogcare_field9": "Con familia",
            },
        }

        serializer = FormularioAdopcionSerializer(data=json_data)

        # 3. Probar que el serializador es válido
        assert serializer.is_valid(raise_exception=True)

        # 4. Probar la creación del objeto de dominio
        domain_object = serializer.save()
        assert isinstance(domain_object, FormularioAdopcion)

        # 5. Probar que los datos del animal se asignaron correctamente desde la BD
        assert domain_object.datos_del_animal.dog_name == dog.name
        assert domain_object.datos_del_animal.dog_age == dog.age_year
        assert domain_object.datos_del_animal.dog_size == dog.get_size_display()
        assert domain_object.datos_del_animal.dog_genre == dog.get_genre_display()

        # Probar que los otros datos también se asignaron
        assert domain_object.datos_del_solicitante.adpt_name == "Juan Pérez"

