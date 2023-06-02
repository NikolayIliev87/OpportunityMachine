
from rest_framework import serializers

from backend.opportunity_app.models import ProductGroup, Product, Client, Opportunity, OpportunityProducts


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


class OpportunityProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpportunityProducts
        fields = ('product', 'quantity')

        depth = 1


class OpportunityProductsSerializerCreateOpportunity(serializers.ModelSerializer):

    class Meta:
        model = OpportunityProducts
        fields = ('product', 'quantity')


#serialized for create/update opportunity with included create of opportunity products in trough table
class OpportunityCreateSerializer(serializers.ModelSerializer):
    products = OpportunityProductsSerializerCreateOpportunity(required=True, many=True)

    class Meta:
        model = Opportunity
        fields = ('id', 'name', 'description', 'last_modified_date', 'close_date', 'status', 'client',
                  'user', 'products')

    def create(self, validated_data):

        opportunity = Opportunity.objects.create(
            # opportunity_id=validated_data['opportunity_id'],
            name=validated_data['name'],
            description=validated_data['description'],
            last_modified_date=validated_data['last_modified_date'],
            close_date=validated_data['close_date'],
            status=validated_data['status'],
            client=validated_data['client'],
            user=validated_data['user'],
        )

        products_data = validated_data.pop('products')

        if len(products_data) > 0:
            for product_data in products_data:

                product_obj = Product.objects.get(name=product_data['product'])

                OpportunityProducts.objects.create(
                    opportunity=opportunity,
                    product=product_obj,
                    quantity=product_data['quantity']
                )

        return opportunity

    def update(self, instance, validated_data):
        products_data = validated_data.pop('products')
        instance = super().update(instance, validated_data)

        instance.save()

        products_list = OpportunityProducts.objects.filter(opportunity_id=instance.id)
        for product in products_list:
            OpportunityProducts.delete(product)

        if len(products_data) > 0:
            for product_data in products_data:

                product_obj = Product.objects.get(name=product_data['product'])

                OpportunityProducts.objects.create(
                    opportunity=instance,
                    product=product_obj,
                    quantity=product_data['quantity']
                )

        return instance


#serialized for list/details all opportunities with inclusion of products for each oppoerunity
class OpportunitySerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    client = ClientSerializer()

    def get_user_username(self, obj):
        return obj.user.email

    username = serializers.SerializerMethodField("get_user_username")

    class Meta:
        model = Opportunity
        fields = ('id', 'name', 'description', 'created_date', 'last_modified_date', 'close_date', 'status', 'client',
                  'username', 'products')

    def get_products(self, opportunity_instance):
        query_datas = OpportunityProducts.objects.filter(opportunity_id=opportunity_instance)
        return [OpportunityProductsSerializer(product).data for product in query_datas]

