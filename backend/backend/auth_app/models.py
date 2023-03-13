from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin)
from django.db import models

from backend.auth_app.managers import OpportunityMachineUserManager
from backend.common.validators import validate_letters, validate_phone_number


class OpportunityMachineUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name="Email",
        unique=True,
        null=False,
        blank=False,
    )

    date_joined = models.DateTimeField(
        auto_now_add=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )

    is_superuser = models.BooleanField(
        default=False,
    )

    USERNAME_FIELD = 'email'

    objects = OpportunityMachineUserManager()


class CityOffice(models.Model):
    NAME_MAX_LENGTH = 25

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    def __str__(self):
        return self.name


class Role(models.Model):
    NAME_MAX_LENGTH = 25

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    def __str__(self):
        return self.name


class Profile(models.Model):
    FIRST_NAME_MAX_LENGTH = 20
    LAST_NAME_MAX_LENGTH = 25
    PHONE_MAX_LENGTH = 15
    GROUP_NAME_MAX_LENGTH = 20
    ROLE_DESCRIPTION_MAX_LENGTH = 50

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LENGTH,
        validators=(
            validate_letters,
        )
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LENGTH,
        validators=(
            validate_letters,
        )
    )

    phone = models.CharField(
        max_length=PHONE_MAX_LENGTH,
        validators=(
            validate_phone_number,
        )
    )

    photo_url = models.URLField(
        null=True,
        blank=True,
    )

    city_office = models.ForeignKey(
        CityOffice,
        default='NO CITY OFFICE SET!',
        on_delete=models.SET('NO CITY OFFICE SET!'),
        primary_key=False,
        blank=False,
        null=False,
        related_name="profile_city_office",
    )

    manager = models.EmailField(
        null=False,
        blank=False,
    )

    is_manager = models.BooleanField()

    role_type = models.ForeignKey(
        Role,
        default='NO ROLE TYPE SET!',
        on_delete=models.SET('NO ROLE TYPE SET!'),
        primary_key=False,
        blank=False,
        null=False,
        related_name="profile_role_type",
    )

    role_description = models.CharField(
        max_length=ROLE_DESCRIPTION_MAX_LENGTH,
        blank=True,
        null=True,
    )

    managing_city_offices = models.ManyToManyField(
        CityOffice,
        related_name="profile_managing_city",
    )

    user = models.OneToOneField(
        OpportunityMachineUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

