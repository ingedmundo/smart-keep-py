from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from todos.models import List
from api.serializers import ListSerializer

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

