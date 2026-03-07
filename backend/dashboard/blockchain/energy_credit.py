"""
Energy Credit Contract Service
Handles submitEnergy → Token Minting
"""

import json
import os
from web3 import Web3
from utils.web3_service import web3, PRIVATE_KEY, sign_and_send_transaction
from dotenv import load_dotenv

load_dotenv()

ENERGY_CREDIT_ADDRESS = os.getenv("ENERGY_CREDIT_ADDRESS")
ADMIN_WALLET = os.getenv("ADMIN_WALLET")

# Load EnergyCredit ABI
abi_path = os.path.join(
    os.path.dirname(__file__),
    "abi",
    "EnergyCredit.json"
)

try:
    with open(abi_path, 'r') as f:
        ENERGY_CREDIT_ABI = json.load(f)
except FileNotFoundError:
    ENERGY_CREDIT_ABI = []
    print(f"⚠️ ABI file not found: {abi_path}")

# Initialize contract
if ENERGY_CREDIT_ADDRESS:
    energy_credit_contract = web3.eth.contract(
        address=Web3.to_checksum_address(ENERGY_CREDIT_ADDRESS),
        abi=ENERGY_CREDIT_ABI
    )
else:
    energy_credit_contract = None
    print("⚠️ ENERGY_CREDIT_ADDRESS not set in .env")


# =================== ENERGY CREDIT FUNCTIONS ===================

def submit_energy(user_wallet, units_produced):
    """
    Submit energy units and mint tokens
    
    Args:
        user_wallet: User's wallet address
        units_produced: kWh of energy produced
    
    Returns:
        Transaction hash
    """
    if not energy_credit_contract:
        raise Exception("Energy Credit contract not initialized")
    
    user_wallet = Web3.to_checksum_address(user_wallet)
    admin_wallet = Web3.to_checksum_address(ADMIN_WALLET)
    
    # Get nonce
    nonce = web3.eth.get_transaction_count(admin_wallet)
    
    # Build transaction
    txn = energy_credit_contract.functions.submitEnergy(
        user_wallet,
        int(units_produced)
    ).build_transaction({
        'from': admin_wallet,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': web3.to_wei('20', 'gwei')
    })
    
    # Sign and send
    tx_hash = sign_and_send_transaction(txn, PRIVATE_KEY)
    
    return tx_hash


def get_user_records(user_wallet):
    """
    Get energy production records for user
    
    Args:
        user_wallet: User's wallet address
    
    Returns:
        List of EnergyRecord structs
    """
    if not energy_credit_contract:
        raise Exception("Energy Credit contract not initialized")
    
    user_wallet = Web3.to_checksum_address(user_wallet)
    
    try:
        records = energy_credit_contract.functions.getUserRecords(
            user_wallet
        ).call()
        return records
    except Exception as e:
        print(f"Error fetching records: {e}")
        return []


def calculate_reward(units):
    """
    Calculate token reward for energy units
    
    Args:
        units: kWh of energy
    
    Returns:
        Tokens to be minted (in wei)
    """
    if not energy_credit_contract:
        raise Exception("Energy Credit contract not initialized")
    
    try:
        reward = energy_credit_contract.functions.calculateReward(
            int(units)
        ).call()
        return reward
    except Exception as e:
        print(f"Error calculating reward: {e}")
        return 0


def get_admin():
    """Get current admin address"""
    if not energy_credit_contract:
        raise Exception("Energy Credit contract not initialized")
    
    try:
        admin = energy_credit_contract.functions.admin().call()
        return admin
    except Exception as e:
        print(f"Error fetching admin: {e}")
        return None
