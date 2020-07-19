from django.db import models

class List(models.Model):
    description = models.CharField(max_length=200)

    def __str__(self):
        return  self.description

class Item(models.Model):
    description = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return  f"[{'DONE' if self.done else 'PENDING'}] {self.description} on {self.list}"
