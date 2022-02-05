from rest_framework import viewsets
from rest_framework.response import Response

from .models import Collectable, Franchise
from .serializers import CollectableSerializer, FranchiseSerializer


class CollectableFranchiseViewSet(viewsets.ModelViewSet):
    queryset = Franchise.objects.all()
    serializer_class = FranchiseSerializer


class CollectableViewSet(viewsets.ModelViewSet):
    queryset = Collectable.objects.all()
    serializer_class = CollectableSerializer

    def update(self, request, *args, **kwargs):
        '''
        https://www.cdrf.co/3.12/rest_framework.viewsets/ModelViewSet.html#update
        '''
        # Reescreve o update default.
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        franchise = self.request.data.get('franchise')

        if franchise:
            for item in franchise:
                _id = item.get('id')
                if _id:
                    # Pega Franchise existente
                    franchise_obj = instance.franchise.get(id=_id)
                    franchise_obj.value = item.get('value')
                    franchise_obj.quantity = item.get('quantity')
                    franchise_obj.save()
                else:
                    instance.franchise.create(
                        value=item.get('value'),
                        quantity=item.get('quantity'),
                    )

        return Response(serializer.data)
