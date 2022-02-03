from django.shortcuts import render
from rest_framework import viewsets
from . import models, serializers 


# router.register(r'collectable', stamps_views.CollectableViewSet)
class CollectableViewSet(viewsets.ModelViewSet):
        queryset = models.Collectable.objects.all()
        serializer_class = serializers.CollectableSerializer

    
# router.register(r'collectable-franchise', stamps_views.CollectableFranchiseViewSet)
class CollectableFranchiseViewSet(viewsets.ModelViewSet):    
        queryset = models.Franchise.objects.all()
        serializer_class = serializers.FranchiseSerializer 
    

