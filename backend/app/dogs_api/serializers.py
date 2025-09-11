from rest_framework import serializers
from app.dogs_api.models import Dog, Dog_image , Beheavior

class DogTopSerializer(serializers.ModelSerializer): 
    class Meta:
        model: Dog
        fields = ['id', 'name', 'get_primary_image']


class BeheaviorSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beheavior
        fields = ['id', 'beheavior_name']

class DogListSerializer(serializers.ModelSerializer):
    beheaviors = BeheaviorSimpleSerializer(many=True, read_only=True)
    size_display = serializers.CharField(source='get_size_display', read_only=True)
    genre_display = serializers.CharField(source='get_genre_display', read_only=True)
    class Meta:
        model: Dog
        fields = ['id', 'name','size_display','beheaviors','get_dog_life_stage' 'get_primary_image','genre_display']

        