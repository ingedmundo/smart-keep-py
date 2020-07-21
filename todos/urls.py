from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:list_id>/items/update', views.update, name='update'),
    path('<int:list_id>/items/<int:item_id>/delete', views.delete_item, name='delete')
]