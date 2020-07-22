from django.db import models

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
        return  f"[{'DONE' if self.done else 'PENDING'}] {self.description} on {self.list}"
    
    def toggleDone(self):
        self.done = not self.done

    
