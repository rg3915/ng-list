# Generated by Django 3.2.11 on 2022-01-28 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20220117_1403'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listfranchise',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='listfranchise',
            name='value',
        ),
        migrations.AddField(
            model_name='listfranchise',
            name='valuexquantity',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
