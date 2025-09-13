from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from app.dogs_api.models import Dog
from app.dogs_api.serializers import DogListSerializer, DogTopSerializer, DetailedDogSerializer
from app.dogs_api.filters import DogFilter
from app.dogs_api.pagination import DogListNumPagination

class DogTopView(generics.ListAPIView):
    queryset = Dog.objects.order_by('-arrive_date')[:3]
    serializer_class = DogTopSerializer
    
class DogListView(generics.ListAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DogListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = DogFilter
    pagination_class = DogListNumPagination
    search_fields = ["name"]


class DogDetailView(generics.RetrieveAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DetailedDogSerializer
    lookup_field = 'pk'