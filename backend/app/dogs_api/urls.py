from django.urls import path
from .views import DogListView, DogTopView , DogDetailView

urlpatterns = [
    path('', DogListView.as_view(), name='dog-list'),
    path('<int:pk>/', DogDetailView.as_view(), name='dog-detail'),
]