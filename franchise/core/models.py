from django.db import models

class CollectableType(models.TextChoices):
    """
    Tipos de colecionáveis
    """
    LETTER_BULLS_EYE = 'OLHO_DE_BOI', 'Olho de Boi'
    LETTER_FIRST_EDITION = 'FIRST_EDITION_LETTER', 'Cartas primeira edição'
    LETTER_SECOND_EDITION = 'SECOND_EDITION_LETTER', 'Cartas segunda edição'


class Collection(models.Model):
    """
    Define um conjunto de cartas/selos de acordo com uma classificação do colecionador
    """
    name = models.CharField(max_length=50)
    description = models.TextField()


class Collectable(models.Model):
    """
    Define uma estrutura auxiliar com os dados em comuns de tudo que for selecionável.
    """
    collection = models.ForeignKey(Collection, verbose_name="collectables", on_delete=models.PROTECT, null=True)
    type = models.CharField(choices=CollectableType.choices, max_length=50)
    name = models.CharField(max_length=50)


class Franchise(models.Model):
    """
    Define um conjunto de array das Franquias.
    """
    collectable = models.ForeignKey(Collectable, verbose_name="collectable", on_delete=models.CASCADE, related_name="franchise", blank=True, null=True)
    value = models.IntegerField()
    quantity = models.IntegerField()
