# Generated by Django 3.2.18 on 2023-05-15 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('opportunity_app', '0005_alter_product_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='opportunity',
            name='id',
        ),
        migrations.AddField(
            model_name='opportunity',
            name='opportunity_id',
            field=models.CharField(default=0, max_length=255, primary_key=True, serialize=False),
        ),
    ]
