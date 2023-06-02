from django.db import models

import uuid

from backend.auth_app.models import CityOffice

from backend.common.validators import validate_phone_number

from django.contrib.auth import get_user_model

UserModel = get_user_model()


def generate_opportunity_id():
    return str(uuid.uuid4()).split("-")[-1]


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
    DESCRIPTION_MAX_LENGTH = 100

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        unique=True,
    )

    description = models.CharField(
        max_length=DESCRIPTION_MAX_LENGTH,
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


class Opportunity(models.Model):
    NAME_MAX_LENGTH = 25
    DESCRIPTION_MAX_LENGTH = 100
    OPPORTUNITY_ID_MAX_LENGTH = 255

    STATUSES = [
        ('Ongoing', 'Ongoing'),
        ('Lost', 'Lost'),
        ('Won', 'Won')
    ]

    # opportunity_id = models.CharField(
    #     max_length=OPPORTUNITY_ID_MAX_LENGTH,
    #     # blank=True,
    #     # null=True,
    #     primary_key=True,
    #     default="0"
    # )

    name = models.CharField(
        max_length=NAME_MAX_LENGTH,
        null=False,
        blank=False,
    )

    description = models.TextField(
        max_length=DESCRIPTION_MAX_LENGTH,
        null=False,
        blank=False,
    )

    created_date = models.DateField(
        auto_now_add=True,
    )

    last_modified_date = models.DateField(
        null=False,
        blank=False,
    )

    close_date = models.DateField(
        null=False,
        blank=False,
    )

    status = models.CharField(
        max_length=15,
        choices=STATUSES,
    )

    client = models.ForeignKey(
        Client,
        on_delete=models.DO_NOTHING,
        primary_key=False,
        blank=False,
        null=False,
        related_name="opportunity_client",
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.DO_NOTHING,
    )

    products = models.ManyToManyField(
        Product,
        through='OpportunityProducts',
        related_name="opportunity_products_list",
        blank=True,
        null=True
    )

    def __str__(self):
        return "{} - {}".format(self.name, self.id)


class OpportunityProducts(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        on_delete=models.DO_NOTHING,
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.DO_NOTHING,
    )
    quantity = models.PositiveIntegerField()
