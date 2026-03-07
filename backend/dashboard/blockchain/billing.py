"""
Billing Manager Contract Service
Handles token redemption for bill deduction
"""

import json
import os
from web3 import Web3
from utils.web3_service import web3, PRIVATE_KEY, sign_and_send_transaction
from dotenv import load_dotenv

load_dotenv()

BILLING_ADDRESS = os.getenv("BILLING_ADDRESS")
ADMIN_WALLET = os.getenv("ADMIN_WALLET")

# Load BillingManager ABI
abi_path = os.path.join(
    os.path.dirname(__file__),
    "abi",
    "BillingManager.json"
)

try:
    with open(abi_path, 'r') as f:
        BILLING_ABI = json.load(f)
except FileNotFoundError:
    BILLING_ABI = []
    print(f"⚠️ ABI file not found: {abi_path}")

# Initialize contract
if BILLING_ADDRESS:
    billing_contract = web3.eth.contract(
        address=Web3.to_checksum_address(BILLING_ADDRESS),
        abi=BILLING_ABI
    )
else:
    billing_contract = None
    print("⚠️ BILLING_ADDRESS not set in .env")


# =================== BILLING FUNCTIONS ===================

def redeem_tokens(user_wallet, bill_amount, token_amount):
    """
    Redeem tokens to reduce electricity bill
    
    Args:
        user_wallet: User's wallet address
        bill_amount: Total bill amount (in wei or smallest unit)
        token_amount: Tokens to redeem (in wei)
    
    Returns:
        Transaction hash
    """
    if not billing_contract:
        raise Exception("Billing contract not initialized")
    
    user_wallet = Web3.to_checksum_address(user_wallet)
    admin_wallet = Web3.to_checksum_address(ADMIN_WALLET)
    
    nonce = web3.eth.get_transaction_count(admin_wallet)
    
    txn = billing_contract.functions.redeemTokens(
        user_wallet,
        int(bill_amount),
        int(token_amount)
    ).build_transaction({
        'from': admin_wallet,
        'nonce': nonce,
        'gas': 300000,
        'gasPrice': web3.to_wei('20', 'gwei')
    })
    
    tx_hash = sign_and_send_transaction(txn, PRIVATE_KEY)
    
    return tx_hash


def get_user_bills(user_wallet):
    """
    Get all bills for a user
    
    Args:
        user_wallet: User's wallet address
    
    Returns:
        List of Bill structs
    """
    if not billing_contract:
        raise Exception("Billing contract not initialized")
    
    user_wallet = Web3.to_checksum_address(user_wallet)
    
    try:
        bills = billing_contract.functions.getBills(
            user_wallet
        ).call()
        return bills
    except Exception as e:
        print(f"Error fetching bills: {e}")
        return []


def calculate_final_bill(bill_amount, tokens_redeemed):
    """
    Calculate final bill amount after token deduction
    
    Args:
        bill_amount: Original bill amount
        tokens_redeemed: Tokens redeemed
    
    Returns:
        Final bill amount
    """
    final_amount = max(0, bill_amount - tokens_redeemed)
    return final_amount


def get_admin():
    """Get billing contract admin"""
    if not billing_contract:
        raise Exception("Billing contract not initialized")
    
    try:
        admin = billing_contract.functions.admin().call()
        return admin
    except Exception as e:
        print(f"Error fetching admin: {e}")
        return None
