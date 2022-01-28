from .models import Franchise, ListFranchise
from rest_framework import serializers

class ListFranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListFranchise
        fields = ['id', 'franchise', 'valuexquantity']

class FranchiseSerializer(serializers.ModelSerializer):
    listfranchise = ListFranchiseSerializer(many=True, read_only=True)

    class Meta:
        model = Franchise
        fields = ['id', 'franchise', 'listfranchise']



