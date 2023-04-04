from rest_framework import serializers

from backend.opportunity_app.models import ProductGroup, Product, Client


class ProductGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGroup
        fields = ('id', 'name', 'is_deleted')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'group', 'is_deleted')


class ProductSerializerDetails(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'group', 'is_deleted')

        depth = 1


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'city', 'managing_city', 'address', 'contact', 'discount', 'phone', 'is_deleted')


class ClientSerializerDetails(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'city', 'managing_city', 'address', 'contact', 'discount', 'phone', 'is_deleted')

        depth = 1
