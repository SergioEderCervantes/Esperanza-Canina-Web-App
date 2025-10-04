from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import (
    OpenApiParameter,
    OpenApiResponse,
    OpenApiTypes,
    extend_schema,
)
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
)


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

    # Override del retrieve para wrappear la informacion en data
    def retrieve(self, request, *args, **kwargs):
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({"data": serializer.data})


@extend_schema(
    summary="Adoptar un perro",
    description="Permite adoptar un perro mediante lógica personalizada.",
    request={
        "application/json": {
            "type": "object",
            "properties": {
                "dog_id": {"type": "integer", "description": "ID del perro a adoptar"},
                "adopter_name": {"type": "string", "description": "Nombre del adoptante"},
            },
            "required": ["dog_id", "adopter_name"],
        }
    },
    responses={
        200: OpenApiResponse(description="Adopción exitosa"),
        400: OpenApiResponse(description="Error en la adopción"),
    },
)
class AdoptDogView(APIView):
    def post(self, request, *args, **kwargs):
        dog_id = request.data.get("dog_id")
        adopter_name = request.data.get("adopter_name")
        if not dog_id or not adopter_name:
            return Response({"error": "dog_id y adopter_name son requeridos."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": f"El perro {dog_id} ha sido adoptado por {adopter_name}."}, status=status.HTTP_200_OK)
