from django.core import exceptions
from django.contrib.auth import get_user_model
from rest_framework import generics as api_generic_views, permissions
from rest_framework import views as api_views
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from backend.auth_app.managers import CustomObtainAuthToken
from backend.auth_app.models import Profile, CityOffice, Role
from backend.auth_app.serializers import UserCreateSerializer, ProfileSerializerManagers, ProfileForDetailsSerializer, \
    OfficeCitySerializer, RoleTypeSerializer, ProfileForUpdateSerializer

UserModel = get_user_model()


class UserCreateView(api_generic_views.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = (
        permissions.AllowAny,
    )


class ChangeUserPasswordView(api_generic_views.UpdateAPIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )


# class UserLoginView(auth_views.ObtainAuthToken):
#     permission_classes = (
#         permissions.AllowAny,
#     )

#To check during app creation do i need customer token and if yes change UserLoginView
class UserLoginView(CustomObtainAuthToken):
    permission_classes = (
        permissions.AllowAny,
    )


class UserLogoutView(api_views.APIView):
    permission_classes = (
        permissions.IsAuthenticated,
    )

    @staticmethod
    def __perform_logout(request):
        token = Token.objects.get(user=request.user)
        token.delete()

        return Response({
            'message': 'User Logged Out!'
        })

    def get(self, request):
        return self.__perform_logout(request)

    def post(self, request):
        return self.__perform_logout(request)


class ProfilesListView(api_generic_views.ListAPIView):
    queryset = Profile.objects.all()
    permission_classes = (
        permissions.IsAdminUser,
        permissions.IsAuthenticated,
    )

    serializer_class = ProfileForDetailsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # queryset = queryset.filter(is_deleted=False)
        queryset = queryset.exclude(user=self.request.user)

        return queryset


class ProfileDetailsAndUpdateView(api_generic_views.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()

    details_serializer_class = ProfileForDetailsSerializer
    update_serializer_class = ProfileForUpdateSerializer

    def get_serializer_class(self):
        if self.request.method.lower() == 'put':
            return self.update_serializer_class
        return self.details_serializer_class

    permission_classes = (
        permissions.IsAuthenticated,
    )

    # serializer_class = ProfileForUpdateAndDetailsSerializer

    def get_object(self):
        the_object = super().get_object()
        # if self.request.user.is_superuser:
        #     return the_object
        if the_object.user != self.request.user and not self.request.user.is_superuser:
            raise exceptions.PermissionDenied
        return the_object


# class OfficeCityListView(api_generic_views.ListAPIView):
#     queryset = CityOffice.objects.all()
#     serializer_class = OfficeCitySerializer
#     permission_classes = (
#         permissions.AllowAny,
#     )


# class RoleTypeListView(api_generic_views.ListAPIView):
#     queryset = Role.objects.all()
#     serializer_class = RoleTypeSerializer
#     permission_classes = (
#         permissions.AllowAny,
#     )


class OfficeCityListandCreateView(api_generic_views.ListCreateAPIView):
    queryset = CityOffice.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OfficeCitySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permission() for permission in self.permission_classes]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_deleted=False)

        return queryset


class OfficeCityUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = CityOffice.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OfficeCitySerializer

    def get_permissions(self):
        if self.request.method == "PUT":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]


class RoleTypeListandCreateView(api_generic_views.ListCreateAPIView):
    queryset = Role.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = RoleTypeSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permission() for permission in self.permission_classes]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_deleted=False)

        return queryset


class RoleTypeUpdateandDetailsView(api_generic_views.RetrieveUpdateAPIView):
    queryset = Role.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = RoleTypeSerializer

    def get_permissions(self):
        if self.request.method == "PUT":
            return [permission() for permission in self.permission_classes]
        return [permissions.IsAuthenticated()]


class ManagersListView(api_generic_views.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializerManagers
    permission_classes = (
        permissions.AllowAny,
    )

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(is_manager=True)

        return queryset
