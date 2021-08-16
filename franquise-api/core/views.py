from .serializers import ListFranchiseSerializer, FranchiseSerializer
from core.models import Franchise, ListFranchise 
from rest_framework import viewsets   

class FranchiseViewSet(viewsets.ModelViewSet): 
    queryset = Franchise.objects.all() 
    serializer_class = FranchiseSerializer 
     
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request):
        return self.delete(request)

class ListFranchiseViewSet(viewsets.ModelViewSet): 
    queryset = ListFranchise.objects.all() 
    serializer_class = ListFranchiseSerializer 
     
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request):
        return self.delete(request)

