from django.db.models import fields
from rest_framework import serializers
from .models import Franchise, Collectable


# Franchise
class FranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franchise
        fields = '__all__'
        read_only_fields = ('id',)


# Coleção Completa
class CollectableSerializer(serializers.ModelSerializer):
    franchise = FranchiseSerializer(many=True, required=False)

    class Meta:
        model = Collectable
        fields = ('id', 'name', 'type', 'franchise')

    def create(self, validated_data):
        """
        Criar um colecionavel e seus elementos nested.
        """
        franchise = None

        if 'id' in validated_data:
            del validated_data['id']

        if 'franchise' in validated_data:
            franchise = validated_data.pop('franchise')

        instance = super().create(validated_data)

        if franchise:  # Franchise
            for list in franchise:
                list['collectable'] = instance
                list = FranchiseSerializer().create(list)
        return instance

    def update(self, instance, validated_data):
        """
        Criar um colecionavel e seus elementos nested.
        """
        print("collection:", instance)
        print("Dados que vem do frontend:", validated_data)

        franchise = None

        if 'franchise' in validated_data:
            franchise = validated_data.pop('franchise')

        return instance
