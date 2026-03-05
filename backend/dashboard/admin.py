from django.contrib import admin
from .models import (
    User, Wallet, Order, TradeMatch,
    EnergyTokenTransaction, EnergyMeasurement,
    DynamicPricing, MonthlyBilling
)


# =================== User Admin Panel ===================

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("user_id", "name", "email", "user_type", "kyc_status", "wallet_address", "created_at")
    list_filter = ("user_type", "kyc_status", "created_at")
    search_fields = ("name", "email", "wallet_address")
    readonly_fields = ("user_id", "created_at")
    
    fieldsets = (
        ("Basic Info", {
            'fields': ('user_id', 'name', 'email', 'password')
        }),
        ("Role & Location", {
            'fields': ('user_type', 'latitude', 'longitude', 'grid_connection_point')
        }),
        ("Energy Capacity", {
            'fields': ('installed_capacity_kw', 'storage_capacity_kwh')
        }),
        ("Blockchain & KYC", {
            'fields': ('wallet_address', 'kyc_status')
        }),
        ("Metadata", {
            'fields': ('created_at',)
        }),
    )


# =================== Wallet Admin ===================

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ("wallet_address", "user", "token_balance", "last_synced_block")
    list_filter = ("user",)
    search_fields = ("wallet_address", "user__name", "user__email")
    readonly_fields = ("wallet_address",)
    
    fieldsets = (
        ("Wallet Info", {
            'fields': ('wallet_address', 'user')
        }),
        ("Balance & Sync", {
            'fields': ('token_balance', 'last_synced_block')
        }),
    )


# =================== Order Admin ===================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_id", "user", "order_type", "energy_amount_kwh",
                    "price_per_kwh", "order_status", "created_at")
    list_filter = ("order_type", "order_status", "created_at")
    search_fields = ("user__name", "user__email")
    readonly_fields = ("order_id", "created_at")
    
    fieldsets = (
        ("Order Info", {
            'fields': ('order_id', 'user', 'order_type', 'order_status')
        }),
        ("Energy Details", {
            'fields': ('energy_amount_kwh', 'price_per_kwh')
        }),
        ("Time Slot", {
            'fields': ('time_slot_start', 'time_slot_end')
        }),
        ("Metadata", {
            'fields': ('created_at',)
        }),
    )


# =================== Trade Matches Admin ===================

@admin.register(TradeMatch)
class TradeMatchAdmin(admin.ModelAdmin):
    list_display = ("trade_id", "buyer", "seller", "energy_amount",
                    "trade_price", "settlement_status", "timestamp")
    list_filter = ("settlement_status", "timestamp")
    search_fields = ("buyer__name", "seller__name", "blockchain_settlement_hash")
    readonly_fields = ("trade_id", "timestamp")
    
    fieldsets = (
        ("Trade Parties", {
            'fields': ('trade_id', 'buyer', 'seller', 'buy_order', 'sell_order')
        }),
        ("Trade Details", {
            'fields': ('energy_amount', 'trade_price')
        }),
        ("Settlement", {
            'fields': ('settlement_status', 'blockchain_settlement_hash')
        }),
        ("Metadata", {
            'fields': ('timestamp',)
        }),
    )


# =================== Energy Token Transactions Admin ===================

@admin.register(EnergyTokenTransaction)
class TokenTxAdmin(admin.ModelAdmin):
    list_display = ("token_tx_id", "user", "energy_amount_kwh", "tokens_minted",
                    "tokens_burned", "blockchain_tx_hash", "timestamp")
    list_filter = ("timestamp",)
    search_fields = ("user__name", "user__email", "blockchain_tx_hash")
    readonly_fields = ("token_tx_id", "timestamp")
    
    fieldsets = (
        ("User & Energy", {
            'fields': ('token_tx_id', 'user', 'energy_amount_kwh')
        }),
        ("Tokens", {
            'fields': ('tokens_minted', 'tokens_burned')
        }),
        ("Blockchain", {
            'fields': ('blockchain_tx_hash',)
        }),
        ("Metadata", {
            'fields': ('timestamp',)
        }),
    )


# =================== Smart Meter Data Admin ===================

@admin.register(EnergyMeasurement)
class EnergyMeasurementAdmin(admin.ModelAdmin):
    list_display = ("measurement_id", "meter", "energy_generated_kwh",
                    "energy_consumed_kwh", "battery_charge_level", "timestamp")
    list_filter = ("timestamp",)
    search_fields = ("meter__name", "meter__email")
    readonly_fields = ("measurement_id", "timestamp")
    
    fieldsets = (
        ("Meter Info", {
            'fields': ('measurement_id', 'meter', 'timestamp')
        }),
        ("Energy Data", {
            'fields': ('energy_generated_kwh', 'energy_consumed_kwh', 'battery_charge_level')
        }),
    )


# =================== Dynamic Pricing Admin ===================

@admin.register(DynamicPricing)
class PricingAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "grid_zone", "final_price",
                    "base_price", "demand_supply_factor", "congestion_factor")
    list_filter = ("grid_zone", "timestamp")
    readonly_fields = ("timestamp",)
    
    fieldsets = (
        ("Price Info", {
            'fields': ('timestamp', 'grid_zone', 'final_price')
        }),
        ("Price Factors", {
            'fields': (
                'base_price',
                'demand_supply_factor',
                'renewable_bonus',
                'congestion_factor',
                'time_of_use_multiplier'
            )
        }),
    )


# =================== Monthly Billing Admin ===================

@admin.register(MonthlyBilling)
class BillingAdmin(admin.ModelAdmin):
    list_display = ("bill_id", "user", "grid_energy_used_kwh",
                    "base_bill_amount", "tokens_redeemed",
                    "final_bill_amount", "payment_status")
    list_filter = ("payment_status",)
    search_fields = ("user__name", "user__email")
    readonly_fields = ("bill_id",)
    
    fieldsets = (
        ("Bill Info", {
            'fields': ('bill_id', 'user', 'payment_status')
        }),
        ("Energy & Charges", {
            'fields': ('grid_energy_used_kwh', 'base_bill_amount')
        }),
        ("Token Redemption", {
            'fields': ('tokens_redeemed', 'token_value_rs')
        }),
        ("Final Amount", {
            'fields': ('final_bill_amount',)
        }),
    )
