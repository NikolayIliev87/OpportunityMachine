from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin)
from django.db import models

from backend.auth_app.managers import OpportunityMachineUserManager
# from backend.common.validators import validate_letters, validate_phone_number


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
