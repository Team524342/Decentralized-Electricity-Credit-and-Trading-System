# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\models.py
from django.db import models
from django.contrib.auth.hashers import make_password, check_password


from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):

    USER_TYPE_CHOICES = [
        ('prosumer', 'Prosumer'),
        ('consumer', 'Consumer'),
        ('storage', 'Storage Owner'),
        ('grid_operator', 'Grid Operator'),
        ('admin', 'Admin'),
    ]

    KYC_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]

    # Primary Key
    user_id = models.AutoField(primary_key=True)

    # Basic Info
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    # Role in energy network
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)

    # Location info (important for local energy trading)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    grid_connection_point = models.CharField(max_length=255, null=True, blank=True)

    # Energy capacity
    installed_capacity_kw = models.FloatField(null=True, blank=True)   # Solar panels capacity
    storage_capacity_kwh = models.FloatField(null=True, blank=True)    # Battery capacity

    # KYC & Wallet
    kyc_status = models.CharField(max_length=20, choices=KYC_STATUS_CHOICES, default='pending')
    wallet_address = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # ---------------- Password Handling ----------------
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.name} ({self.user_type})"

    class Meta:
        db_table = "users"


class Order(models.Model):

    ORDER_TYPE_CHOICES = [
        ('BUY', 'Buy Energy'),
        ('SELL', 'Sell Energy'),
    ]

    ORDER_STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('MATCHED', 'Matched'),
        ('CANCELLED', 'Cancelled'),
    ]

    order_id = models.AutoField(primary_key=True)

    # Link order to user (who created the order)
    user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        db_column='user_id',
        related_name='orders'
    )

    # Order details
    order_type = models.CharField(max_length=10, choices=ORDER_TYPE_CHOICES)
    energy_amount_kwh = models.FloatField()
    price_per_kwh = models.FloatField()

    # Delivery time slot of electricity
    time_slot_start = models.DateTimeField()
    time_slot_end = models.DateTimeField()

    # Order state in marketplace
    order_status = models.CharField(
        max_length=15,
        choices=ORDER_STATUS_CHOICES,
        default='OPEN'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order_type} - {self.energy_amount_kwh} kWh by {self.user.name}"

    class Meta:
        db_table = "orders"

class TradeMatch(models.Model):

    SETTLEMENT_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    ]

    trade_id = models.AutoField(primary_key=True)

    # Orders that were matched
    buy_order = models.ForeignKey(
        'Order',
        on_delete=models.CASCADE,
        related_name='buy_trades',
        db_column='buy_order_id'
    )

    sell_order = models.ForeignKey(
        'Order',
        on_delete=models.CASCADE,
        related_name='sell_trades',
        db_column='sell_order_id'
    )

    # Buyer & Seller
    buyer = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='purchases',
        db_column='buyer_id'
    )

    seller = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='sales',
        db_column='seller_id'
    )

    # Trade details
    energy_amount = models.FloatField()      # kWh traded
    trade_price = models.FloatField()        # final price per kWh

    # Blockchain settlement info
    blockchain_settlement_hash = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    settlement_status = models.CharField(
        max_length=20,
        choices=SETTLEMENT_STATUS_CHOICES,
        default='PENDING'
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Trade {self.trade_id}: {self.energy_amount} kWh"

    class Meta:
        db_table = "trade_matches"


class EnergyTokenTransaction(models.Model):

    token_tx_id = models.AutoField(primary_key=True)

    # Which user received/burned tokens
    user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='token_transactions',
        db_column='user_id'
    )

    # Energy converted to tokens
    energy_amount_kwh = models.FloatField()

    # Token movement
    tokens_minted = models.FloatField(default=0)   # when solar energy produced
    tokens_burned = models.FloatField(default=0)   # when energy consumed

    # Blockchain TX hash (mint/burn smart contract call)
    blockchain_tx_hash = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - Minted:{self.tokens_minted} Burned:{self.tokens_burned}"

    class Meta:
        db_table = "energy_tokens"



class EnergyMeasurement(models.Model):

    measurement_id = models.AutoField(primary_key=True)

    # Meter belongs to a user (home/building/plant)
    meter = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='energy_measurements',
        db_column='meter_id'
    )

    timestamp = models.DateTimeField()

    # Energy data from smart meter
    energy_generated_kwh = models.FloatField(default=0)   # solar generation
    energy_consumed_kwh = models.FloatField(default=0)    # usage from grid
    battery_charge_level = models.FloatField(null=True, blank=True)  # %

    def __str__(self):
        return f"{self.meter.name} - {self.timestamp}"

    class Meta:
        db_table = "energy_measurements"

class Wallet(models.Model):

    wallet_address = models.CharField(primary_key=True, max_length=255)

    user = models.OneToOneField(
        'User',
        on_delete=models.CASCADE,
        related_name='wallet',
        db_column='user_id'
    )

    # Cached balance from blockchain
    token_balance = models.FloatField(default=0)

    # Last synced blockchain block number
    last_synced_block = models.BigIntegerField(default=0)

    def __str__(self):
        return f"{self.user.name} Wallet"

    class Meta:
        db_table = "wallets"

class DynamicPricing(models.Model):

    PRICING_ZONE_CHOICES = [
        ('ZONE_A', 'Zone A'),
        ('ZONE_B', 'Zone B'),
        ('ZONE_C', 'Zone C'),
    ]

    timestamp = models.DateTimeField()

    # Base electricity price from grid/API
    base_price = models.FloatField()

    # AI / Algorithm factors
    demand_supply_factor = models.FloatField()
    renewable_bonus = models.FloatField()
    congestion_factor = models.FloatField()
    time_of_use_multiplier = models.FloatField()

    # Final calculated market price per kWh
    final_price = models.FloatField()

    # Location based pricing
    grid_zone = models.CharField(max_length=20, choices=PRICING_ZONE_CHOICES)

    def __str__(self):
        return f"{self.grid_zone} - {self.final_price} ₹/kWh"

    class Meta:
        db_table = "dynamic_pricing"
        get_latest_by = "timestamp"
  



class MonthlyBilling(models.Model):
    PAYMENT_STAUS_CHOICES=[

        ('PENDING','pending'),
        ('PAID','paid'),
        ('FAILED','failed'),
    ]
    bill_id=models.AutoField(primary_key=True)
    user=models.ForeignKey('User',on_delete=models.CASCADE,related_name='bills',db_column='user_id')
    grid_energy_used_kwh=models.FloatField()
    base_bill_amount=models.FloatField()
    tokens_redeemed=models.FloatField(default=0)
    token_value_rs=models.FloatField(default=0)
    final_bill_amount=models.FloatField()
    payment_status=models.CharField(max_length=15,choices=PAYMENT_STAUS_CHOICES,default="PENDING")
    def __str__(self):
        return f"{self.user.name} -{self.bill_id}"
    class Meta:
        db_table="monthly_billing" 

