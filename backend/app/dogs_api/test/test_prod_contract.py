# Contrato de lo que produccion expone hoy (frontend, admin y servicios internos).
# Sirve para validar actualizaciones de dependencias: si algo de aqui cambia,
# el sitio en produccion cambia.
import shutil
import zipfile
from unittest import mock

import pytest
from rest_framework import status
from rest_framework.test import APIClient

from app.dogs_api.models import Beheavior, Dog, DogImage
from app.dogs_api.serializers import FormularioAdopcionSerializer
from app.dogs_api.services import AdoptionFormManager
from app.vet_api.models import Medical_record

LIST_KEYS = {"count", "total_pages", "current_page", "next", "previous", "data"}
LIST_ITEM_KEYS = {
    "id",
    "name",
    "size_display",
    "beheaviors",
    "life_stage_display",
    "primary_image",
    "genre_display",
    "section_display",
}
DETAIL_KEYS = {
    "id",
    "name",
    "size_display",
    "beheaviors",
    "life_stage_display",
    "images",
    "genre_display",
    "description",
    "section_display",
}


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def dog():
    behavior = Beheavior.objects.create(
        beheavior_name="Jugueton", beheavior_description="Le gusta jugar", color="#FF0000"
    )
    dog = Dog.objects.create(
        name="Firulais",
        life_stage="ADULTO",
        genre="M",
        size="M",
        section="2",
        description="Muy bueno",
    )
    dog.beheaviors.add(behavior)
    DogImage.objects.create(dog=dog, image="sample_public_id", is_primary=True)
    Dog.objects.create(name="Adoptado", life_stage="JOVEN", genre="H", size="S", adoption_state=True)
    return dog


def adoption_payload(dog_id):
    return {
        "datos_del_animal": {"dog_id": dog_id},
        "datos_del_solicitante": {
            "adpt_name": "Juan Perez",
            "adpt_age": 30,
            "adpt_address": "Calle Falsa 123",
            "adpt_form_field2": "5551234567",
            "adpt_form_field5": "juan@example.com",
            "adpt_form_field7": True,
        },
        "sobre_el_espacio": {"living_form_field3": False, "living_form_field10": "Propia"},
        "sobre_el_cuidado": {"dogcare_field2": False, "dogcare_field9": "Con familia"},
    }


# ---------------------------------------------------------------------------
# API publica que consume el frontend
# ---------------------------------------------------------------------------


@pytest.mark.django_db
def test_list_contract(client, dog):
    response = client.get("/perritos/")
    assert response.status_code == status.HTTP_200_OK
    assert set(response.data) == LIST_KEYS
    assert response.data["count"] == 1
    item = response.data["data"][0]
    assert set(item) == LIST_ITEM_KEYS
    assert item["name"] == "Firulais"
    assert item["size_display"] == "Mediano"
    assert item["genre_display"] == "Macho"
    assert item["life_stage_display"] == "Adulto"
    assert item["section_display"] == "2"
    assert item["beheaviors"] == [
        {"id": dog.beheaviors.first().id, "beheavior_name": "Jugueton", "color": "#FF0000"}
    ]
    assert "res.cloudinary.com" in item["primary_image"]
    assert item["primary_image"].endswith("sample_public_id")


@pytest.mark.django_db
def test_list_filters_and_search(client, dog):
    assert client.get("/perritos/?search=Firu").data["count"] == 1
    assert client.get("/perritos/?search=nadie").data["count"] == 0
    assert client.get("/perritos/?genre=Macho").data["count"] == 1
    assert client.get("/perritos/?genre=Hembra").data["count"] == 0
    assert client.get("/perritos/?size=Mediano").data["count"] == 1
    assert client.get("/perritos/?page=1").status_code == status.HTTP_200_OK
    assert client.get("/perritos/?page=99").status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_detail_contract(client, dog):
    response = client.get(f"/perritos/{dog.pk}/")
    assert response.status_code == status.HTTP_200_OK
    assert set(response.data) == {"data"}
    data = response.data["data"]
    assert set(data) == DETAIL_KEYS
    assert data["description"] == "Muy bueno"
    assert len(data["images"]) == 1
    assert set(data["images"][0]) == {"id", "url"}
    assert set(data["beheaviors"][0]) == {"id", "beheavior_name", "beheavior_description", "color"}


@pytest.mark.django_db
def test_detail_hides_adopted_and_missing(client, dog):
    adopted = Dog.objects.get(name="Adoptado")
    assert client.get(f"/perritos/{adopted.pk}/").status_code == status.HTTP_404_NOT_FOUND
    assert client.get("/perritos/999999/").status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
def test_top_contract(client, dog):
    response = client.get("/perritos/top/")
    assert response.status_code == status.HTTP_200_OK
    assert set(response.data) == {"data"}
    assert len(response.data["data"]) == 2
    assert all(set(d) == {"id", "name", "primary_image"} for d in response.data["data"])


