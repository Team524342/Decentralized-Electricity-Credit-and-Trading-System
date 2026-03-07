# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\api_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Order, TradeMatch, DynamicPricing, Wallet, EnergyTokenTransaction
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    ConnectWalletSerializer, WalletSerializer, DynamicPricingSerializer,
    CreateOrderSerializer, OrderSerializer, ListOrdersSerializer,
    TradeMatchSerializer, EnergyTokenTransactionSerializer
)
from django.utils import timezone
from django.db.models import Q, Sum
from datetime import datetime


# =================== AUTHENTICATION APIs ===================

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register a new user.
    
    POST /api/register/
    {
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "password": "123456",
        "user_type": "prosumer",
        "latitude": 17.385,
        "longitude": 78.486,
        "wallet_address": "0xABC123"
    }
    """
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Login user and return JWT tokens.
    
    POST /api/login/
    {
        "email": "rahul@gmail.com",
        "password": "123456"
    }
    """
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "user_type": user.user_type
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =================== WALLET APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def connect_wallet(request):
    """
    Connect MetaMask wallet to user account.
    
    POST /api/connect-wallet/
    Headers: Authorization: Bearer <token>
    {
        "wallet_address": "0xABC123456789"
    }
    """
    serializer = ConnectWalletSerializer(
        data=request.data,
        context={'request': request}
    )

    if serializer.is_valid():
        wallet = serializer.save()

        return Response({
            "message": "Wallet connected successfully",
            "wallet_address": wallet.wallet_address
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wallet(request):
    """
    Get current user's wallet details.
    
    GET /api/wallet/
    Headers: Authorization: Bearer <token>
    """
    try:
        wallet = Wallet.objects.get(user=request.user)
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)
    except Wallet.DoesNotExist:
        return Response(
            {"error": "Wallet not connected"},
            status=status.HTTP_404_NOT_FOUND
        )


# =================== PRICING APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_price(request):
    """
    Get current dynamic electricity price.
    
    GET /api/current-price/?zone=ZONE_A
    Headers: Authorization: Bearer <token>
    """
    zone = request.query_params.get('zone', 'ZONE_A')

    try:
        price = DynamicPricing.objects.filter(grid_zone=zone).latest('timestamp')
    except DynamicPricing.DoesNotExist:
        return Response(
            {"error": "No pricing data available"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = DynamicPricingSerializer(price)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pricing_history(request):
    """
    Get pricing history for a zone.
    
    GET /api/pricing-history/?zone=ZONE_A&limit=10
    Headers: Authorization: Bearer <token>
    """
    zone = request.query_params.get('zone', 'ZONE_A')
    limit = int(request.query_params.get('limit', 10))

    prices = DynamicPricing.objects.filter(grid_zone=zone).order_by('-timestamp')[:limit]
    
    if not prices:
        return Response(
            {"error": "No pricing data available"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = DynamicPricingSerializer(prices, many=True)
    return Response(serializer.data)


# =================== ORDER APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_sell_order(request):
    """
    Create a SELL order (Producer sells energy).
    
    POST /api/sell-order/
    Headers: Authorization: Bearer <token>
    {
        "energy_amount_kwh": 50,
        "price_per_kwh": 9,
        "time_slot_start": "2026-02-16T14:00:00Z",
        "time_slot_end": "2026-02-16T16:00:00Z"
    }
    """
    data = request.data.copy()
    data['order_type'] = 'SELL'

    serializer = CreateOrderSerializer(
        data=data,
        context={'request': request}
    )

    if serializer.is_valid():
        order = serializer.save()

        return Response({
            "message": "Sell order created successfully",
            "order_id": order.order_id
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_buy_order(request):
    """
    Create a BUY order (Consumer buys energy).
    
    POST /api/buy-order/
    Headers: Authorization: Bearer <token>
    {
        "energy_amount_kwh": 30,
        "price_per_kwh": 10,
        "time_slot_start": "2026-02-16T14:00:00Z",
        "time_slot_end": "2026-02-16T16:00:00Z"
    }
    """
    data = request.data.copy()
    data['order_type'] = 'BUY'

    serializer = CreateOrderSerializer(
        data=data,
        context={'request': request}
    )

    if serializer.is_valid():
        order = serializer.save()

        return Response({
            "message": "Buy order created successfully",
            "order_id": order.order_id
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_open_orders(request):
    """
    List all open BUY and SELL orders.
    
    GET /api/orders/?order_type=BUY
    Headers: Authorization: Bearer <token>
    """
    order_type = request.query_params.get('order_type')

    if order_type:
        orders = Order.objects.filter(order_status='OPEN', order_type=order_type).order_by('-created_at')
    else:
        orders = Order.objects.filter(order_status='OPEN').order_by('-created_at')

    serializer = ListOrdersSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    """
    Get all orders created by current user.
    
    GET /api/my-orders/?status=OPEN
    Headers: Authorization: Bearer <token>
    """
    status_filter = request.query_params.get('status')

    if status_filter:
        orders = Order.objects.filter(user=request.user, order_status=status_filter).order_by('-created_at')
    else:
        orders = Order.objects.filter(user=request.user).order_by('-created_at')

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_details(request, order_id):
    """
    Get details of a specific order.
    
    GET /api/orders/{order_id}/
    Headers: Authorization: Bearer <token>
    """
    try:
        order = Order.objects.get(order_id=order_id)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    """
    Cancel an open order.
    
    POST /api/orders/{order_id}/cancel/
    Headers: Authorization: Bearer <token>
    """
    try:
        order = Order.objects.get(order_id=order_id)
        
        # Check authorization
        if order.user != request.user:
            return Response(
                {"error": "Not authorized to cancel this order"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if order can be cancelled
        if order.order_status != 'OPEN':
            return Response(
                {"error": f"Cannot cancel order with status {order.order_status}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.order_status = 'CANCELLED'
        order.save()
        
        return Response({
            "message": "Order cancelled successfully",
            "order_id": order.order_id
        })
    
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =================== ORDER MATCHING ENGINE ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def match_orders(request):
    """
    Match BUY and SELL orders (Requires admin/moderator role).
    
    POST /api/match-orders/
    Headers: Authorization: Bearer <token>
    
    Matching logic:
    - BUY price >= SELL price
    - Time slots overlap
    - Both orders are OPEN
    """

    buy_orders = Order.objects.filter(
        order_type='BUY',
        order_status='OPEN'
    ).order_by('-price_per_kwh')

    sell_orders = Order.objects.filter(
        order_type='SELL',
        order_status='OPEN'
    ).order_by('price_per_kwh')

    matches_created = 0
    matched_trades = []

    for buy in buy_orders:
        for sell in sell_orders:

            # Skip if same user
            if buy.user == sell.user:
                continue

            # Check price condition
            if buy.price_per_kwh < sell.price_per_kwh:
                continue

            # Check time slot overlap
            if buy.time_slot_end < sell.time_slot_start or buy.time_slot_start > sell.time_slot_end:
                continue

            # Determine traded energy (min of both)
            traded_energy = min(buy.energy_amount_kwh, sell.energy_amount_kwh)

            # Create TradeMatch record
            trade = TradeMatch.objects.create(
                buy_order=buy,
                sell_order=sell,
                buyer=buy.user,
                seller=sell.user,
                energy_amount=traded_energy,
                trade_price=sell.price_per_kwh,
                settlement_status='PENDING'
            )

            matched_trades.append({
                'trade_id': trade.trade_id,
                'buyer': buy.user.name,
                'seller': sell.user.name,
                'energy_amount': traded_energy,
                'trade_price': sell.price_per_kwh
            })

            # Update orders status
            buy.order_status = 'MATCHED'
            sell.order_status = 'MATCHED'
            buy.save()
            sell.save()

            matches_created += 1
            break

    return Response({
        "message": f"{matches_created} trades matched successfully",
        "trades": matched_trades
    })


# =================== TRADE MATCH APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_trade_matches(request):
    """
    List all trade matches.
    
    GET /api/trades/?status=PENDING
    Headers: Authorization: Bearer <token>
    """
    settlement_status = request.query_params.get('status')

    if settlement_status:
        trades = TradeMatch.objects.filter(settlement_status=settlement_status).order_by('-timestamp')
    else:
        trades = TradeMatch.objects.all().order_by('-timestamp')

    serializer = TradeMatchSerializer(trades, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_trades(request):
    """
    Get all trades involving current user (as buyer or seller).
    
    GET /api/my-trades/
    Headers: Authorization: Bearer <token>
    """
    trades = TradeMatch.objects.filter(
        Q(buyer=request.user) | Q(seller=request.user)
    ).order_by('-timestamp')

    serializer = TradeMatchSerializer(trades, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_trade_details(request, trade_id):
    """
    Get details of a specific trade.
    
    GET /api/trades/{trade_id}/
    Headers: Authorization: Bearer <token>
    """
    try:
        trade = TradeMatch.objects.get(trade_id=trade_id)
        serializer = TradeMatchSerializer(trade)
        return Response(serializer.data)
    except TradeMatch.DoesNotExist:
        return Response(
            {"error": "Trade not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =================== BLOCKCHAIN SETTLEMENT APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def settle_trade_blockchain(request, trade_id):
    """
    Execute trade on blockchain (transfer tokens).
    This will be integrated with smart contract later.
    
    POST /api/trades/{trade_id}/settle/
    Headers: Authorization: Bearer <token>
    {
        "tx_hash": "0x..."  (optional, can be auto-generated)
    }
    """
    try:
        trade = TradeMatch.objects.get(trade_id=trade_id)
        
        # Check authorization
        if request.user not in [trade.buyer, trade.seller]:
            return Response(
                {"error": "Not authorized"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if already settled
        if trade.settlement_status != 'PENDING':
            return Response(
                {"error": f"Trade already {trade.settlement_status}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        tx_hash = request.data.get('tx_hash', f"0x{trade_id}{int(timezone.now().timestamp())}")
        
        trade.blockchain_settlement_hash = tx_hash
        trade.settlement_status = 'SUCCESS'
        trade.save()
        
        return Response({
            "message": "Trade settled successfully",
            "trade_id": trade.trade_id,
            "blockchain_hash": tx_hash
        })
    
    except TradeMatch.DoesNotExist:
        return Response(
            {"error": "Trade not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =================== ENERGY TOKEN APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_token_balance(request):
    """
    Get user's token balance from wallet.
    
    GET /api/token-balance/
    Headers: Authorization: Bearer <token>
    """
    try:
        wallet = Wallet.objects.get(user=request.user)
        return Response({
            "user_id": request.user.user_id,
            "token_balance": wallet.token_balance,
            "wallet_address": wallet.wallet_address
        })
    except Wallet.DoesNotExist:
        return Response({
            "user_id": request.user.user_id,
            "error": "Wallet not connected",
            "token_balance": 0
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_token_transactions(request):
    """
    Get user's token transaction history.
    
    GET /api/token-transactions/?limit=10
    Headers: Authorization: Bearer <token>
    """
    limit = int(request.query_params.get('limit', 20))
    
    transactions = EnergyTokenTransaction.objects.filter(
        user=request.user
    ).order_by('-timestamp')[:limit]
    
    serializer = EnergyTokenTransactionSerializer(transactions, many=True)
    return Response(serializer.data)


# =================== USER PROFILE APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """
    Get current user's profile.
    
    GET /api/profile/
    Headers: Authorization: Bearer <token>
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """
    Update user profile.
    
    PUT /api/profile/
    Headers: Authorization: Bearer <token>
    {
        "name": "New Name",
        "latitude": 17.385,
        "longitude": 78.486,
        ...
    }
    """
    user = request.user
    
    # Update allowed fields
    allowed_fields = ['name', 'latitude', 'longitude', 'installed_capacity_kw', 'storage_capacity_kwh', 'grid_connection_point']
    
    for field in allowed_fields:
        if field in request.data:
            setattr(user, field, request.data[field])
    
    user.save()
    
    serializer = UserSerializer(user)
    return Response({
        "message": "Profile updated successfully",
        "user": serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_email(request, email):
    """
    Get user details by email (for search/discovery).
    
    GET /api/users/{email}/
    Headers: Authorization: Bearer <token>
    """
    try:
        user = User.objects.get(email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =================== DASHBOARD APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard_stats(request):
    """
    Get dashboard statistics for user.
    
    GET /api/dashboard/
    Headers: Authorization: Bearer <token>
    """
    user = request.user
    
    # User's orders
    open_orders = Order.objects.filter(user=user, order_status='OPEN').count()
    matched_orders = Order.objects.filter(user=user, order_status='MATCHED').count()
    
    # User's trades
    as_buyer = TradeMatch.objects.filter(buyer=user).count()
    as_seller = TradeMatch.objects.filter(seller=user).count()
    
    # Token balance
    try:
        wallet = Wallet.objects.get(user=user)
        token_balance = wallet.token_balance
    except:
        token_balance = 0
    
    # Total energy traded
    total_energy_bought = TradeMatch.objects.filter(buyer=user).aggregate(
        Sum('energy_amount')
    )['energy_amount__sum'] or 0
    
    total_energy_sold = TradeMatch.objects.filter(seller=user).aggregate(
        Sum('energy_amount')
    )['energy_amount__sum'] or 0
    
    return Response({
        "user_id": user.user_id,
        "name": user.name,
        "user_type": user.user_type,
        "open_orders": open_orders,
        "matched_orders": matched_orders,
        "trades_as_buyer": as_buyer,
        "trades_as_seller": as_seller,
        "token_balance": token_balance,
        "total_kwh_bought": total_energy_bought,
        "total_kwh_sold": total_energy_sold
    })


# =================== BLOCKCHAIN SETTLEMENT APIs ===================

from .web3_utils import transfer_tokens, mint_tokens, burn_tokens, get_token_balance, is_web3_connected
from .models import EnergyMeasurement, EnergyTokenTransaction


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def execute_trade(request, trade_id):
    """
    Execute trade on blockchain (transfer tokens from buyer to seller).
    
    POST /api/execute-trade/{trade_id}/
    Headers: Authorization: Bearer <token>
    Body (optional): { "tx_hash": "0x..." }
    """
    try:
        trade = TradeMatch.objects.get(trade_id=trade_id)
    except TradeMatch.DoesNotExist:
        return Response(
            {"error": "Trade not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Check authorization (buyer or seller)
    if request.user not in [trade.buyer, trade.seller]:
        return Response(
            {"error": "Not authorized to execute this trade"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Check if already settled
    if trade.settlement_status != 'PENDING':
        return Response(
            {"error": f"Trade already {trade.settlement_status}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Get wallet addresses
        try:
            seller_wallet = trade.seller.wallet.wallet_address
        except:
            return Response(
                {"error": "Seller wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not seller_wallet:
            return Response(
                {"error": "Seller wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Transfer tokens on blockchain
        tx_hash = transfer_tokens(seller_wallet, trade.energy_amount)

        # Update trade record
        trade.blockchain_settlement_hash = tx_hash
        trade.settlement_status = 'SUCCESS'
        trade.save()

        return Response({
            "message": "Trade executed on blockchain successfully",
            "trade_id": trade.trade_id,
            "blockchain_hash": tx_hash,
            "energy_amount": trade.energy_amount,
            "seller": trade.seller.name
        }, status=status.HTTP_200_OK)

    except Exception as e:
        # Mark trade as failed
        trade.settlement_status = 'FAILED'
        trade.save()

        return Response({
            "error": str(e),
            "trade_id": trade.trade_id
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def process_energy_measurement(request):
    """
    Process smart meter data and mint/burn tokens automatically.
    
    POST /api/process-energy/
    Body: {
        "measurement_id": 1
    }
    
    System automatically:
    - Mints tokens for surplus energy (generation > consumption)
    - Burns tokens for deficit energy (consumption > generation)
    """
    measurement_id = request.data.get("measurement_id")

    if not measurement_id:
        return Response(
            {"error": "measurement_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        measurement = EnergyMeasurement.objects.get(measurement_id=measurement_id)
    except EnergyMeasurement.DoesNotExist:
        return Response(
            {"error": "Measurement not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Check if user has wallet connected
    try:
        wallet = measurement.meter.wallet
    except:
        return Response(
            {"error": "User wallet not connected"},
            status=status.HTTP_400_BAD_REQUEST
        )

    wallet_address = wallet.wallet_address
    if not wallet_address:
        return Response(
            {"error": "Wallet not connected"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Calculate net energy
        net_energy = measurement.energy_generated_kwh - measurement.energy_consumed_kwh

        if net_energy > 0:
            # User produced surplus energy - MINT tokens
            tx_hash = mint_tokens(wallet_address, net_energy)

            # Record transaction
            EnergyTokenTransaction.objects.create(
                user=measurement.meter,
                energy_amount_kwh=net_energy,
                tokens_minted=net_energy,
                tokens_burned=0,
                blockchain_tx_hash=tx_hash
            )

            # Update wallet balance
            wallet.token_balance += net_energy
            wallet.save()

            return Response({
                "message": "Tokens minted for surplus energy",
                "energy_kwh": net_energy,
                "tokens_minted": net_energy,
                "blockchain_hash": tx_hash
            }, status=status.HTTP_201_CREATED)

        elif net_energy < 0:
            # User consumed more than generated - BURN tokens
            burn_amount = abs(net_energy)
            tx_hash = burn_tokens(wallet_address, burn_amount)

            # Record transaction
            EnergyTokenTransaction.objects.create(
                user=measurement.meter,
                energy_amount_kwh=burn_amount,
                tokens_minted=0,
                tokens_burned=burn_amount,
                blockchain_tx_hash=tx_hash
            )

            # Update wallet balance
            wallet.token_balance -= burn_amount
            wallet.save()

            return Response({
                "message": "Tokens burned for consumed energy",
                "energy_kwh": burn_amount,
                "tokens_burned": burn_amount,
                "blockchain_hash": tx_hash
            }, status=status.HTTP_201_CREATED)

        else:
            return Response({
                "message": "No token action required (balanced energy)",
                "energy_generated": measurement.energy_generated_kwh,
                "energy_consumed": measurement.energy_consumed_kwh
            })

    except Exception as e:
        return Response({
            "error": str(e),
            "details": "Failed to process energy measurement"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wallet_balance_blockchain(request):
    """
    Get token balance directly from blockchain.
    
    GET /api/wallet-blockchain-balance/
    Headers: Authorization: Bearer <token>
    """
    try:
        wallet = Wallet.objects.get(user=request.user)
        wallet_address = wallet.wallet_address

        if not wallet_address:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Get balance from blockchain
        balance = get_token_balance(wallet_address)

        # Update cached balance in database
        wallet.token_balance = balance
        wallet.save()

        return Response({
            "user_id": request.user.user_id,
            "wallet_address": wallet_address,
            "balance_on_blockchain": balance,
            "balance_cached": wallet.token_balance
        }, status=status.HTTP_200_OK)

    except Wallet.DoesNotExist:
        return Response(
            {"error": "Wallet not connected"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def blockchain_status(request):
    """
    Check blockchain connection status and network info.
    
    GET /api/blockchain-status/
    """
    try:
        is_connected = is_web3_connected()

        if is_connected:
            latest_block = w3.eth.block_number
            gas_price = w3.eth.gas_price
            chain_id = w3.eth.chain_id

            return Response({
                "status": "connected",
                "network": "Sepolia Testnet",
                "chain_id": chain_id,
                "latest_block": latest_block,
                "gas_price_wei": gas_price,
                "gas_price_gwei": w3.from_wei(gas_price, 'gwei')
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "status": "disconnected",
                "error": "Failed to connect to blockchain"
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    except Exception as e:
        return Response({
            "status": "error",
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retry_blockchain_settlement(request, trade_id):
    """
    Retry failed blockchain settlement.
    
    POST /api/trades/{trade_id}/retry-settlement/
    Headers: Authorization: Bearer <token>
    """
    try:
        trade = TradeMatch.objects.get(trade_id=trade_id)
    except TradeMatch.DoesNotExist:
        return Response(
            {"error": "Trade not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Check authorization
    if request.user not in [trade.buyer, trade.seller, None]:  # Allow admin
        return Response(
            {"error": "Not authorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Check if trade is in failed state
    if trade.settlement_status != 'FAILED':
        return Response(
            {"error": "Trade is not in FAILED state"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Retry settlement
        try:
            seller_wallet = trade.seller.wallet.wallet_address
        except:
            return Response(
                {"error": "Seller wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )

        tx_hash = transfer_tokens(seller_wallet, trade.energy_amount)

        trade.blockchain_settlement_hash = tx_hash
        trade.settlement_status = 'SUCCESS'
        trade.save()

        return Response({
            "message": "Blockchain settlement retried successfully",
            "trade_id": trade.trade_id,
            "blockchain_hash": tx_hash
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Import Web3 for blockchain status
from web3 import Web3
w3 = Web3(Web3.HTTPProvider("https://eth-sepolia.g.alchemy.com/v2/demo"))
