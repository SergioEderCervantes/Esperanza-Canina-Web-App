from rest_framework import serializers
from .models import Medical_record

class MedicalRecordSerializer(serializers.ModelSerializer):
    dog_name = serializers.CharField(source='dog.name', read_only=True)

    class Meta:
        model = Medical_record
        fields = '__all__'