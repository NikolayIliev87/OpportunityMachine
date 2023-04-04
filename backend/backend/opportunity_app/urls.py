from django.urls import path

from backend.opportunity_app.views import ProductGroupListandCreateView, \
    ProductListandCreateView, ProductGroupUpdateandDetailsView, ProductUpdateandDetailsView, \
    ClientListandCreateView, ClientUpdateandDetailsView

urlpatterns = (
    path('productgroup/', ProductGroupListandCreateView.as_view(), name='api list and create product group'),
    path('productgroup/<int:pk>/', ProductGroupUpdateandDetailsView.as_view(), name='api update and details product group'),
    path('product/', ProductListandCreateView.as_view(), name='api list and create product'),
    path('product/<int:pk>/', ProductUpdateandDetailsView.as_view(), name='api update and details product'),
    path('client/', ClientListandCreateView.as_view(), name='api list and create client'),
    path('client/<int:pk>/', ClientUpdateandDetailsView.as_view(), name='api update and details client'),
)