from django.shortcuts import render, get_object_or_404, get_list_or_404,render, HttpResponse, redirect
from django.http import JsonResponse
from .models import List, Item
import datetime
import json

def index(request):
    if request.method == 'POST' and len(request.POST['description']):
        new_list = List(description = request.POST['description'])
        new_list.save()

    return render(request, 'todos/index.html', {'lists': List.objects.all})

def show(request, list_id):
    list = get_object_or_404(List, pk=list_id)

    pending_items = list.item_set.filter(active=True, done=False)
    done_items = list.item_set.filter(active=True, done=True)

    return  render(request, 'todos/update.html', {'list': list, 'pending_items': pending_items, 'done_items': done_items })

def delete_item(request, list_id, item_id):
    list = get_object_or_404(List, pk=list_id)
    current_item = list.item_set.get(pk=item_id)
    current_item.active = False
    current_item.done = True
    current_item.save()

    return  redirect(show, list.id)

def toggle_item(request, list_id, item_id):
    list = get_object_or_404(List, pk=list_id)
    item = list.item_set.get(pk=item_id)

    item.toggle_done()

    return JsonResponse({'success': True})

def add_item(request, list_id):
    list = get_object_or_404(List, pk=list_id)
    json_data = json.loads(request.body)

    if len(json_data['new_item']) > 0:
        if '$' in json_data['new_item']:
            description = json_data['new_item'].split('$')[0].strip()
            cost = json_data['new_item'].split('$')[1]
        else:
            description = json_data['new_item'].strip()
            cost = 1

        try:    
            existing_item = list.item_set.get(description = description) 
            if existing_item.done:
                existing_item.toggle_done()

        except:
            list.item_set.create(description = description, cost = cost)

    return JsonResponse({'test': json_data['new_item']})