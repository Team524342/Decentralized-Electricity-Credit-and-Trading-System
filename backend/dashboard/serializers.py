# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\serializers.py
# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\serializers.py
from rest_framework import serializers
from .models import User, Order, TradeMatch, DynamicPricing, Wallet, EnergyTokenTransaction


# =================== AUTHENTICATION SERIALIZERS ===================

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'user_id',
            'name',
            'email',
            'password',
            'user_type',
            'latitude',
            'longitude',
            'wallet_address',
            'grid_connection_point',
            'installed_capacity_kw',
            'storage_capacity_kwh'
        ]
        read_only_fields = ['user_id']

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            email=validated_data['email'],
            user_type=validated_data['user_type'],
            latitude=validated_data.get('latitude'),
            longitude=validated_data.get('longitude'),
            wallet_address=validated_data.get('wallet_address'),
            grid_connection_point=validated_data.get('grid_connection_point'),
            installed_capacity_kw=validated_data.get('installed_capacity_kw'),
            storage_capacity_kwh=validated_data.get('storage_capacity_kwh')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not user.check_password(data['password']):
            raise serializers.ValidationError("Invalid email or password")

        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_id',
            'name',
            'email',
            'user_type',
            'latitude',
            'longitude',
            'wallet_address',
            'kyc_status',
            'created_at'
        ]
        read_only_fields = ['user_id', 'created_at']


# =================== WALLET SERIALIZERS ===================

class ConnectWalletSerializer(serializers.Serializer):
    wallet_address = serializers.CharField(max_length=255)

    def create(self, validated_data):
        user = self.context['request'].user
        wallet_address = validated_data['wallet_address']

        # Update wallet address in User table
        user.wallet_address = wallet_address
        user.save()

        # Create or update Wallet table
        wallet, created = Wallet.objects.get_or_create(
            user=user,
            defaults={
                "wallet_address": wallet_address,
                "token_balance": 0
            }
        )

        if not created:
            wallet.wallet_address = wallet_address
            wallet.save()

        return wallet


class WalletSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Wallet
        fields = ['wallet_address', 'user_name', 'token_balance', 'last_synced_block']
        read_only_fields = ['wallet_address', 'last_synced_block']


# =================== PRICING SERIALIZERS ===================

class DynamicPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DynamicPricing
        fields = [
            'timestamp',
            'base_price',
            'demand_supply_factor',
            'renewable_bonus',
            'congestion_factor',
            'time_of_use_multiplier',
            'final_price',
            'grid_zone'
        ]


# =================== ORDER SERIALIZERS ===================

class CreateOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            'order_id',
            'order_type',
            'energy_amount_kwh',
            'price_per_kwh',
            'time_slot_start',
            'time_slot_end'
        ]
        read_only_fields = ['order_id']

    def create(self, validated_data):
        user = self.context['request'].user

        order = Order.objects.create(
            user=user,
            order_type=validated_data['order_type'],
            energy_amount_kwh=validated_data['energy_amount_kwh'],
            price_per_kwh=validated_data['price_per_kwh'],
            time_slot_start=validated_data['time_slot_start'],
            time_slot_end=validated_data['time_slot_end'],
            order_status='OPEN'
        )
        return order


class OrderSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'order_id',
            'user_name',
            'order_type',
            'energy_amount_kwh',
            'price_per_kwh',
            'time_slot_start',
            'time_slot_end',
            'order_status',
            'created_at'
        ]
        read_only_fields = ['order_id', 'user_name', 'created_at']


class ListOrdersSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'order_id',
            'user_name',
            'order_type',
            'energy_amount_kwh',
            'price_per_kwh',
            'order_status',
            'created_at'
        ]


# =================== TRADE MATCH SERIALIZERS ===================

class TradeMatchSerializer(serializers.ModelSerializer):
    buyer_name = serializers.CharField(source='buyer.name', read_only=True)
    seller_name = serializers.CharField(source='seller.name', read_only=True)

    class Meta:
        model = TradeMatch
        fields = [
            'trade_id',
            'buy_order',
            'sell_order',
            'buyer_name',
            'seller_name',
            'energy_amount',
            'trade_price',
            'settlement_status',
            'blockchain_settlement_hash',
            'timestamp'
        ]
        read_only_fields = ['trade_id', 'timestamp']


# =================== ENERGY TOKEN SERIALIZERS ===================

class EnergyTokenTransactionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = EnergyTokenTransaction
        fields = [
            'token_tx_id',
            'user_name',
            'energy_amount_kwh',
            'tokens_minted',
            'tokens_burned',
            'blockchain_tx_hash',
            'timestamp'
        ]
        read_only_fields = ['token_tx_id', 'timestamp']

