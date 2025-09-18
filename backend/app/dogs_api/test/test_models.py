# tests/test_models.py

import pytest

from app.dogs_api.models import Beheavior, Dog, DogImage


@pytest.mark.django_db
class TestDogModel:
    def test_str_returns_name(self):
        dog = Dog.objects.create(
            name="Firulais",
            age_year=1,
            age_month=3,
            genre="H",
            adoption_state=False,
            size="M",
        )
        assert str(dog) == "Firulais"

    def test_dog_life_stage_cachorro(self):
        dog = Dog.objects.create(
            name="Boby",
            age_year=0,
            age_month=4,
            genre="M",
            adoption_state=False,
            size="S",
        )
        assert dog.dog_life_stage() == "Cachorro"

    def test_dog_life_stage_joven(self):
        dog = Dog.objects.create(
            name="Rocky",
            age_year=1,
            age_month=6,
            genre="H",
            adoption_state=False,
            size="M",
        )
        assert dog.dog_life_stage() == "Joven"

    def test_dog_life_stage_adulto(self):
        dog = Dog.objects.create(
            name="Luna",
            age_year=3,
            age_month=0,
            genre="M",
            adoption_state=False,
            size="L",
        )
        assert dog.dog_life_stage() == "Adulto"

    def test_dog_life_stage_adulto_mayor(self):
        dog = Dog.objects.create(
            name="Sultan",
            age_year=9,
            age_month=0,
            genre="H",
            adoption_state=True,
            size="L",
        )
        assert dog.dog_life_stage() == "Adulto Mayor"

    def test_primary_image_with_primary(self):
        dog = Dog.objects.create(
            name="Kira",
            age_year=2,
            age_month=0,
            genre="M",
            adoption_state=False,
            size="M",
        )
        image = DogImage.objects.create(
            dog=dog, is_primary=True, image="https://placehold"
        )
        assert dog.primary_image() == image.image

    def test_primary_image_with_first(self):
        dog = Dog.objects.create(
            name="Max",
            age_year=2,
            age_month=0,
            genre="H",
            adoption_state=False,
            size="S",
        )
        image = DogImage.objects.create(
            dog=dog, is_primary=False, image="https://placehold"
        )
        assert dog.primary_image() == image.image

    def test_primary_image_none(self):
        dog = Dog.objects.create(
            name="Toby",
            age_year=2,
            age_month=0,
            genre="H",
            adoption_state=False,
            size="M",
        )
        assert dog.primary_image() is None

    def test_many_to_many_behavior(self):
        dog = Dog.objects.create(
            name="Chispa",
            age_year=1,
            age_month=0,
            genre="M",
            adoption_state=False,
            size="S",
        )
        behavior = Beheavior.objects.create(
            beheavior_name="Juguetón", beheavior_description="Le gusta correr y jugar"
        )
        dog.beheaviors.add(behavior)
        assert behavior in dog.beheaviors.all()


@pytest.mark.django_db
class TestDogImageModel:
    def test_str_returns_dog_name(self):
        dog = Dog.objects.create(
            name="Rex",
            age_year=2,
            age_month=0,
            genre="H",
            adoption_state=False,
            size="L",
        )
        img = DogImage.objects.create(
            dog=dog, is_primary=True, image="http://test.com/img3.jpg"
        )
        assert str(img) == "Imagen de Rex"


@pytest.mark.django_db
class TestBehaviorModel:
    def test_str_returns_name(self):
        behavior = Beheavior.objects.create(
            beheavior_name="Tranquilo",
            beheavior_description="Es calmado y no ladra mucho",
        )
        assert str(behavior) == "Tranquilo"
