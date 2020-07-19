from django.shortcuts import render, get_object_or_404, get_list_or_404,render
from .models import List, Item

def index(request):
    lists = get_list_or_404(List)
    return render(request, 'todos/index.html', {'lists': lists})

def detail(request, list_id):
    list = get_object_or_404(List, pk=list_id)
    list_items = Item.objects.filter(list= list).order_by('done')
    return  render(request, 'todos/detail.html', {'list': list, 'list_items': list_items})

def update(request, list_id):
    list = get_object_or_404(List, pk=list_id)

    if request.method == 'POST':
        for key, value in request.POST.items():
            if key == 'csrfmiddlewaretoken' or key == 'new_item':
                continue 

            item = list.item_set.get(pk=key)

            item.toggleDone()
            item.save()

        if request.POST['new_item']:
            try:    
                list.item_set.get(description=request.POST['new_item']) 
            except:
                newItem = Item(list=list, description = request.POST['new_item'])
                newItem.save()

    pending_items = list.item_set.filter(done=False)
    done_items = list.item_set.filter(done=True)

    return  render(request, 'todos/update.html', {'list': list, 'pending_items': pending_items, 'done_items': done_items })
