# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\views.py
import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
CSV_FILE='data/energy-usage.csv'
TOKEN_BALANCES={
    "customer_1":100
}

@api_view(['GET'])
def get_token_balance(request,consumer_id):
    balance=TOKEN_BALANCES.get(consumer_id,0)
    return Response({"token_balance":balance})
@api_view(['POST'])
def buy_tokens(request,consumer_id):
    amount=int(request.data.get('amount',0))
    if amount<=0:
        return Response({'error ':"Invalid Amount"},status=400)
    TOKEN_BALANCES[consumer_id]=TOKEN_BALANCES.get(consumer_id,0)+amount
    return Response({"token_balance":TOKEN_BALANCES[consumer_id]})
@api_view(['GET'])
def get_energy_usage(request,consumer_id):
    df=pd.read_csv(CSV_FILE)
    user_data=df[df['consumer_id'] == consumer_id]
    data_list=user_data[['date','energy_consumed']].to_dict(orient='records')
    return Response(data_list)

class UserRegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer


@csrf_exempt
@api_view(['POST'])
def login_view(request):
    """
    Verify email and password from the existing 'users' table.
    Redirect based on role.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password required'}, status=400)

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=401)

    # Check passs.. hash
    from django.contrib.auth.hashers import check_password
    if check_password(password, user_obj.password):
        role = user_obj.role.lower()
        if role == 'consumer':
            return Response({'message': 'Login successful', 'redirect_to': '/consumer'})
        elif role == 'producer':
            return Response({'message': 'Login successful', 'redirect_to': '/producer'})
        elif role == 'admin':
            return Response({'message': 'Login successful', 'redirect_to': '/adminpanal'})
        else:
            return Response({'error': 'Unknown role'}, status=400)
    else:
        return Response({'error': 'Invalid email or password'}, status=401)
    
@api_view(['GET'])
def consumer_dashboard(request):
    return Response({"message": "Welcome Consumer!"})

@api_view(['GET'])
def producer_dashboard(request):
    return Response({"message": "Welcome Producer!"})

@api_view(['GET'])
def admin_dashboard(request):
    return Response({"message": "Welcome Admin!"})
