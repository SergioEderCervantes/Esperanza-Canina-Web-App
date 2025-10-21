from rest_framework import generics
from .models import Medical_record
from .serializers import MedicalRecordSerializer
from app.dogs_api.pagination import DogListNumPagination

class MedicalRecordListCreateView(generics.ListCreateAPIView):
    queryset = Medical_record.objects.all()
    serializer_class = MedicalRecordSerializer

class MedicalRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medical_record.objects.all()
    serializer_class = MedicalRecordSerializer