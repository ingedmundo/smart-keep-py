from rest_framework import serializers

from todos.models import List, Item

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'description']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['description', 'done', 'active', 'cost']