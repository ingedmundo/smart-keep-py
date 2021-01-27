from django.urls import path
from . import views

urlpatterns = [
    path('lists/', views.list_list),
    path('lists/<int:pk>/', views.list_detail),
    path('lists/<int:pk>/items', views.list_items),
    path('lists/<int:list_id>/items/<int:item_id>/toggle', views.list_item_toggle),
    path('lists/<int:list_id>/items/<int:item_id>/hide', views.list_item_hide)
]