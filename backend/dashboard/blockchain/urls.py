"""
Blockchain App URLs
Routes for blockchain integration endpoints
"""

from django.urls import path
from .views import (
    submit_energy_api,
    get_energy_records_api,
    list_tokens_api,
    buy_tokens_api,
    cancel_listing_api,
    get_marketplace_listings_api,
    redeem_tokens_api,
    get_billing_history_api,
    blockchain_status_api
)

urlpatterns = [
    # Energy Credit
    path('submit-energy/', submit_energy_api, name='submit_energy'),
    path('energy-records/', get_energy_records_api, name='get_energy_records'),
    
    # Marketplace
    path('list-tokens/', list_tokens_api, name='list_tokens'),
    path('buy-tokens/', buy_tokens_api, name='buy_tokens'),
    path('cancel-listing/', cancel_listing_api, name='cancel_listing'),
    path('marketplace-listings/', get_marketplace_listings_api, name='get_listings'),
    
    # Billing
    path('redeem-tokens-billing/', redeem_tokens_api, name='redeem_tokens'),
    path('billing-history/', get_billing_history_api, name='get_billing_history'),
    
    # Status
    path('status/', blockchain_status_api, name='blockchain_status'),
]
