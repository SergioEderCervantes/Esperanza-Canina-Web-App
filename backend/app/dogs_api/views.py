from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import (
    OpenApiParameter,
    OpenApiResponse,
    OpenApiTypes,
    extend_schema,
)
import time
from rest_framework import filters, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from app.dogs_api.filters import DogFilter
from app.dogs_api.models import Dog
from app.dogs_api.pagination import DogListNumPagination
from app.dogs_api.serializers import (
    DetailedDogResponseSerializer,
    DetailedDogSerializer,
    DogListSerializer,
    DogTopResponseSerializer,
    DogTopSerializer,
    FormularioAdopcionSerializer,
)
from app.dogs_api.services import AdoptionFormManager


@extend_schema(
    summary="Lista solo los primeros 3 perros, los que acaban de ser agregados",
    responses=DogTopResponseSerializer,
)
class DogTopView(generics.RetrieveAPIView):
    queryset = Dog.objects.order_by("-id")[:3]
    serializer_class = DogTopSerializer

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})


@extend_schema(
    summary="Lista todos los perros, con filtros y paginación",
    parameters=[
        OpenApiParameter(
            name="life_stage",
            description="Etapa de vida del perro",
            required=False,
            type=OpenApiTypes.STR,
            enum=["Cachorro", "Joven", "Adulto", "Adulto Mayor"],
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="size",
            description="Tamaño del perro",
            required=False,
            type=OpenApiTypes.STR,
            enum=["Chico", "Mediano", "Grande"],
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="genre",
            description="Género del perro",
            required=False,
            type=OpenApiTypes.STR,
            enum=["Macho", "Hembra"],
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="search",
            description="Un término de búsqueda.",
            required=False,
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="beheaviors",
            description="Comportamientos del perro.",
            required=False,
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
        ),
    ],
    responses=DogListSerializer(many=True),
)
class DogListView(generics.ListAPIView):
    queryset = Dog.objects.filter(adoption_state=False).order_by("-id")
    serializer_class = DogListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = DogFilter
    pagination_class = DogListNumPagination
    search_fields = ["name"]


@extend_schema(
    summary="Detalle de un perro por ID",
    responses=DetailedDogResponseSerializer,
)
class DogDetailView(generics.RetrieveAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DetailedDogSerializer
    lookup_field = "pk"

    # Override del retrieve para wrappear la informacion en data
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})


@extend_schema(
    summary="Adoptar un perro",
    description="Recibe el formulario de adopción para un perro.",
    request=FormularioAdopcionSerializer,
    responses={
        200: OpenApiResponse(description="Formulario recibido con éxito."),
        400: OpenApiResponse(description="Datos inválidos en el formulario."),
    },
)
class AdoptDogView(APIView):
    def post(self, request, *args, **kwargs):
        start = time.time()
        # Deserializar el json, confirmar que los campos obligatorios esten
        serializer = FormularioAdopcionSerializer(data=request.data)
        # Corroborar que el perrito exista en la base de datos
        if not serializer.is_valid():
            return Response(
                {"Message:": "Los datos recibidos no son validos"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        domain_object = serializer.save()

        AdoptionFormManager(domain_object).execute()
        end = time.time()
        print(f"Tiempo de ejecución: {end - start:.2f} segundos")
        return Response(
            {"message": "Formulario recibido con éxito."}, status=status.HTTP_200_OK
        )
