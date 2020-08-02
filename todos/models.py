from django.db import models
from django.db.models import *
import datetime

class List(models.Model):
    description = models.CharField(max_length=200)

    def __str__(self):
        return  self.description
    
    def budget(self):
        budget = 0
        for item in self.item_set.filter(done=False):
            budget += item.cost 

        return budget


class Item(models.Model):
    description = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
    cost = models.DecimalField( max_digits=5, decimal_places=2, default=1.0)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return  f"[{'DONE' if self.done else 'PENDING'}] {self.description} - delta: {self.delta()}"
    
    def toggle_done(self):
        self.done = not self.done

        if self.done:
            try:
                last_histoy = self.itemhistory_set.all().last()
                delta = datetime.date.today() - last_histoy.date
                delta = delta.days
            except:
                delta = 0

            if not last_histoy or (last_histoy and delta > 1):
                self.itemhistory_set.create(delta=delta)

        self.save()

    def delta(self):
       delta_avg = self.itemhistory_set.filter(delta__gt=0).aggregate(Avg('delta')) 
       return delta_avg['delta__avg']
    
    def delta_days(self):
        last_histoy = self.itemhistory_set.all().last()
        return (datetime.date.today() - last_histoy.date).days
    
    def is_to_be_bought(self):
        try:
            return self.delta_days() > self.delta()
        except:
            return False

class ItemHistory(models.Model):
    date = models.DateField(auto_now_add=True)
    delta = models.IntegerField()
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return f"[{self.item.description}] on {self.date}"
