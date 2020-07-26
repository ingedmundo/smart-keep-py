from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:list_id>/items/', views.show, name='show'),
    path('<int:list_id>/items/<int:item_id>/toggle', views.toggle_item, name='toggle'),
    path('<int:list_id>/items/<int:item_id>/delete', views.delete_item, name='delete'),
    path('<int:list_id>/items/add', views.add_item, name='delete')
]