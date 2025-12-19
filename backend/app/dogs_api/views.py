from django_filters.rest_framework import DjangoFilterBackend
from django_q.tasks import async_task
from drf_spectacular.utils import (
    OpenApiParameter,
    OpenApiResponse,
    OpenApiTypes,
    extend_schema,
)
from prometheus_client import Counter
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

VISIT_COUNTER = Counter(
    "django_custom_visits_total",
    "Número total de visitas al endpoint de prueba personalizado."
)

class TestMetricView(APIView):
    def get(self, request):
        VISIT_COUNTER.inc()
        return Response({"message": "Visita registrada en Prometheus"})


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
        OpenApiParameter(
            name="section",
            description="Sección del perro (1 a 5).",
            required=False,
            type=OpenApiTypes.STR,
            enum=["Sección 1", "Sección 2", "Sección 3", "Sección 4", "Sección 5"],
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
    queryset = Dog.objects.filter(adoption_state=False).prefetch_related('beheaviors', 'images')
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
        print(request.data)
        serializer = FormularioAdopcionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"message": "Los datos recibidos no son válidos."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # La validación inicial es suficiente, el resto del procesamiento
        # se hace en segundo plano para responder rápidamente al usuario.
        async_task(
            "app.dogs_api.tasks.process_adoption_form",
            request.data,
        )

        return Response(
            {"message": "Formulario recibido con éxito."}, status=status.HTTP_200_OK
        )
