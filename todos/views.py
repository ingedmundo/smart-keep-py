from django.shortcuts import render, get_object_or_404, get_list_or_404,render, HttpResponse, redirect
from .models import List, Item
import datetime

def index(request):
    if request.method == 'POST' and len(request.POST['description']):
        new_list = List(description = request.POST['description'])
        new_list.save()

    return render(request, 'todos/index.html', {'lists': List.objects.all})

def update(request, list_id):
    list = get_object_or_404(List, pk=list_id)

    if request.method == 'POST':
        for key, _ in request.POST.items():
            if key == 'csrfmiddlewaretoken' or key == 'new_item' or key == "delete": continue 

            item = list.item_set.get(pk=key)

            item.toggle_done()

        if 'new_item' in request.POST and len(request.POST['new_item']) > 0:
            if '$' in request.POST['new_item']:
                description = request.POST['new_item'].split('$')[0].strip()
                cost = request.POST['new_item'].split('$')[1]
            else:
                description = request.POST['new_item'].strip()
                cost = 1

            try:    
                existing_item = list.item_set.get(description = description) 
                if existing_item.done:
                    existing_item.toggle_done()

            except:
                list.item_set.create(description = description, cost = cost)
        
    pending_items = list.item_set.filter(done=False)
    done_items = list.item_set.filter(done=True)

    return  render(request, 'todos/update.html', {'list': list, 'pending_items': pending_items, 'done_items': done_items })

def delete_item(request, list_id, item_id):
    list = get_object_or_404(List, pk=list_id)
    list.item_set.get(pk=item_id).delete()

    return  redirect(update, list.id)

