from django.shortcuts import render, get_object_or_404, get_list_or_404,render, HttpResponse, redirect
from .models import List, Item

def index(request):
    lists = get_list_or_404(List)
    return render(request, 'todos/index.html', {'lists': lists})

def detail(request, list_id):
    list = get_object_or_404(List, pk=list_id)
    list_items = Item.objects.filter(list=list).order_by('done')
    return  render(request, 'todos/detail.html', {'list': list, 'list_items': list_items})

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
                list.item_set.get(description = request.POST['new_item']) 
            except:
               list.item_set.create(description = request.POST['new_item'])
        

    pending_items = list.item_set.filter(done=False)
    done_items = list.item_set.filter(done=True)

    return  render(request, 'todos/update.html', {'list': list, 'pending_items': pending_items, 'done_items': done_items })

def delete_item(request, list_id, item_id):
    list = get_object_or_404(List, pk=list_id)
    list.item_set.get(pk=item_id).delete()

    return  redirect(update, list.id)

