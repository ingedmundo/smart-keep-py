from django.contrib import admin


from .models import List, Item, ItemHistory 

admin.site.register(List)
admin.site.register(Item)
admin.site.register(ItemHistory)