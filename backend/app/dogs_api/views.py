from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes, extend_schema
from rest_framework import filters, generics
from rest_framework.response import Response

from app.dogs_api.filters import DogFilter
from app.dogs_api.models import Dog
from app.dogs_api.pagination import DogListNumPagination
from app.dogs_api.serializers import (
    DetailedDogResponseSerializer,
    DetailedDogSerializer,
    DogListSerializer,
    DogTopResponseSerializer,
    DogTopSerializer,
)


@extend_schema(
    summary="Lista solo los primeros 3 perros, los que acaban de ser agregados",
    responses=DogTopResponseSerializer,
)
class DogTopView(generics.ListAPIView):
    queryset = Dog.objects.order_by("-id")[:3]
    serializer_class = DogTopSerializer

    def list(self, request, *args, **kwargs):
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
            location=OpenApiParameter.QUERY
        ),
    ],
    responses=DogListSerializer(many=True),
)
class DogListView(generics.ListAPIView):
    queryset = Dog.objects.filter(adoption_state=False).order_by('-id')
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

def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})
