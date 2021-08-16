from .models import Franchise, ListFranchise
from rest_framework import serializers

class ListFranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListFranchise
        fields = ['id', 'franchise', 'value', 'quantity']

class FranchiseSerializer(serializers.ModelSerializer):
    listfranchise = ListFranchiseSerializer(many=True, read_only=True)

    class Meta:
        model = Franchise
        fields = ['id', 'franchise', 'listfranchise']



