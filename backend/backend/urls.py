# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\backend\urls.py
from django.contrib import admin
from django.urls import path ,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('dashboard.urls'))
]
