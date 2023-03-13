from django.urls import path

from backend.auth_app.views import UserCreateView, UserLoginView, UserLogoutView, ProfilesListView, \
    ProfileDetailsAndUpdateView, ChangeUserPasswordView

urlpatterns = (
    path('login/', UserLoginView.as_view(), name='login user'),
    path('register/', UserCreateView.as_view(), name='request user'),
    path('logout/', UserLogoutView.as_view(), name='logout user'),
    path('profile/', ProfilesListView.as_view(), name='profiles list'),
    path('profile/<int:pk>/', ProfileDetailsAndUpdateView.as_view(), name='profile details and update'),
    path('edit-password/', ChangeUserPasswordView.as_view(), name='change password'),
)