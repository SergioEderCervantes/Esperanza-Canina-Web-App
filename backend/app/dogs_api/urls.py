from django.urls import path
from .views import DogListView, DogTopView

urlpatterns = [
    path('adopt/', DogListView.as_view(), name='dog-adopt-list'),
    
    path('top/', DogTopView.as_view(), name='dog-top-list'),
]