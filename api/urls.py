from django.urls import path
from . import views

urlpatterns = [
    path('lists', views.ListIndex.as_view())
]