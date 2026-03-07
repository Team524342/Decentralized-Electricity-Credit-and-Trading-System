"""
Blockchain Admin Registration
Register blockchain-related models in Django admin
"""

from django.contrib import admin
from dashboard.models import (
    EnergyTokenTransaction, EnergyMeasurement
)


@admin.register(EnergyTokenTransaction)
class EnergyTokenTransactionAdmin(admin.ModelAdmin):
    list_display = (
        'token_tx_id', 'user', 'energy_amount_kwh',
        'tokens_minted', 'tokens_burned', 'blockchain_tx_hash', 'timestamp'
    )
    list_filter = ('timestamp', 'user')
    search_fields = ('user__name', 'blockchain_tx_hash')
    readonly_fields = ('timestamp', 'blockchain_tx_hash')


@admin.register(EnergyMeasurement)
class EnergyMeasurementAdmin(admin.ModelAdmin):
    list_display = (
        'measurement_id', 'meter', 'energy_generated_kwh',
        'energy_consumed_kwh', 'battery_charge_level', 'timestamp'
    )
    list_filter = ('timestamp', 'meter')
    search_fields = ('meter__name',)
    readonly_fields = ('timestamp',)
