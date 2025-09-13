from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from app.dogs_api.models import Dog
from app.dogs_api.serializers import DogListSerializer, DogTopSerializer, DetailedDogSerializer
from app.dogs_api.filters import DogFilter
from app.dogs_api.pagination import DogListNumPagination
from drf_spectacular.utils import extend_schema, OpenApiParameter,  OpenApiTypes

@extend_schema(
    summary="Lista solo los primeros 3 perros, los que acaban de ser agregados",
    responses=DogTopSerializer(many=True)
)
class DogTopView(generics.ListAPIView):
    queryset = Dog.objects.order_by('-arrive_date')[:3]
    serializer_class = DogTopSerializer


@extend_schema(
    summary="Lista todos los perros, con filtros y paginacion",
    responses=DogListSerializer(many=True),
   
)
class DogListView(generics.ListAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DogListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = DogFilter
    pagination_class = DogListNumPagination
    search_fields = ["name"]

@extend_schema(
    summary="Detalle de un perro por ID",
    responses=DetailedDogSerializer
)
class DogDetailView(generics.RetrieveAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DetailedDogSerializer
    lookup_field = 'pk'