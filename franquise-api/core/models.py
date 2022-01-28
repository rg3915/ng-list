from django.db import models
 
class Franchise(models.Model):
    franchise = models.CharField(max_length=100) 
 

class ListFranchise(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.PROTECT, related_name="listfranchise")
    valuexquantity = models.CharField(max_length=300, blank=True, null=True)

