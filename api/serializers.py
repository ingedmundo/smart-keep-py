from rest_framework import serializers

from todos.models import List

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'description']