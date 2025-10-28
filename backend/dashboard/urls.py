# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\urls.py
from django.urls import path
from . import views
from .views import UserRegisterView
from .views import login_view
urlpatterns=[
    path('token/<str:consumer_id>',views.get_token_balance),
    path('buy/<str:consumer_id>',views.buy_tokens),
    path('energy/<str:consumer_id>',views.get_energy_usage),
    path('register/',UserRegisterView.as_view(),name='register'),
    path('login/', login_view, name='login'),
    path('consumer/dashboard', views.consumer_dashboard),
    path('producer/dashboard', views.producer_dashboard),
    path('admin/dashboard', views.admin_dashboard),
]