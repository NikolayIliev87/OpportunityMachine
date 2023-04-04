from django.db import models

from backend.auth_app.models import CityOffice

from backend.common.validators import validate_phone_number


class ProductGroup(models.Model):
    NAME_MAX_LENGTH = 25

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    is_deleted = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.name


class Product(models.Model):
    NAME_MAX_LENGTH = 25
    DESCRIPTION_MAX_LENGTH = 75

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    description = models.CharField(
        max_length=NAME_MAX_LENGTH,
    )

    price = models.FloatField()

    group = models.ForeignKey(
        ProductGroup,
        on_delete=models.DO_NOTHING,
        primary_key=False,
        blank=False,
        null=False,
        related_name="product_group",
    )

    is_deleted = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.name


class Client(models.Model):
    NAME_MAX_LENGTH = 25
    CITY_MAX_LENGTH = 25
    ADDRESS_MAX_LENGTH = 100
    PHONE_MAX_LENGTH = 15

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    city = models.CharField(
        max_length=CITY_MAX_LENGTH,
        null=False,
        blank=False,
    )

    managing_city = models.ForeignKey(
        CityOffice,
        on_delete=models.DO_NOTHING,
        primary_key=False,
        blank=False,
        null=False,
        related_name="client_city_office",
    )

    address = models.CharField(
        max_length=ADDRESS_MAX_LENGTH,
        null=True,
        blank=True,
    )

    contact = models.EmailField(
        null=False,
        blank=False,
    )

    discount = models.PositiveSmallIntegerField(
        default=0,
        blank=True,
        null=True
    )

    phone = models.CharField(
        max_length=PHONE_MAX_LENGTH,
        validators=(
            validate_phone_number,
        )
    )

    is_deleted = models.BooleanField(
        default=False
    )

    def __str__(self):
        return self.name
