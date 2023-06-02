from django.urls import path

from backend.auth_app.views import UserCreateView, UserLoginView, UserLogoutView, ProfilesListView, \
    ProfileDetailsAndUpdateView, ChangeUserPasswordView, OfficeCityListandCreateView, \
    RoleTypeListandCreateView, ManagersListView, OfficeCityUpdateandDetailsView, RoleTypeUpdateandDetailsView

urlpatterns = (
    path('login/', UserLoginView.as_view(), name='login user'),
    path('register/', UserCreateView.as_view(), name='request user'),
    path('logout/', UserLogoutView.as_view(), name='logout user'),
    path('profile/', ProfilesListView.as_view(), name='profiles list'),
    path('profile/<int:pk>/', ProfileDetailsAndUpdateView.as_view(), name='api profile details and update'),
    path('edit-password/', ChangeUserPasswordView.as_view(), name='change password'),
    path('city_offices/', OfficeCityListandCreateView.as_view(), name='api list and create city office'),
    path('city_offices/<int:pk>/', OfficeCityUpdateandDetailsView.as_view(), name='api update and details city office'),
    path('role_type/', RoleTypeListandCreateView.as_view(), name='api list and create role type'),
    path('role_type/<int:pk>/', RoleTypeUpdateandDetailsView.as_view(), name='api update and details role type'),
    path('managers/', ManagersListView.as_view(), name='api managers list'),
)