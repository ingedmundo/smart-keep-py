from django.shortcuts import render
from todos.models import List

def index(request):
    if request.method == 'POST' and len(request.POST['description']):
        new_list = List(description = request.POST['description'])
        new_list.save()

    return render(request, 'frontend/index.html', {'lists': List.objects.all})

def show(request, list_id):
    return render(request, 'frontend/show.html', {'list_id': list_id})