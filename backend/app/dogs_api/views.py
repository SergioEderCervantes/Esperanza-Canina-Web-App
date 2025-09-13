from django.shortcuts import render
from rest_framework import generics
from app.dogs_api.models import Dog
from .serializers import DogListSerializer, DogTopSerializer, DetailedDogSerializer

class DogListView(generics.ListAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DogListSerializer

class DogTopView(generics.ListAPIView):
    queryset = Dog.objects.order_by('-arrive_date')[:3]
    serializer_class = DogTopSerializer


class DogDetailView(generics.RetrieveAPIView):
    queryset = Dog.objects.filter(adoption_state=False)
    serializer_class = DetailedDogSerializer
    lookup_field = 'pk'