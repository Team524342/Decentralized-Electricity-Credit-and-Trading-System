# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\urls.py
from django.urls import path
from . import views
from .views import UserRegisterView
from .views import login_view
from django.urls import re_path
from . import views_auth
from .views import consumer_dashboard, producer_dashboard
urlpatterns=[
    path('token/<str:consumer_id>',views.get_token_balance),
    path('buy/<str:consumer_id>',views.buy_tokens),
    path('energy/<str:consumer_id>',views.get_energy_usage),
    path('register/',UserRegisterView.as_view(),name='register'),
    path('login/', views_auth.login_user, name='login'),
    # path('login/', login_view, name='login'),
    # path('consumer/dashboard', views.consumer_dashboard),
    # path('producer/dashboard', views.producer_dashboard),
    path('consumer/dashboard/', consumer_dashboard, name='consumer_dashboard'),
    path('producer/dashboard/', producer_dashboard, name='producer_dashboard'),
    path('admin/dashboard', views.admin_dashboard),
    path('profile/<str:email>', views.get_user_profile, name='get_profile'),
    re_path(r'^profile/(?P<email>[^/]+)/$', views.get_user_profile, name='get_profile'),
]