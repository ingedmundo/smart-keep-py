from rest_framework import serializers

from todos.models import List, Item

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'description']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'description', 'done', 'active', 'cost', 'delta_info', 'is_to_be_bought']