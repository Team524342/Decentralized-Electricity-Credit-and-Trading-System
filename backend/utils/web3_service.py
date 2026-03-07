"""
Web3 Connection Service
Handles Ethereum Sepolia connection and account setup
"""

import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

# Sepolia RPC endpoint
RPC_URL = os.getenv("SEPOLIA_RPC", "https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY")

# Initialize Web3 instance
web3 = Web3(Web3.HTTPProvider(RPC_URL))

# Verify connection
if web3.is_connected():
    print("✅ Blockchain Connected to Sepolia")
else:
    print("❌ Blockchain Connection Failed")

# Load admin account
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
ADMIN_WALLET = os.getenv("ADMIN_WALLET")

# Account setup
if PRIVATE_KEY:
    admin_account = web3.eth.account.from_key(PRIVATE_KEY)
else:
    admin_account = None
    print("⚠️ WARNING: PRIVATE_KEY not set in .env")


def get_nonce(address=None):
    """Get transaction nonce for address"""
    if address is None and admin_account:
        address = admin_account.address
    return web3.eth.get_transaction_count(Web3.to_checksum_address(address))


def sign_and_send_transaction(transaction, private_key=None):
    """
    Sign transaction with private key and send it
    
    Args:
        transaction: Built transaction dict
        private_key: Private key to sign with (default: PRIVATE_KEY)
    
    Returns:
        Transaction hash in hex format
    """
    if private_key is None:
        private_key = PRIVATE_KEY
    
    signed_txn = web3.eth.account.sign_transaction(transaction, private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    return web3.to_hex(tx_hash)


def get_balance(address):
    """Get ETH balance of an address"""
    address = Web3.to_checksum_address(address)
    balance_wei = web3.eth.get_balance(address)
    balance_eth = web3.from_wei(balance_wei, 'ether')
    
    return float(balance_eth)


def wait_for_transaction(tx_hash, timeout=300):
    """
    Wait for transaction confirmation
    
    Args:
        tx_hash: Transaction hash
        timeout: Timeout in seconds
    
    Returns:
        Transaction receipt
    """
    return web3.eth.wait_for_transaction_receipt(tx_hash, timeout=timeout)


def estimate_gas(transaction):
    """Estimate gas for transaction"""
    return web3.eth.estimate_gas(transaction)
