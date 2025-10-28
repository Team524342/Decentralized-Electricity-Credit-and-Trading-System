# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\serializers.py
from rest_framework import serializers
from .models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }