# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\views.py
import pandas as pd
from rest_framework.response import Response
from .models import User
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from dashboard.auth_backend import CustomJWTAuthentication




# DEPRECATED FUNCTIONS - Use api_views.py instead
# These functions are kept for backwards compatibility but should not be used in production
# All these functions have proper implementations in api_views.py with better error handling and authentication

CSV_FILE='data/energy-usage.csv'
TOKEN_BALANCES={
    "customer_1":100
}

@api_view(['GET'])
@authentication_classes([CustomJWTAuthentication])
@permission_classes([IsAuthenticated])
def consumer_dashboard(request):
    user = request.user

    if user.role != 'consumer':
        return Response({"detail": "Access denied"}, status=403)

    # Return consumer-specific data
    return Response({
        "message": f"Welcome {user.name}, your role is {user.role}",
        "email": user.email,
        "wallet_address": user.wallet_address,
    })


@api_view(['GET'])
@authentication_classes([CustomJWTAuthentication])
@permission_classes([IsAuthenticated])
def producer_dashboard(request):
    user = request.user

    if getattr(user, 'role', '').lower() != 'producer':
        return Response({"detail": "Access denied"}, status=403)

    return Response({
        "message": f"Welcome {user.name}, your role is {user.role}",
        "email": user.email,
        "wallet_address": user.wallet_address,
    })


@api_view(['GET'])
@authentication_classes([CustomJWTAuthentication])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    user = request.user

    if getattr(user, 'role', '').lower() != 'admin':
        return Response({"detail": "Access denied"}, status=403)

    return Response({"message": f"Welcome Admin {user.name}!"})


@api_view(['GET'])
def get_token_balance(request, consumer_id):
    """
    DEPRECATED - Use api_views.py get_user_token_balance() instead
    """
    balance = TOKEN_BALANCES.get(consumer_id, 0)
    return Response({"token_balance": balance})


@api_view(['POST'])
def buy_tokens(request, consumer_id):
    """
    DEPRECATED - Use api_views.py create_buy_order() instead
    """
    amount = int(request.data.get('amount', 0))
    if amount <= 0:
        return Response({'error': "Invalid Amount"}, status=400)
    TOKEN_BALANCES[consumer_id] = TOKEN_BALANCES.get(consumer_id, 0) + amount
    return Response({"token_balance": TOKEN_BALANCES[consumer_id]})


@api_view(['GET'])
def get_energy_usage(request, consumer_id):
    """
    DEPRECATED - Use api_views.py for energy-related endpoints instead
    """
    df = pd.read_csv(CSV_FILE)
    user_data = df[df['consumer_id'] == consumer_id]
    data_list = user_data[['date', 'energy_consumed']].to_dict(orient='records')
    return Response(data_list)


class UserRegisterView(generics.CreateAPIView):
    """
    DEPRECATED - Use api_views.py register_user() instead
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


# DEPRECATED FUNCTIONS - Use api_views.py instead
# login_view: DEPRECATED - Use api_views.py login_user() instead
# get_user_profile: DEPRECATED - Use api_views.py get_user_profile() instead
