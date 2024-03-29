# Generated by Django 3.2.18 on 2023-04-04 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='discount',
            field=models.PositiveSmallIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='name',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]
