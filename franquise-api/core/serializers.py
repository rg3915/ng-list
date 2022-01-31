from .models import Franchise, ListFranchise
from rest_framework import serializers

class ListFranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListFranchise
        fields = ['id', 'franchise', 'value', 'quantity']

class FranchiseSerializer(serializers.ModelSerializer):
        listfranchise = ListFranchiseSerializer(many=True, required=False)
    
        
        class Meta:
                model = Franchise
                fields = ['id', 'franchise', 'listfranchise']

        
        def create(self, validated_data):
                print(validated_data)
                listfranchise = None  
                
                if 'listfranchise' in validated_data:
                        listfranchise = validated_data.pop('listfranchise')
    
                instance = Franchise.objects.create(**validated_data)
                
                if listfranchise:
                        for list in listfranchise:
                                list['franchise'] = instance
                                print(instance)
                                list = ListFranchiseSerializer().create(list)   
                return instance
                
                
        def update(self, instance, validated_data):
                print(instance, validated_data)
                listfranchise = None  
                
                if 'listfranchise' in validated_data:
                        listfranchise = validated_data.pop('listfranchise')
    
                instance = Franchise.objects.update(instance, **validated_data)
                
                if listfranchise:
                        for list in listfranchise:
                                if instance.listfranchise.all().filter(franchise = list['franchise']).count() == 1:
                                        instance.listfranchise.all().filter(franchise = list['franchise']).update(**list)
                                else:
                                        list['franchise'] = instance
                                        print(instance)
                                        list = ListFranchiseSerializer().create(list)   
                return instance