from django.urls import path
from . import views
urlpatterns=[
    path('token/<str:consumer_id>',views.get_token_balance),
    path('buy/<str:consumer_id>',views.buy_tokens),
]