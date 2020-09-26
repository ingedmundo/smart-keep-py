from django.urls import path
from . import views

urlpatterns = [
    path('lists/', views.list_list),
    path('lists/<int:pk>/', views.list_detail),
    path('lists/<int:pk>/items', views.list_items),
]