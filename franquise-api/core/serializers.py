
from django.db.models import fields
from rest_framework import serializers
from . import models


# Franchise 
class FranchiseSerializer(serializers.ModelSerializer):
        class Meta:
                model = models.Franchise
                fields = '__all__'     
        
 
# Coleção Completa 
class CollectableSerializer(serializers.ModelSerializer):   
        franchise = FranchiseSerializer(many=True, required=False) 
    

        class Meta:
                model = models.Collectable
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
                   
                if franchise: # Franchise
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
                
                instance = super().update(instance, validated_data) 
                print("Id da collection:", instance.id)
                
                remove_items = { list.id: list for list in instance.franchise.all() }
                print(remove_items)
                
                if franchise: 
                        for list in franchise: 
                                item_id = instance.franchise.all().filter(value=list['value'],quantity=list['quantity'], id=instance.id).count()
                                print(item_id)
                                
                                if item_id is not None:   
                                        instance.franchise.all().filter(value=list['value'],quantity=list['quantity'], id=instance.id).update(**list) 
                                        print("Update Instance !!!")
                                        # item['collectable'] = instance 
                                        # item = FranchiseSerializer().create(item)
                                        # print("Create Instance !!!")
                                        
                                elif  remove_items.get(item_id) is not None:
                                        instance_item = remove_items.pop(item_id)
                                        models.Franchise.objects.filter(id=instance_item.id).update(**list)
                                            
                                            
                                            
                        # for item in remove_items.values():
                        #         item.delete()
                                
                        # for field in validated_data:
                        #         setattr(instance, field, validated_data.get(field, getattr(instance, field)))
                        #         instance.save()
                                
                return instance
                
                
                
                
                
        	# remove_items = { item.id: item for item in instance.franchise.all() }
		# 		for item in franchise:
                #         item_id = item.get("id", None)
                #         print(item_id)
                #         if item_id is not None: 
                #                 instance.franchise.all().filter(value=item['value'],quantity=item['quantity'], id=instance.id).update(**item)       
                #                 item['collectable'] = instance 
                #                 item = FranchiseSerializer().create(item)
                #                 print("Create Instance !!!")
                               
                #         elif  remove_items.get(item_id) is not None:
                #                 instance_item = remove_items.pop(item_id)
                #                 models.Franchise.objects.filter(id=instance_item.id).update(**item)
                                
                # for item in remove_items.values():
                #         item.delete()
                        
                # for field in validated_data:
                #         setattr(instance, field, validated_data.get(field, getattr(instance, field)))
                #         instance.save()
                        