from rest_framework import serializers
from .models import Franchise, Collectable


class FranchiseSerializer(serializers.ModelSerializer):
    '''
    Franchise
    '''

    class Meta:
        model = Franchise
        fields = '__all__'
        read_only_fields = ('id',)


class CollectableSerializer(serializers.ModelSerializer):
    '''
    Coleção Completa
    '''
    franchise = FranchiseSerializer(many=True, required=False)

    class Meta:
        model = Collectable
        fields = ('id', 'name', 'type', 'franchise')
