# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\serializers.py
from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=[ 'name', 'email','password','role', 'wallet_address', 'location', 'created_at']
        extra_kwargs={
            'password':{'write_only':True}
        }