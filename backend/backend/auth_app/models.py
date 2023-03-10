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


class Profile(models.Model):
    FIRST_NAME_MAX_LENGTH = 20
    LAST_NAME_MAX_LENGTH = 25
    PHONE_MAX_LENGTH = 15
    GROUP_NAME_MAX_LENGTH = 20

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

    user = models.OneToOneField(
        OpportunityMachineUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

