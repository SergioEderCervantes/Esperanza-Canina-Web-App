from rest_framework import generics

from .models import Medical_record
from .serializers import MedicalRecordSerializer


class MedicalRecordListCreateView(generics.ListCreateAPIView):
    queryset = Medical_record.objects.all()
    serializer_class = MedicalRecordSerializer

class MedicalRecordDetailView(generics.RetrieveAPIView):
    queryset = Medical_record.objects.all()
    serializer_class = MedicalRecordSerializer
