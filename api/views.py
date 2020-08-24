from django.shortcuts import render
from todos.models import List
from .serializers import ListSerializer
from rest_framework import generics

class ListIndex(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
