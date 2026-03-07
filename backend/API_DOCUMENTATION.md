# Django REST API Setup Guide - Decentralized Electricity Trading System

## ✅ Installation & Configuration Complete!

This guide documents all the API endpoints that have been configured for your backend.

---

## 📦 Prerequisites & Installation

### 1. Install Required Packages
```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install web3
```

### 2. Updated Settings
The following has been added to `backend/settings.py`:

```python
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'user_id',
    'USER_ID_CLAIM': 'user_id',
}
```

---

## 🗄️ Database Setup

### Run Migrations
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Create Sample Pricing Data (for testing)
```bash
python manage.py shell

# Inside shell:
from dashboard.models import DynamicPricing
from django.utils import timezone

DynamicPricing.objects.create(
    timestamp=timezone.now(),
    base_price=6,
    demand_supply_factor=1.2,
    renewable_bonus=1,
    congestion_factor=1.1,
    time_of_use_multiplier=1.3,
    final_price=9.3,
    grid_zone="ZONE_A"
)
```

---

## 🚀 Start the Server

```bash
python manage.py runserver
```

Server runs at: `http://127.0.0.1:8000`

---

## 📚 API Endpoints Documentation

### Base URL
```
http://127.0.0.1:8000/api/
```

---

## 🔐 Authentication Endpoints

### 1. **Register User** 
```
POST /api/register/
```

**No Authentication Required**

**Request Body:**
```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "password": "secure_password123",
  "user_type": "prosumer",
  "latitude": 17.385,
  "longitude": 78.486,
  "wallet_address": "0xABC123456789",
  "grid_connection_point": "ZONE_A",
  "installed_capacity_kw": 5.0,
  "storage_capacity_kwh": 10.0
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully"
}
```

---

### 2. **Login User**
```
POST /api/login/
```

**No Authentication Required**

**Request Body:**
```json
{
  "email": "rahul@gmail.com",
  "password": "secure_password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs...",
  "user_id": 1,
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "user_type": "prosumer"
}
```

---

### 3. **Refresh Token**
```
POST /api/token/refresh/
```

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs..."
}
```

---

## 💰 Wallet Endpoints

### 4. **Connect MetaMask Wallet**
```
POST /api/connect-wallet/
```

**Authentication Required:** ✅ Bearer Token

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "wallet_address": "0xABC123456789DEF"
}
```

**Response (201 Created):**
```json
{
  "message": "Wallet connected successfully",
  "wallet_address": "0xABC123456789DEF"
}
```

---

### 5. **Get Wallet Details**
```
GET /api/wallet/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "wallet_address": "0xABC123456789DEF",
  "user_name": "Rahul Kumar",
  "token_balance": 100.5,
  "last_synced_block": 12345
}
```

---

## 📈 Dynamic Pricing Endpoints

### 6. **Get Current Energy Price**
```
GET /api/current-price/?zone=ZONE_A
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `zone` (optional): ZONE_A, ZONE_B, ZONE_C (default: ZONE_A)

**Response (200 OK):**
```json
{
  "timestamp": "2026-02-15T12:00:00Z",
  "base_price": 6,
  "demand_supply_factor": 1.2,
  "renewable_bonus": 1,
  "congestion_factor": 1.1,
  "time_of_use_multiplier": 1.3,
  "final_price": 9.3,
  "grid_zone": "ZONE_A"
}
```

---

### 7. **Get Pricing History**
```
GET /api/pricing-history/?zone=ZONE_A&limit=10
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `zone` (optional): ZONE_A, ZONE_B, ZONE_C
- `limit` (optional): number of records to return (default: 10)

**Response (200 OK):**
```json
[
  {
    "timestamp": "2026-02-15T12:00:00Z",
    "base_price": 6,
    "final_price": 9.3,
    "grid_zone": "ZONE_A"
  },
  ...
]
```

---

## 📋 Order Management Endpoints

### 8. **Create SELL Order** (Producer)
```
POST /api/sell-order/
```

**Authentication Required:** ✅ Bearer Token

**Request Body:**
```json
{
  "energy_amount_kwh": 50,
  "price_per_kwh": 9.5,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "message": "Sell order created successfully",
  "order_id": 1
}
```

---

### 9. **Create BUY Order** (Consumer)
```
POST /api/buy-order/
```

**Authentication Required:** ✅ Bearer Token

**Request Body:**
```json
{
  "energy_amount_kwh": 30,
  "price_per_kwh": 10.5,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "message": "Buy order created successfully",
  "order_id": 2
}
```

---

### 10. **List All Open Orders**
```
GET /api/orders/?order_type=BUY
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `order_type` (optional): BUY or SELL

**Response (200 OK):**
```json
[
  {
    "order_id": 1,
    "user_name": "Rahul Kumar",
    "order_type": "SELL",
    "energy_amount_kwh": 50,
    "price_per_kwh": 9.5,
    "order_status": "OPEN",
    "created_at": "2026-02-15T10:00:00Z"
  },
  ...
]
```

---

### 11. **Get User's Orders**
```
GET /api/my-orders/?status=OPEN
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `status` (optional): OPEN, MATCHED, CANCELLED

