from django.shortcuts import render, get_object_or_404, get_list_or_404,render, HttpResponse, redirect
from .models import List, Item

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

            item.toggleDone()
            item.save()

        if 'new_item' in request.POST and len(request.POST['new_item']) > 0:
            try:    
                existing_item = list.item_set.get(description = request.POST['new_item']) 
                if existing_item.done:
                    existing_item.toggleDone()
                    existing_item.save()

            except:
               list.item_set.create(description = request.POST['new_item'])
        

    pending_items = list.item_set.filter(done=False)
    done_items = list.item_set.filter(done=True)

    return  render(request, 'todos/update.html', {'list': list, 'pending_items': pending_items, 'done_items': done_items })

def delete_item(request, list_id, item_id):
    list = get_object_or_404(List, pk=list_id)
    list.item_set.get(pk=item_id).delete()

    return  redirect(update, list.id)

