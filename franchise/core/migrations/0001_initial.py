# Generated by Django 3.2.11 on 2022-02-03 12:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collectable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('OLHO_DE_BOI', 'Olho de Boi'), ('FIRST_EDITION_LETTER', 'Cartas primeira edição'), ('SECOND_EDITION_LETTER', 'Cartas segunda edição')], max_length=50)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Franchise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField()),
                ('quantity', models.IntegerField()),
                ('collectable', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='franchise', to='core.collectable', verbose_name='collectable')),
            ],
        ),
        migrations.AddField(
            model_name='collectable',
            name='collection',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='core.collection', verbose_name='collectables'),
        ),
    ]
