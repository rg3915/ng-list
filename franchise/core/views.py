from rest_framework import viewsets
from . import models, serializers


class CollectableViewSet(viewsets.ModelViewSet):
    queryset = models.Collectable.objects.all()
    serializer_class = serializers.CollectableSerializer


class CollectableFranchiseViewSet(viewsets.ModelViewSet):
    queryset = models.Franchise.objects.all()
    serializer_class = serializers.FranchiseSerializer