@pytest.mark.django_db
def test_adopt_accepts_valid_form(client, dog):
    payload = adoption_payload(dog.pk)
    with mock.patch("app.dogs_api.views.async_task") as task:
        response = client.post("/perritos/adopt/", payload, format="json")
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"message": "Formulario recibido con éxito."}
    task.assert_called_once()
    assert task.call_args.args[0] == "app.dogs_api.tasks.process_adoption_form"


@pytest.mark.django_db
def test_adopt_rejects_invalid_form(client, dog):
    with mock.patch("app.dogs_api.views.async_task") as task:
        response = client.post("/perritos/adopt/", {"datos_del_animal": {}}, format="json")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"message": "Los datos recibidos no son válidos."}
    task.assert_not_called()


@pytest.mark.django_db
def test_adopt_only_accepts_post(client):
    assert client.get("/perritos/adopt/").status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@pytest.mark.django_db
def test_health(client):
    response = client.get("/health/")
    assert response.status_code == status.HTTP_200_OK
    assert response.content == b"Healthy"


@pytest.mark.django_db
def test_metrics_endpoint(client):
    response = client.get("/metrics")
    assert response.status_code == status.HTTP_200_OK
    assert b"django_http_requests" in response.content


@pytest.mark.django_db
def test_openapi_schema_generates(client):
    response = client.get("/schema/")
    assert response.status_code == status.HTTP_200_OK
    assert b"/perritos/adopt/" in response.content


# ---------------------------------------------------------------------------
# Panel de administracion (Unfold)
# ---------------------------------------------------------------------------


@pytest.mark.django_db
def test_admin_login_page(client):
    assert client.get("/admin/login/").status_code == status.HTTP_200_OK


@pytest.mark.django_db
@pytest.mark.parametrize(
    "url",
    [
        "/admin/",
        "/admin/dogs_api/dog/",
        "/admin/dogs_api/dog/add/",
        "/admin/dogs_api/dog/?q=mediano",
        "/admin/dogs_api/dog/?adoption_state=adopted",
        "/admin/dogs_api/beheavior/",
        "/admin/vet_api/medical_record/",
        "/admin/vet_api/medical_record/add/",
    ],
)
def test_admin_pages_render(admin_client, dog, url):
    assert admin_client.get(url).status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_admin_dog_change_page(admin_client, dog):
    Medical_record.objects.create(dog=dog)
    assert admin_client.get(f"/admin/dogs_api/dog/{dog.pk}/change/").status_code == status.HTTP_200_OK
    record_url = f"/admin/vet_api/medical_record/{dog.pk}/change/"
    assert admin_client.get(record_url).status_code == status.HTTP_200_OK


# ---------------------------------------------------------------------------
# Proceso en segundo plano del formulario de adopcion
# ---------------------------------------------------------------------------


def build_manager(dog):
    serializer = FormularioAdopcionSerializer(data=adoption_payload(dog.pk))
    serializer.is_valid(raise_exception=True)
    return AdoptionFormManager(serializer.save())


@pytest.mark.django_db
def test_fill_docx_replaces_placeholders(dog):
    manager = build_manager(dog)
    try:
        manager.fill_docx()
        with zipfile.ZipFile(manager.filled_docx_path) as docx:
            xml = docx.read("word/document.xml").decode("utf-8")
        assert "Juan Perez" in xml
        assert "{{adpt_name}}" not in xml
    finally:
        manager.cleanup()
    assert not manager.filled_docx_path.exists()


@pytest.mark.django_db
def test_concurrent_forms_do_not_share_files(dog):
    first, second = build_manager(dog), build_manager(dog)
    try:
        assert first.filled_pdf_path != second.filled_pdf_path
        assert first.filled_pdf_path.name == second.filled_pdf_path.name == "formulario_adopcion_firulais.pdf"
    finally:
        first.cleanup()
        second.cleanup()


@pytest.mark.django_db
@pytest.mark.skipif(shutil.which("libreoffice") is None, reason="LibreOffice no instalado")
def test_full_pipeline_sends_pdf(dog, settings, mailoutbox):
    settings.DEFAULT_FROM_EMAIL = "refugio@example.com"
    settings.DESTINATARY_EMAIL = ["destino@example.com"]
    manager = build_manager(dog)
    manager.execute()

    assert len(mailoutbox) == 1
    email = mailoutbox[0]
    assert email.to == ["destino@example.com"]
    assert "Firulais" in email.body
    name, content, mimetype = email.attachments[0]
    assert name == "formulario_adopcion_firulais.pdf"
    assert content.startswith(b"%PDF")
    assert not manager.filled_pdf_path.exists()
