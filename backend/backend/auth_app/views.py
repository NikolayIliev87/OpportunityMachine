from django.contrib.auth import get_user_model
from rest_framework import generics as api_generic_views, permissions
from rest_framework import views as api_views
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from backend.auth_app.serializers import UserCreateSerializer

UserModel = get_user_model()


class UserCreateView(api_generic_views.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = (
        permissions.AllowAny,
    )


class ChangeUserPasswordView():
    permission_classes = (
        permissions.AllowAny,
    )


class UserLoginView(auth_views.ObtainAuthToken):
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


class UserDetailsView():
    permission_classes = (
        permissions.IsAuthenticated,
    )


class EditProfileView():
    permission_classes = (
        permissions.IsAuthenticated,
    )


