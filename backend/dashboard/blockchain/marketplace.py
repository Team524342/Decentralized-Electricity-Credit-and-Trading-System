"""
Marketplace Contract Service
Handles token listings and purchases
"""

import json
import os
from web3 import Web3
from utils.web3_service import web3, PRIVATE_KEY, sign_and_send_transaction
from dotenv import load_dotenv

load_dotenv()

MARKETPLACE_ADDRESS = os.getenv("MARKETPLACE_ADDRESS")
ADMIN_WALLET = os.getenv("ADMIN_WALLET")

# Load Marketplace ABI
abi_path = os.path.join(
    os.path.dirname(__file__),
    "abi",
    "EnergyMarketplace.json"
)

try:
    with open(abi_path, 'r') as f:
        MARKETPLACE_ABI = json.load(f)
except FileNotFoundError:
    MARKETPLACE_ABI = []
    print(f"⚠️ ABI file not found: {abi_path}")

# Initialize contract
if MARKETPLACE_ADDRESS:
    marketplace_contract = web3.eth.contract(
        address=Web3.to_checksum_address(MARKETPLACE_ADDRESS),
        abi=MARKETPLACE_ABI
    )
else:
    marketplace_contract = None
    print("⚠️ MARKETPLACE_ADDRESS not set in .env")


# =================== MARKETPLACE FUNCTIONS ===================

def list_tokens(seller_address, token_amount, price_per_token):
    """
    List tokens for sale on marketplace
    
    Args:
        seller_address: Seller's wallet address
        token_amount: Number of tokens to list
        price_per_token: Price in wei per token
    
    Returns:
        Transaction hash
    """
    if not marketplace_contract:
        raise Exception("Marketplace contract not initialized")
    
    seller_address = Web3.to_checksum_address(seller_address)
    admin_wallet = Web3.to_checksum_address(ADMIN_WALLET)
    
    nonce = web3.eth.get_transaction_count(admin_wallet)
    
    txn = marketplace_contract.functions.listTokens(
        int(token_amount),
        int(price_per_token)
    ).build_transaction({
        'from': admin_wallet,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': web3.to_wei('20', 'gwei')
    })
    
    tx_hash = sign_and_send_transaction(txn, PRIVATE_KEY)
    
    return tx_hash


def buy_tokens(listing_id, eth_value):
    """
    Purchase tokens from marketplace
    
    Args:
        listing_id: ID of the listing
        eth_value: ETH value to send (in ether)
    
    Returns:
        Transaction hash
    """
    if not marketplace_contract:
        raise Exception("Marketplace contract not initialized")
    
    admin_wallet = Web3.to_checksum_address(ADMIN_WALLET)
    
    nonce = web3.eth.get_transaction_count(admin_wallet)
    
    txn = marketplace_contract.functions.buyTokens(
        int(listing_id)
    ).build_transaction({
        'from': admin_wallet,
        'value': web3.to_wei(eth_value, 'ether'),
        'nonce': nonce,
        'gas': 300000,
        'gasPrice': web3.to_wei('20', 'gwei')
    })
    
    tx_hash = sign_and_send_transaction(txn, PRIVATE_KEY)
    
    return tx_hash


def cancel_listing(listing_id):
    """
    Cancel a marketplace listing
    
    Args:
        listing_id: ID of the listing to cancel
    
    Returns:
        Transaction hash
    """
    if not marketplace_contract:
        raise Exception("Marketplace contract not initialized")
    
    admin_wallet = Web3.to_checksum_address(ADMIN_WALLET)
    
    nonce = web3.eth.get_transaction_count(admin_wallet)
    
    txn = marketplace_contract.functions.cancelListing(
        int(listing_id)
    ).build_transaction({
        'from': admin_wallet,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': web3.to_wei('20', 'gwei')
    })
    
    tx_hash = sign_and_send_transaction(txn, PRIVATE_KEY)
    
    return tx_hash


def get_listing(listing_id):
    """
    Get listing details
    
    Args:
        listing_id: ID of the listing
    
    Returns:
        Listing struct data
    """
    if not marketplace_contract:
        raise Exception("Marketplace contract not initialized")
    
    try:
        listing = marketplace_contract.functions.listings(
            int(listing_id)
        ).call()
        return listing
    except Exception as e:
        print(f"Error fetching listing: {e}")
        return None


def get_listing_count():
    """Get total number of listings"""
    if not marketplace_contract:
        raise Exception("Marketplace contract not initialized")
    
    try:
        count = marketplace_contract.functions.listingCount().call()
        return count
    except Exception as e:
        print(f"Error fetching listing count: {e}")
        return 0
