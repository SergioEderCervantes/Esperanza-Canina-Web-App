import pytest
from rest_framework import status
from rest_framework.test import APIClient

from app.dogs_api.models import Dog
from app.dogs_api.serializers import (
    DetailedDogSerializer,
    DogTopSerializer,
)


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def dogs():
    dog1 = Dog.objects.create(name="Test Dog 1", adoption_state=False)
    Dog.objects.create(name="Test Dog 2", adoption_state=True)
    Dog.objects.create(name="Test Dog 3", adoption_state=False)
    Dog.objects.create(name="Test Dog 4", adoption_state=False)
    return dog1


# TODO: Checar si este test si pasa cuando se cambie la response de top a un objeto con la data wrappeado en la propiedad data
@pytest.mark.django_db
def test_dog_top_view(client):
    response = client.get("/api/perritos/top/")
    assert response.status_code == status.HTTP_200_OK
    print("Response data:", response.data)
    assert len(response.data) == 3

    expected_dogs = Dog.objects.order_by("-id")[:3]
    serialized_data = DogTopSerializer(expected_dogs, many=True).data
    assert response.data == serialized_data


@pytest.mark.django_db
def test_dog_list_view(client, dogs):
    response = client.get("/api/perritos/")
    assert response.status_code == status.HTTP_200_OK

    expected_dogs = Dog.objects.filter(adoption_state=False)
    assert response.data["count"] == expected_dogs.count()


@pytest.mark.django_db
def test_dog_list_view_search(client, dogs):
    response = client.get("/api/perritos/?search=Test Dog 1")
    assert response.status_code == status.HTTP_200_OK
    assert response.data["data"][0]["name"] == "Test Dog 1"


@pytest.mark.django_db
def test_dog_detail_view(client, dogs):
    dog1 = dogs
    response = client.get(f"/api/perritos/{dog1.pk}/")
    assert response.status_code == status.HTTP_200_OK

    expected_dog = Dog.objects.get(pk=dog1.pk)
    serialized_data = DetailedDogSerializer(expected_dog).data
    assert response.data == serialized_data


@pytest.mark.django_db
def test_dog_detail_view_not_found(client):
    response = client.get("/api/perritos/999/")
    assert response.status_code == status.HTTP_404_NOT_FOUND
