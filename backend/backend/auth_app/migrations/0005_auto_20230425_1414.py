# Generated by Django 3.2.18 on 2023-04-25 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0004_profile_is_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='cityoffice',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='role',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]