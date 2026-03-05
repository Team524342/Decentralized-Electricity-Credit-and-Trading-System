# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\urls.py
from django.urls import path
from . import api_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # =================== AUTHENTICATION ===================
    path('register/', api_views.register_user, name='register'),
    path('login/', api_views.login_user, name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # =================== WALLET ===================
    path('connect-wallet/', api_views.connect_wallet, name='connect_wallet'),
    path('wallet/', api_views.get_wallet, name='get_wallet'),
    
    # =================== PRICING ===================
    path('current-price/', api_views.get_current_price, name='get_current_price'),
    path('pricing-history/', api_views.get_pricing_history, name='get_pricing_history'),
    
    # =================== ORDERS ===================
    path('sell-order/', api_views.create_sell_order, name='create_sell_order'),
    path('buy-order/', api_views.create_buy_order, name='create_buy_order'),
    path('orders/', api_views.list_open_orders, name='list_open_orders'),
    path('orders/<int:order_id>/', api_views.get_order_details, name='get_order_details'),
    path('orders/<int:order_id>/cancel/', api_views.cancel_order, name='cancel_order'),
    path('my-orders/', api_views.get_user_orders, name='get_user_orders'),
    
    # =================== ORDER MATCHING ===================
    path('match-orders/', api_views.match_orders, name='match_orders'),
    
    # =================== TRADES ===================
    path('trades/', api_views.list_trade_matches, name='list_trade_matches'),
    path('trades/<int:trade_id>/', api_views.get_trade_details, name='get_trade_details'),
    path('trades/<int:trade_id>/settle/', api_views.settle_trade_blockchain, name='settle_trade'),
    path('my-trades/', api_views.get_user_trades, name='get_user_trades'),
    
    # =================== TOKENS ===================
    path('token-balance/', api_views.get_user_token_balance, name='get_token_balance'),
    path('token-transactions/', api_views.get_token_transactions, name='get_token_transactions'),
    
    # =================== USER PROFILE ===================
    path('profile/', api_views.get_user_profile, name='get_user_profile'),
    path('profile/update/', api_views.update_user_profile, name='update_user_profile'),
    path('users/<str:email>/', api_views.get_user_by_email, name='get_user_by_email'),
    
    # =================== DASHBOARD ===================
    path('dashboard/', api_views.get_dashboard_stats, name='get_dashboard_stats'),
    
    # =================== BLOCKCHAIN ===================
    path('execute-trade/<int:trade_id>/', api_views.execute_trade, name='execute_trade'),
    path('process-energy/', api_views.process_energy_measurement, name='process_energy'),
    path('wallet-blockchain-balance/', api_views.get_wallet_balance_blockchain, name='wallet_blockchain_balance'),
    path('blockchain-status/', api_views.blockchain_status, name='blockchain_status'),
    path('trades/<int:trade_id>/retry-settlement/', api_views.retry_blockchain_settlement, name='retry_settlement'),
]

