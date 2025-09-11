from rest_framework import serializers
from app.dogs_api.models import Dog, DogImage , Beheavior


# TODO: Comentar que son todos los serializers
class DogTopSerializer(serializers.ModelSerializer): 
    primary_image = serializers.SerializerMethodField()
    class Meta:
        model = Dog
        fields = ['id', 'name', 'primary_image']
        
    def get_primary_image(self, obj):
        return obj.primary_image()


class SimpleDogBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beheavior
        fields = ['id', 'beheavior_name']

class DogListSerializer(serializers.ModelSerializer):
    beheaviors = SimpleDogBehaviorSerializer(many=True, read_only=True)
    size_display = serializers.CharField(source='get_size_display', read_only=True)
    genre_display = serializers.CharField(source='get_genre_display', read_only=True)
    primary_image = serializers.SerializerMethodField()
    class Meta:
        model = Dog
        fields = ['id', 'name','size_display','beheaviors','dog_life_stage', 'primary_image','genre_display']
        
    def get_primary_image(self, obj):
        return obj.primary_image()
        

class DetailedDogBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beheavior
        fields = ['id', 'beheavior_name', 'beheavior_description']
        
class DogImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogImage
        fields = ['id', 'url']


class DetailedDogSerializer(serializers.ModelSerializer):
    beheaviors = DetailedDogBehaviorSerializer(many=True, read_only=True)
    images = DogImagesSerializer(many = True, read_only= True)
    size_display = serializers.CharField(source='get_size_display', read_only=True)
    genre_display = serializers.CharField(source='get_genre_display', read_only=True)
    class Meta:
        model = Dog
        fields = ['id', 'name', 'size_display', 'beheaviors', 'dog_life_stage', 'images', 'genre_display', 'description']