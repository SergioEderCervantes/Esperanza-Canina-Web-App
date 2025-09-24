# tests/test_serializers.py
import pytest

from app.dogs_api.models import Beheavior, Dog, DogImage
from app.dogs_api.serializers import (
    DetailedDogBehaviorSerializer,
    DetailedDogSerializer,
    DogListSerializer,
    DogTopSerializer,
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
