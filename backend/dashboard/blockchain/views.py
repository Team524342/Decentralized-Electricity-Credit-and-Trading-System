"""
Blockchain API Views
Endpoints for energy credit submission, marketplace, and billing
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from dashboard.blockchain.energy_credit import (
    submit_energy, get_user_records, calculate_reward
)
from dashboard.blockchain.marketplace import (
    list_tokens, buy_tokens, cancel_listing, get_listing, get_listing_count
)
from dashboard.blockchain.billing import (
    redeem_tokens, get_user_bills, calculate_final_bill
)
from dashboard.models import Wallet, EnergyTokenTransaction, Order, TradeMatch
from django.utils import timezone


# =================== ENERGY CREDIT APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_energy_api(request):
    """
    Submit produced energy to blockchain
    Mints tokens automatically
    
    POST /api/blockchain/submit-energy/
    {
        "units": 50
    }
    """
    try:
        user = request.user
        units = float(request.data.get('units', 0))
        
        if units <= 0:
            return Response(
                {"error": "Units must be greater than 0"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user has wallet
        try:
            wallet = Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Submit to blockchain
        tx_hash = submit_energy(wallet.wallet_address, units)
        
        # Record in database
        reward = calculate_reward(units)
        EnergyTokenTransaction.objects.create(
            user=user,
            energy_amount_kwh=units,
            tokens_minted=units,
            blockchain_tx_hash=tx_hash
        )
        
        return Response({
            "message": "Energy submitted successfully",
            "units": units,
            "tokens_minted": units,
            "tx_hash": tx_hash
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_energy_records_api(request):
    """
    Get user's energy production records from blockchain
    
    GET /api/blockchain/energy-records/
    """
    try:
        user = request.user
        
        try:
            wallet = Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        records = get_user_records(wallet.wallet_address)
        
        return Response({
            "user": user.name,
            "wallet": wallet.wallet_address,
            "records": records
        })
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# =================== MARKETPLACE APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def list_tokens_api(request):
    """
    List tokens for sale on marketplace
    
    POST /api/blockchain/list-tokens/
    {
        "token_amount": 50,
        "price_per_token": "1000000000000000000"
    }
    """
    try:
        user = request.user
        token_amount = float(request.data.get('token_amount', 0))
        price_per_token = int(request.data.get('price_per_token', 0))
        
        if token_amount <= 0:
            return Response(
                {"error": "Token amount must be greater than 0"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            wallet = Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # List tokens on marketplace
        tx_hash = list_tokens(wallet.wallet_address, token_amount, price_per_token)
        
        return Response({
            "message": "Tokens listed successfully",
            "token_amount": token_amount,
            "price_per_token": price_per_token,
            "tx_hash": tx_hash
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_tokens_api(request):
    """
    Buy tokens from marketplace
    
    POST /api/blockchain/buy-tokens/
    {
        "listing_id": 1,
        "eth_value": "0.5"
    }
    """
    try:
        listing_id = int(request.data.get('listing_id', 0))
        eth_value = float(request.data.get('eth_value', 0))
        
        if listing_id <= 0:
            return Response(
                {"error": "Invalid listing ID"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Buy tokens
        tx_hash = buy_tokens(listing_id, eth_value)
        
        return Response({
            "message": "Tokens purchased successfully",
            "listing_id": listing_id,
            "eth_value": eth_value,
            "tx_hash": tx_hash
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_listing_api(request):
    """
    Cancel a marketplace listing
    
    POST /api/blockchain/cancel-listing/
    {
        "listing_id": 1
    }
    """
    try:
        listing_id = int(request.data.get('listing_id', 0))
        
        if listing_id <= 0:
            return Response(
                {"error": "Invalid listing ID"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        tx_hash = cancel_listing(listing_id)
        
        return Response({
            "message": "Listing cancelled successfully",
            "listing_id": listing_id,
            "tx_hash": tx_hash
        })
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_marketplace_listings_api(request):
    """
    Get all active marketplace listings
    
    GET /api/blockchain/marketplace-listings/
    """
    try:
        listing_count = get_listing_count()
        listings = []
        
        for i in range(1, listing_count + 1):
            listing = get_listing(i)
            if listing and listing[4]:  # Check if active
                listings.append({
                    "id": listing[0],
                    "seller": listing[1],
                    "token_amount": listing[2],
                    "price": listing[3],
                    "active": listing[4]
                })
        
        return Response({
            "total_listings": len(listings),
            "listings": listings
        })
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# =================== BILLING APIs ===================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def redeem_tokens_api(request):
    """
    Redeem tokens to reduce electricity bill
    
    POST /api/blockchain/redeem-tokens-billing/
    {
        "bill_amount": 1200,
        "token_amount": 300
    }
    """
    try:
        user = request.user
        bill_amount = int(request.data.get('bill_amount', 0))
        token_amount = int(request.data.get('token_amount', 0))
        
        if bill_amount <= 0 or token_amount <= 0:
            return Response(
                {"error": "Amounts must be greater than 0"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            wallet = Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Redeem tokens
        tx_hash = redeem_tokens(wallet.wallet_address, bill_amount, token_amount)
        
        # Calculate final bill
        final_bill = calculate_final_bill(bill_amount, token_amount)
        
        return Response({
            "message": "Tokens redeemed successfully",
            "original_bill": bill_amount,
            "tokens_redeemed": token_amount,
            "final_bill": final_bill,
            "savings": token_amount,
            "tx_hash": tx_hash
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_billing_history_api(request):
    """
    Get user's billing history from blockchain
    
    GET /api/blockchain/billing-history/
    """
    try:
        user = request.user
        
        try:
            wallet = Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            return Response(
                {"error": "Wallet not connected"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        bills = get_user_bills(wallet.wallet_address)
        
        formatted_bills = []
        for bill in bills:
            formatted_bills.append({
                "units_used": bill[0],
                "bill_amount": bill[1],
                "tokens_redeemed": bill[2],
                "final_amount": bill[3],
                "timestamp": bill[4]
            })
        
        return Response({
            "user": user.name,
            "wallet": wallet.wallet_address,
            "billing_history": formatted_bills
        })
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# =================== BLOCKCHAIN STATUS APIs ===================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def blockchain_status_api(request):
    """
    Get blockchain connection status
    
    GET /api/blockchain/status/
    """
    from utils.web3_service import web3
    
    try:
        is_connected = web3.is_connected()
        block_number = web3.eth.block_number if is_connected else None
        
        return Response({
            "status": "connected" if is_connected else "disconnected",
            "block_number": block_number,
            "network": "Sepolia Testnet"
        })
    
    except Exception as e:
        return Response(
            {"error": str(e), "status": "error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
