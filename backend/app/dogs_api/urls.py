from django.urls import path

from .views import DogDetailView, DogListView, DogTopView

urlpatterns = [
    path("", DogListView.as_view(), name="dog-list"),
    path("<int:pk>/", DogDetailView.as_view(), name="dog-detail"),
    path("top/", DogTopView.as_view(), name="dog-top-list"),
]
