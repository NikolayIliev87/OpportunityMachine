# Generated by Django 3.2.18 on 2023-03-13 16:48

import backend.common.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='OpportunityMachineUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CityOffice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('first_name', models.CharField(max_length=20, validators=[backend.common.validators.validate_letters])),
                ('last_name', models.CharField(max_length=25, validators=[backend.common.validators.validate_letters])),
                ('phone', models.CharField(max_length=15, validators=[backend.common.validators.validate_phone_number])),
                ('photo_url', models.URLField(blank=True, null=True)),
                ('manager', models.EmailField(max_length=254)),
                ('is_manager', models.BooleanField()),
                ('role_description', models.CharField(blank=True, max_length=50, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth_app.opportunitymachineuser')),
                ('city_office', models.ForeignKey(default='NO CITY OFFICE SET!', on_delete=models.SET('NO CITY OFFICE SET!'), related_name='profile_city_office', to='auth_app.cityoffice')),
                ('managing_city_offices', models.ManyToManyField(related_name='profile_managing_city', to='auth_app.CityOffice')),
                ('role_type', models.ForeignKey(default='NO ROLE TYPE SET!', on_delete=models.SET('NO ROLE TYPE SET!'), related_name='profile_role_type', to='auth_app.role')),
            ],
        ),
    ]
