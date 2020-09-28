from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from todos.models import List
from api.serializers import ListSerializer, ItemSerializer

@csrf_exempt
def list_list(request):
    if request.method == 'GET':
        lists = List.objects.all()
        serializer = ListSerializer(lists, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request) 
        serializer = ListSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def list_detail(request, pk):
    try:
        list = List.objects.get(pk=pk)
    except List.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        serializer = ListSerializer(list)
        return JsonResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ListSerializer(list, data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        list.detele()
        return HttpResponse(status=204)

@csrf_exempt
def list_items(request, pk):
    try: 
        list = List.objects.get(pk=pk)
    except List.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        ordered_items = list.item_set.all().order_by('description')
        serializer = ItemSerializer(ordered_items, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)

        if '$' in data['newItemDescription']:
            description = data['newItemDescription'].split('$')[0].strip()
            cost = data['newItemDescription'].split('$')[1]
        else:
            description = data['newItemDescription'].strip()
            cost = 1

        try:    
            existing_item = list.item_set.get(description = description) 
            if existing_item.done:
                existing_item.toggle_done()

        except:
            list.item_set.create(description = description, cost = cost)

        serializer = ItemSerializer(list.item_set.all(), many=True)
        return JsonResponse(serializer.data, safe=False)
        
@csrf_exempt
def list_item_toggle(request, list_id, item_id):
    try:
        list = List.objects.get(pk=list_id)
    except List.DoesNotExist:
        return HttpResponse(status=404)

    item = list.item_set.get(pk=item_id)
    item.toggle_done()

    return JsonResponse({'success': True})