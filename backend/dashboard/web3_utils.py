# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\web3_utils.py
import os
from web3 import Web3
from dotenv import load_dotenv
import logging

load_dotenv()

logger = logging.getLogger(__name__)

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(os.getenv("SEPOLIA_RPC_URL", "https://eth-sepolia.g.alchemy.com/v2/demo")))

PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

if CONTRACT_ADDRESS:
    CONTRACT_ADDRESS = Web3.to_checksum_address(CONTRACT_ADDRESS)

# ERC20 ABI with transfer, mint, and burn functions
ERC20_ABI = [
    {
        "name": "transfer",
        "type": "function",
        "inputs": [
            {"name": "to", "type": "address"},
            {"name": "value", "type": "uint256"}
        ],
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable"
    },
    {
        "name": "mint",
        "type": "function",
        "inputs": [
            {"name": "to", "type": "address"},
            {"name": "amount", "type": "uint256"}
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "name": "burnFrom",
        "type": "function",
        "inputs": [
            {"name": "account", "type": "address"},
            {"name": "amount", "type": "uint256"}
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
            {"name": "account", "type": "address"}
        ],
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view"
    }
]

# Initialize contract
try:
    if CONTRACT_ADDRESS:
        contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ERC20_ABI)
    else:
        contract = None
except Exception as e:
    logger.error(f"Error initializing contract: {e}")
    contract = None

# Get account from private key
try:
    if PRIVATE_KEY:
        account = w3.eth.account.from_key(PRIVATE_KEY)
    else:
        account = None
except Exception as e:
    logger.error(f"Error loading account: {e}")
    account = None


def transfer_tokens(to_address, amount):
    """
    Transfer tokens from contract owner to recipient
    
    Args:
        to_address: recipient wallet address
        amount: amount to transfer (in kWh, will be converted to wei)
    
    Returns:
        transaction hash
    """
    if not contract or not account:
        raise Exception("Web3 not properly configured. Check PRIVATE_KEY and CONTRACT_ADDRESS in .env")
    
    try:
        to_address = Web3.to_checksum_address(to_address)
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Convert amount to wei (multiply by 10^18)
        amount_wei = int(amount * (10 ** 18))

        tx = contract.functions.transfer(
            to_address,
            amount_wei
        ).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        return w3.to_hex(tx_hash)
    
    except Exception as e:
        logger.error(f"Error transferring tokens: {e}")
        raise e


def mint_tokens(to_address, amount):
    """
    Mint new tokens for energy producer
    
    Args:
        to_address: recipient wallet address
        amount: amount to mint (in kWh, will be converted to wei)
    
    Returns:
        transaction hash
    """
    if not contract or not account:
        raise Exception("Web3 not properly configured. Check PRIVATE_KEY and CONTRACT_ADDRESS in .env")
    
    try:
        to_address = Web3.to_checksum_address(to_address)
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Convert amount to wei
        amount_wei = int(amount * (10 ** 18))

        tx = contract.functions.mint(
            to_address,
            amount_wei
        ).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        return w3.to_hex(tx_hash)
    
    except Exception as e:
        logger.error(f"Error minting tokens: {e}")
        raise e


def burn_tokens(from_address, amount):
    """
    Burn tokens when energy is consumed
    
    Args:
        from_address: account that burns tokens
        amount: amount to burn (in kWh, will be converted to wei)
    
    Returns:
        transaction hash
    """
    if not contract or not account:
        raise Exception("Web3 not properly configured. Check PRIVATE_KEY and CONTRACT_ADDRESS in .env")
    
    try:
        from_address = Web3.to_checksum_address(from_address)
        nonce = w3.eth.get_transaction_count(account.address)
        
        # Convert amount to wei
        amount_wei = int(amount * (10 ** 18))

        tx = contract.functions.burnFrom(
            from_address,
            amount_wei
        ).build_transaction({
            'from': account.address,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.to_wei('20', 'gwei')
        })

        signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        return w3.to_hex(tx_hash)
    
    except Exception as e:
        logger.error(f"Error burning tokens: {e}")
        raise e


def get_token_balance(wallet_address):
    """
    Get token balance for a wallet
    
    Args:
        wallet_address: wallet address
    
    Returns:
        balance in tokens
    """
    if not contract:
        raise Exception("Web3 not properly configured")
    
    try:
        wallet_address = Web3.to_checksum_address(wallet_address)
        balance_wei = contract.functions.balanceOf(wallet_address).call()
        balance = balance_wei / (10 ** 18)
        return balance
    
    except Exception as e:
        logger.error(f"Error getting balance: {e}")
        raise e


def is_web3_connected():
    """Check if Web3 is properly connected"""
    try:
        if w3.is_connected():
            return True
        return False
    except:
        return False


def get_gas_price():
    """Get current gas price"""
    try:
        gas_price = w3.eth.gas_price
        gas_price_gwei = w3.from_wei(gas_price, 'gwei')
        return gas_price_gwei
    except Exception as e:
        logger.error(f"Error getting gas price: {e}")
        return None
