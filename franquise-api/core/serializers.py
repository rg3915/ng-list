from django.db.models import fields
from rest_framework import serializers
from .models import Franchise, Collectable


# Franchise
class FranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franchise
        fields = ('id', 'value', 'quantity', 'collectable')
        read_only_fields = ('id',)
        # extra_kwargs = {'id': {'read_only': False, 'required': True}}


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
            for item in franchise:
                item['collectable'] = instance
                item = FranchiseSerializer().create(item)
        return instance

    def update(self, instance, validated_data):
        """
        Criar um colecionavel e seus elementos nested.
        """ 
        franchise = None

        if 'franchise' in validated_data:
            franchise = validated_data.pop('franchise')
        
        # lista para remover o item da array pelo id
        remove_items = Franchise.objects.filter(collectable=instance.id).values_list('id', flat=True)
        itemlist = []
        
        for item in franchise:
            if "id" in item.keys():
	            # Se identificar que item tem Id, faça UPDATE
                if instance.franchise.all().filter(id=item['id']).count() > 0:
                    instance.franchise.all().filter(id=item['id']).update(**item)
                    print("update") 
                    
                    # estou sempre fazendo append na lista porque ele não remove ou não deixa adicionar um novo
                    item_instance = Franchise.objects.get(id=item['id']) 
                    itemlist.append(item_instance.id)
                
                else:
                    continue
            else:  
                # Se informações vir com Id = undefined ele cria com instance.
                itens_instance = Franchise.objects.create(collectable=instance, **item)
                itemlist.append(itens_instance.id)
        
        
        # Remove item pelo id
        for item_id in remove_items:
            if item_id not in itemlist:
                Franchise.objects.filter(id=item_id).delete()

        return instance