**Response (200 OK):**
```json
[
  {
    "order_id": 1,
    "user_name": "Rahul Kumar",
    "order_type": "SELL",
    "energy_amount_kwh": 50,
    "price_per_kwh": 9.5,
    "time_slot_start": "2026-02-16T14:00:00Z",
    "time_slot_end": "2026-02-16T16:00:00Z",
    "order_status": "OPEN",
    "created_at": "2026-02-15T10:00:00Z"
  }
]
```

---

### 12. **Get Order Details**
```
GET /api/orders/{order_id}/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "order_id": 1,
  "user_name": "Rahul Kumar",
  "order_type": "SELL",
  "energy_amount_kwh": 50,
  "price_per_kwh": 9.5,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z",
  "order_status": "OPEN",
  "created_at": "2026-02-15T10:00:00Z"
}
```

---

### 13. **Cancel Order**
```
POST /api/orders/{order_id}/cancel/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "message": "Order cancelled successfully",
  "order_id": 1
}
```

---

## 🤖 Order Matching Engine - CORE FEATURE

### 14. **Match BUY & SELL Orders** (Marketplace Brain)
```
POST /api/match-orders/
```

**Authentication Required:** ✅ Bearer Token

**Request Body:** (empty)
```json
{}
```

**Matching Logic:**
- ✅ BUY price >= SELL price
- ✅ Time slots overlap
- ✅ Both orders are OPEN
- ✅ Different users

**Response (200 OK):**
```json
{
  "message": "2 trades matched successfully",
  "trades": [
    {
      "trade_id": 1,
      "buyer": "John (Consumer)",
      "seller": "Rahul (Producer)",
      "energy_amount": 30,
      "trade_price": 9.5
    },
    {
      "trade_id": 2,
      "buyer": "Jane (Consumer)",
      "seller": "Rahul (Producer)",
      "energy_amount": 20,
      "trade_price": 9.5
    }
  ]
}
```

---

## 🔄 Trade Endpoints

### 15. **List All Trades**
```
GET /api/trades/?status=PENDING
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `status` (optional): PENDING, SUCCESS, FAILED

**Response (200 OK):**
```json
[
  {
    "trade_id": 1,
    "buy_order": 2,
    "sell_order": 1,
    "buyer_name": "John",
    "seller_name": "Rahul",
    "energy_amount": 30,
    "trade_price": 9.5,
    "settlement_status": "PENDING",
    "blockchain_settlement_hash": null,
    "timestamp": "2026-02-15T12:30:00Z"
  }
]
```

---

### 16. **Get User's Trades**
```
GET /api/my-trades/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):** (Same as List All Trades, filtered for current user)

---

### 17. **Get Trade Details**
```
GET /api/trades/{trade_id}/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "trade_id": 1,
  "buy_order": 2,
  "sell_order": 1,
  "buyer_name": "John",
  "seller_name": "Rahul",
  "energy_amount": 30,
  "trade_price": 9.5,
  "settlement_status": "PENDING",
  "blockchain_settlement_hash": null,
  "timestamp": "2026-02-15T12:30:00Z"
}
```

---

## ⛓️ Blockchain Settlement

### 18. **Settle Trade on Blockchain**
```
POST /api/trades/{trade_id}/settle/
```

**Authentication Required:** ✅ Bearer Token

**Request Body (Optional):**
```json
{
  "tx_hash": "0x1234567890abcdef"
}
```

**Response (200 OK):**
```json
{
  "message": "Trade settled successfully",
  "trade_id": 1,
  "blockchain_hash": "0x1234567890abcdef"
}
```

**Note:** Later, this will integrate with the smart contract to transfer tokens between buyer and seller.

---

## 💎 Energy Token Endpoints

### 19. **Get Token Balance**
```
GET /api/token-balance/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "user_id": 1,
  "token_balance": 150.5,
  "wallet_address": "0xABC123456789"
}
```

---

### 20. **Get Token Transactions**
```
GET /api/token-transactions/?limit=20
```

**Authentication Required:** ✅ Bearer Token

**Query Parameters:**
- `limit` (optional): number of transactions (default: 20)

**Response (200 OK):**
```json
[
  {
    "token_tx_id": 1,
    "user_name": "Rahul Kumar",
    "energy_amount_kwh": 50,
    "tokens_minted": 50,
    "tokens_burned": 0,
    "blockchain_tx_hash": "0x...",
    "timestamp": "2026-02-15T10:00:00Z"
  }
]
```

---

## 👤 User Profile Endpoints

### 21. **Get Current User Profile**
```
GET /api/profile/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "user_id": 1,
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "user_type": "prosumer",
  "latitude": 17.385,
  "longitude": 78.486,
  "wallet_address": "0xABC123456789",
  "kyc_status": "pending",
  "created_at": "2026-02-15T10:00:00Z"
}
```

---

### 22. **Update User Profile**
```
PUT /api/profile/update/
```

**Authentication Required:** ✅ Bearer Token

