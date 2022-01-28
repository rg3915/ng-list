from django.db import models
 
class Franchise(models.Model):
    franchise = models.CharField(max_length=100) 
 

class ListFranchise(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.PROTECT, related_name="listfranchise")
    value = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
