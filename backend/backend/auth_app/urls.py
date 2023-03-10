from django.urls import path

from backend.auth_app.views import UserCreateView, UserLoginView

urlpatterns = (
    path('login/', UserLoginView.as_view(), name='login user'),
    path('register/', UserCreateView.as_view(), name='request user'),
)