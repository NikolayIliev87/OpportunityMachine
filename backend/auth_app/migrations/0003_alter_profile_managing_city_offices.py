# Generated by Django 3.2.18 on 2023-03-22 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0002_alter_profile_manager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='managing_city_offices',
            field=models.ManyToManyField(blank=True, null=True, related_name='profile_managing_city', to='auth_app.CityOffice'),
        ),
    ]
