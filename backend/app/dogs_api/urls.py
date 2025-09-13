from django.urls import path
from .views import DogListView, DogTopView

urlpatterns = [
    path('dogs/', DogListView.as_view(), name='dog-list'),
    
    path('top/', DogTopView.as_view(), name='dog-top-list'),
]