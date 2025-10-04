from rest_framework import serializers

from app.dogs_api.adoption_form_domain import (
    CuidadoYCalidadDeVida,
    DatosDelAnimal,
    DatosDelSolicitante,
    EspacioDondeVivira,
    FormularioAdopcion,
)
from app.dogs_api.models import Beheavior, Dog, DogImage


# TODO: Comentar que son todos los serializers
class DogTopSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = ["id", "name", "primary_image"]

    def get_primary_image(self, obj):
        return obj.primary_image()

class DogTopResponseSerializer(serializers.Serializer):
    data = DogTopSerializer(many=True)

class SimpleDogBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beheavior
        fields = ["id", "beheavior_name"]


class DogListSerializer(serializers.ModelSerializer):
    beheaviors = SimpleDogBehaviorSerializer(many=True, read_only=True)
    size_display = serializers.CharField(source="get_size_display", read_only=True)
    genre_display = serializers.CharField(source="get_genre_display", read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = [
            "id",
            "name",
            "size_display",
            "beheaviors",
            "dog_life_stage",
            "primary_image",
            "genre_display",
        ]

    def get_primary_image(self, obj):
        return obj.primary_image()


class DetailedDogBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beheavior
        fields = ["id", "beheavior_name", "beheavior_description"]


class DogImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogImage
        fields = ["id", "url"]


class DetailedDogSerializer(serializers.ModelSerializer):
    beheaviors = DetailedDogBehaviorSerializer(many=True, read_only=True)
    images = DogImagesSerializer(many=True, read_only=True)
    size_display = serializers.CharField(source="get_size_display", read_only=True)
    genre_display = serializers.CharField(source="get_genre_display", read_only=True)
    dog_life_stage = serializers.CharField(read_only=True)

    class Meta:
        model = Dog
        fields = [
            "id",
            "name",
            "size_display",
            "beheaviors",
            "dog_life_stage",
            "images",
            "genre_display",
            "description",
        ]

class DetailedDogResponseSerializer(serializers.Serializer):
    data = DetailedDogSerializer()


# Serializadores del objeto de dominio:
class DatosDelAnimalInputSerializer(serializers.Serializer):
    dog_id = serializers.IntegerField()


class DatosDelSolicitanteSerializer(serializers.Serializer):
    adpt_name = serializers.CharField()
    adpt_age = serializers.IntegerField()
    adpt_address = serializers.CharField()
    adpt_form_field1 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field2 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field3 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field4 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field5 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field6 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    adpt_form_field7 = serializers.BooleanField(required=False, allow_null=True)
    adopt_form_field8 = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class EspacioDondeViviraSerializer(serializers.Serializer):
    living_form_field1 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field3 = serializers.BooleanField(required=False, allow_null=True)
    living_form_field4 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field5 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field6 = serializers.BooleanField(required=False, allow_null=True)
    living_form_field7 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field8 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field9 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field10 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    living_form_field11 = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class CuidadoYCalidadDeVidaSerializer(serializers.Serializer):
    dogcare_field1 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field2 = serializers.BooleanField(required=False, allow_null=True)
    dogcare_field3 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field4 = serializers.BooleanField(required=False, allow_null=True)
    dogcare_field5 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field6 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field7 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field8 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    dogcare_field9 = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class FormularioAdopcionSerializer(serializers.Serializer):
    datos_del_animal = DatosDelAnimalInputSerializer()
    datos_del_solicitante = DatosDelSolicitanteSerializer()
    sobre_el_espacio = EspacioDondeViviraSerializer()
    sobre_el_cuidado = CuidadoYCalidadDeVidaSerializer()

    def create(self, validated_data):
        # --- Handle datos_del_animal ---
        animal_data = validated_data.pop("datos_del_animal")
        dog_id = animal_data["dog_id"]
        try:
            dog = Dog.objects.get(pk=dog_id)
            datos_del_animal_instance = DatosDelAnimal(
                dog_name=dog.name,
                dog_age=dog.age_year,
                dog_size=dog.get_size_display(),
                dog_genre=dog.get_genre_display(),
            )
        except Dog.DoesNotExist:
            raise serializers.ValidationError(
                {"datos_del_animal": {"dog_id": f"El perro con id={dog_id} no existe."}}
            )

        # --- Handle other parts ---
        datos_del_solicitante_instance = DatosDelSolicitante(
            **validated_data.pop("datos_del_solicitante")
        )
        sobre_el_espacio_instance = EspacioDondeVivira(
            **validated_data.pop("sobre_el_espacio")
        )
        sobre_el_cuidado_instance = CuidadoYCalidadDeVida(
            **validated_data.pop("sobre_el_cuidado")
        )

        return FormularioAdopcion(
            datos_del_animal=datos_del_animal_instance,
            datos_del_solicitante=datos_del_solicitante_instance,
            sobre_el_espacio=sobre_el_espacio_instance,
            sobre_el_cuidado=sobre_el_cuidado_instance,
        )
