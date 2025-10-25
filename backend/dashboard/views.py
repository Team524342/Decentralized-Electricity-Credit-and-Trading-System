import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from rest_framework import generics
from .serializers import UserSerializer
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
