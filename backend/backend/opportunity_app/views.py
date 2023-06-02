from django.core import exceptions

from rest_framework import generics as api_generic_views, permissions
from backend.common.permissions import UserAllStaffAllButEditOrReadOnly

from backend.opportunity_app.models import ProductGroup, Product, Client, Opportunity
from backend.opportunity_app.serializers import ProductGroupSerializer, ProductSerializer, ClientSerializer, \
    ClientSerializerDetails, ProductSerializerDetails, OpportunityCreateSerializer, OpportunitySerializer


class ClientListandCreateView(api_generic_views.ListCreateAPIView):
    queryset = Client.objects.all()
    permission_classes = [permissions.IsAdminUser]

    details_serializer_class = ClientSerializerDetails
    create_serializer_class = ClientSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'post':
            return self.create_serializer_class
        return self.details_serializer_class

    def get_permissions(self):
        if self.request.method.lower() == "post":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_deleted=False)

        # queryset = queryset.filter(managing_cities=self.request.user_city)

        return queryset


class ClientUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = Client.objects.all()
    permission_classes = [permissions.IsAdminUser]

    details_serializer_class = ClientSerializerDetails
    update_serializer_class = ClientSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'put':
            return self.update_serializer_class
        return self.details_serializer_class

    def get_permissions(self):
        if self.request.method.lower() == "put":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]

    # def get_object(self):
    #     the_object = super().get_object()
    #
    #     if not self.request.user.is_superuser:
    #         raise exceptions.PermissionDenied
    #     return the_object


class ProductGroupListandCreateView(api_generic_views.ListCreateAPIView):
    queryset = ProductGroup.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ProductGroupSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_deleted=False)

        return queryset


class ProductGroupUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = ProductGroup.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ProductGroupSerializer

    def get_permissions(self):
        if self.request.method == "PUT":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]


class ProductListandCreateView(api_generic_views.ListCreateAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAdminUser]

    details_serializer_class = ProductSerializerDetails
    create_serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'post':
            return self.create_serializer_class
        return self.details_serializer_class

    def get_permissions(self):
        if self.request.method.lower() == "post":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_deleted=False)

        return queryset


class ProductUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAdminUser]

    details_serializer_class = ProductSerializerDetails
    update_serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'put':
            return self.update_serializer_class
        return self.details_serializer_class

    def get_permissions(self):
        if self.request.method.lower() == "put":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]


class OpportunityCreateView(api_generic_views.ListCreateAPIView):
    queryset = Opportunity.objects.all()
    permission_classes = (
        permissions.IsAuthenticated,
    )

    list_serializer_class = OpportunitySerializer
    create_serializer_class = OpportunityCreateSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'post':
            return self.create_serializer_class
        return self.list_serializer_class


class OpportunityUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = Opportunity.objects.all()
    permission_classes = [UserAllStaffAllButEditOrReadOnly]

    details_serializer_class = OpportunitySerializer
    update_serializer_class = OpportunityCreateSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'put':
            return self.update_serializer_class
        return self.details_serializer_class
