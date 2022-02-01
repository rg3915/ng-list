from django.db import models

class Franchise(models.Model):
        franchise = models.CharField(max_length=100, blank=True, null=True)
     
     
        class Meta:
                verbose_name = 'Franchise'
                verbose_name_plural = 'Franchises'
                ordering = ['id']


        def __str__(self):
                return "{}".format(self.franchise)


class ListFranchise(models.Model):
        franchise = models.ForeignKey(Franchise, on_delete=models.PROTECT, related_name="listfranchise")
        value = models.IntegerField()
        quantity = models.IntegerField()


        class Meta:
                verbose_name = 'ListFranchise'
                verbose_name_plural = 'ListFranchises'
                ordering = ['id']


        def __str__(self):
                return "{}".format(self.franchise)