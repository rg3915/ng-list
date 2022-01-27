from .serializers import ListFranchiseSerializer, FranchiseSerializer
from core.models import Franchise, ListFranchise 
from rest_framework import viewsets   

class FranchiseViewSet(viewsets.ModelViewSet): 
    queryset = Franchise.objects.all() 
    serializer_class = FranchiseSerializer  
    
class ListFranchiseViewSet(viewsets.ModelViewSet): 
    queryset = ListFranchise.objects.all() 
    serializer_class = ListFranchiseSerializer 
    

