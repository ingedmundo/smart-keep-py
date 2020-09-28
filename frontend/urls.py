from django.urls import path
from . import views

urlpatterns = [
    path('', views.index ),
    path('<int:list_id>', views.show, name='show' ),
]