**Request Body:**
```json
{
  "name": "Rahul Kumar Updated",
  "latitude": 17.390,
  "longitude": 78.490,
  "installed_capacity_kw": 7.5,
  "storage_capacity_kwh": 15.0
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "user_id": 1,
    "name": "Rahul Kumar Updated",
    "email": "rahul@gmail.com",
    ...
  }
}
```

---

### 23. **Get User by Email (Search)**
```
GET /api/users/{email}/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "user_id": 2,
  "name": "John Consumer",
  "email": "john@gmail.com",
  "user_type": "consumer",
  "wallet_address": "0xDEF456789",
  "kyc_status": "verified"
}
```

---

## 📊 Dashboard Endpoint

### 24. **Get Dashboard Statistics**
```
GET /api/dashboard/
```

**Authentication Required:** ✅ Bearer Token

**Response (200 OK):**
```json
{
  "user_id": 1,
  "name": "Rahul Kumar",
  "user_type": "prosumer",
  "open_orders": 3,
  "matched_orders": 5,
  "trades_as_buyer": 10,
  "trades_as_seller": 8,
  "token_balance": 150.5,
  "total_kwh_bought": 120.5,
  "total_kwh_sold": 200.0
}
```

---

## 🧪 Testing with Postman/Thunder Client

### Step 1: Register User
1. Open Postman
2. Create new request: **POST** `http://localhost:8000/api/register/`
3. Go to **Body** → **raw** → **JSON**
4. Paste:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "testpass123",
  "user_type": "prosumer",
  "latitude": 17.385,
  "longitude": 78.486
}
```
5. Click **Send**

### Step 2: Login
1. Create new request: **POST** `http://localhost:8000/api/login/`
2. Body:
```json
{
  "email": "test@example.com",
  "password": "testpass123"
}
```
3. Copy the `access_token` from response

### Step 3: Connect Wallet
1. Create new request: **POST** `http://localhost:8000/api/connect-wallet/`
2. Go to **Headers** tab
3. Add header: `Authorization: Bearer <paste_access_token_here>`
4. Body:
```json
{
  "wallet_address": "0x123456789"
}
```
5. Click **Send**

### Step 4: Create Sell Order
1. Create new request: **POST** `http://localhost:8000/api/sell-order/`
2. Headers: Add `Authorization: Bearer <token>`
3. Body:
```json
{
  "energy_amount_kwh": 50,
  "price_per_kwh": 9.5,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z"
}
```
4. Click **Send**

### Step 5: Create Buy Order (from different user)
- Register another user
- Login to get token
- Create BUY order

### Step 6: Match Orders
1. Create new request: **POST** `http://localhost:8000/api/match-orders/`
2. Headers: `Authorization: Bearer <token>`
3. Body: `{}`
4. Click **Send** → See matched trades!

---

## 🔑 Key Features Implemented

✅ **User Registration & Authentication**
- Secure password hashing
- JWT token-based auth
- Token refresh mechanism

✅ **User Management**
- Profile CRUD operations
- User search by email
- Role-based user types (prosumer, consumer, producer, storage, grid_operator, admin)

✅ **Wallet Integration**
- Connect MetaMask wallets
- Track wallet balance
- Store wallet on blockchain

✅ **Dynamic Pricing**
- Real-time energy price calculation
- Zone-based pricing (ZONE_A, ZONE_B, ZONE_C)
- Pricing history tracking

✅ **Order Management**
- Create BUY/SELL orders
- List open orders
- View user's orders
- Cancel orders

✅ **Order Matching Engine** ⭐
- Intelligent matching algorithm
- Price discovery mechanism
- Time slot validation
- Prevents self-trading

✅ **Trade Execution**
- Create trade matches
- Track trade status
- Blockchain settlement integration

✅ **Energy Tokens**
- Token balance tracking
- Transaction history
- Minting/Burning records

✅ **Dashboard**
- User statistics
- Trading metrics
- Energy production/consumption tracking

---

## 📦 Next Steps - Blockchain Integration

The backend is ready for blockchain integration! The following needs to be done:

1. **Deploy Smart Contracts**
   - Deploy `ElectricityToken.sol`
   - Deploy `EnergyCredit.sol`
   - Deploy `ElectricityMarketplace.sol`

2. **Update Settlement Logic**
   - Call token transfer functions when trade is settled
   - Use web3.py to sign transactions from backend

3. **Update wallet balance**
   - Sync blockchain balance with database wallet

4. **Events & Notifications**
   - Send notifications when trades are matched
   - Alert users of order fills

---

## 🛑 Troubleshooting

**Issue:** `No pricing data available`
**Solution:** Create sample pricing data using Django shell (see setup section)

**Issue:** `Wallet not connected`
**Solution:** Call `/api/connect-wallet/` endpoint first before accessing wallet data

**Issue:** Orders not matching
**Solution:** Ensure BUY price >= SELL price and time slots overlap

---

## 📞 Support

For issues or questions, refer to:
- Django REST Framework: https://www.django-rest-framework.org/
- Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/
- Web3.py: https://web3py.readthedocs.io/

---

**🎉 Your Django REST API is ready! Time to build the frontend! 🚀**
