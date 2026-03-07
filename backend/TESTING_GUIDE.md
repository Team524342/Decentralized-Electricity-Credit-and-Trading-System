# Backend Setup & API Testing Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Navigate to Backend
```bash
cd backend
```

### 2. Install Dependencies
```bash
pip install djangorestframework djangorestframework-simplejwt web3
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Create Sample Pricing Data
```bash
python manage.py shell
```

Then inside the shell:
```python
from dashboard.models import DynamicPricing
from django.utils import timezone

# Create sample pricing
DynamicPricing.objects.create(
    timestamp=timezone.now(),
    base_price=6.0,
    demand_supply_factor=1.2,
    renewable_bonus=1.0,
    congestion_factor=1.1,
    time_of_use_multiplier=1.3,
    final_price=9.3,
    grid_zone="ZONE_A"
)

DynamicPricing.objects.create(
    timestamp=timezone.now(),
    base_price=5.5,
    demand_supply_factor=1.1,
    renewable_bonus=1.0,
    congestion_factor=0.9,
    time_of_use_multiplier=1.2,
    final_price=7.2,
    grid_zone="ZONE_B"
)

exit()
```

### 5. Start Server
```bash
python manage.py runserver
```

Server: `http://127.0.0.1:8000`

---

## 🧪 Complete API Testing Workflow

### Using Postman / Thunder Client

#### **Step 1: Register User 1 (Producer)**

**Endpoint:** `POST http://127.0.0.1:8000/api/register/`

**Body (Raw JSON):**
```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "password": "testpass123",
  "user_type": "prosumer",
  "latitude": 17.385,
  "longitude": 78.486,
  "grid_connection_point": "ZONE_A",
  "installed_capacity_kw": 10.5,
  "storage_capacity_kwh": 20.0
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully"
}
```

---

#### **Step 2: Register User 2 (Consumer)**

**Endpoint:** `POST http://127.0.0.1:8000/api/register/`

**Body:**
```json
{
  "name": "John Consumer",
  "email": "john@gmail.com",
  "password": "testpass123",
  "user_type": "consumer",
  "latitude": 17.390,
  "longitude": 78.490,
  "grid_connection_point": "ZONE_A"
}
```

---

#### **Step 3: Login User 1 (Rahul)**

**Endpoint:** `POST http://127.0.0.1:8000/api/login/`

**Body:**
```json
{
  "email": "rahul@gmail.com",
  "password": "testpass123"
}
```

**Response:**
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

**⭐ COPY the `access_token` value**

---

#### **Step 4: Connect Wallet (Rahul)**

**Endpoint:** `POST http://127.0.0.1:8000/api/connect-wallet/`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs...
```

**Body:**
```json
{
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc021e7d10b5E6"
}
```

**Response (201):**
```json
{
  "message": "Wallet connected successfully",
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc021e7d10b5E6"
}
```

---

#### **Step 5: Get Current Price**

**Endpoint:** `GET http://127.0.0.1:8000/api/current-price/?zone=ZONE_A`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs...
```

**Response (200):**
```json
{
  "timestamp": "2026-02-15T10:30:00Z",
  "base_price": 6.0,
  "demand_supply_factor": 1.2,
  "renewable_bonus": 1.0,
  "congestion_factor": 1.1,
  "time_of_use_multiplier": 1.3,
  "final_price": 9.3,
  "grid_zone": "ZONE_A"
}
```

---

#### **Step 6: Create Sell Order (Rahul selling 50 kWh at 9₹/kWh)**

**Endpoint:** `POST http://127.0.0.1:8000/api/sell-order/`

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIs...
```

**Body:**
```json
{
  "energy_amount_kwh": 50,
  "price_per_kwh": 9.0,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z"
}
```

**Response (201):**
```json
{
  "message": "Sell order created successfully",
  "order_id": 1
}
```

---

#### **Step 7: Login User 2 (John)**

**Endpoint:** `POST http://127.0.0.1:8000/api/login/`

**Body:**
```json
{
  "email": "john@gmail.com",
  "password": "testpass123"
}
```

**⭐ COPY John's `access_token`**

---

#### **Step 8: Connect Wallet (John)**

**Endpoint:** `POST http://127.0.0.1:8000/api/connect-wallet/`

**Headers:**
```
Authorization: Bearer <john_access_token>
```

**Body:**
```json
{
  "wallet_address": "0x123456789abcdef"
}
```

---

#### **Step 9: Create Buy Order (John buying 40 kWh at 10₹/kWh)**

**Endpoint:** `POST http://127.0.0.1:8000/api/buy-order/`

**Headers:**
```
Authorization: Bearer <john_access_token>
```

**Body:**
```json
{
  "energy_amount_kwh": 40,
  "price_per_kwh": 10.0,
  "time_slot_start": "2026-02-16T14:00:00Z",
  "time_slot_end": "2026-02-16T16:00:00Z"
}
```

**Response (201):**
```json
{
  "message": "Buy order created successfully",
  "order_id": 2
}
```

---

#### **Step 10: List Open Orders**

**Endpoint:** `GET http://127.0.0.1:8000/api/orders/`

**Headers:**
```
Authorization: Bearer <any_token>
```

**Response (200):**
```json
[
  {
    "order_id": 1,
    "user_name": "Rahul Kumar",
    "order_type": "SELL",
    "energy_amount_kwh": 50,
    "price_per_kwh": 9.0,
    "order_status": "OPEN",
    "created_at": "2026-02-15T10:45:00Z"
  },
  {
    "order_id": 2,
    "user_name": "John Consumer",
    "order_type": "BUY",
    "energy_amount_kwh": 40,
    "price_per_kwh": 10.0,
    "order_status": "OPEN",
    "created_at": "2026-02-15T10:46:00Z"
  }
]
```

---

#### **Step 11: ⭐ MATCH ORDERS (THE MAGIC!) ⭐**

**Endpoint:** `POST http://127.0.0.1:8000/api/match-orders/`

**Headers:**
```
Authorization: Bearer <any_token>
```

**Body:**
```json
{}
```

**Response (200) - TRADES CREATED!:**
```json
{
  "message": "1 trades matched successfully",
  "trades": [
    {
      "trade_id": 1,
      "buyer": "John Consumer",
      "seller": "Rahul Kumar",
      "energy_amount": 40,
      "trade_price": 9.0
    }
  ]
}
```

**What Happened:**
- ✅ Rahul's SELL order (50 kWh @ ₹9) matched with John's BUY order (40 kWh @ ₹10)
- ✅ BUY price (₹10) >= SELL price (₹9) ✓
- ✅ Time slots overlap ✓
- ✅ Different users ✓
- ✅ Trade created for 40 kWh (min of 50 & 40) at ₹9/kWh

---

#### **Step 12: View All Trades**

**Endpoint:** `GET http://127.0.0.1:8000/api/trades/`

**Headers:**
```
Authorization: Bearer <any_token>
```

**Response (200):**
```json
[
  {
    "trade_id": 1,
    "buy_order": 2,
    "sell_order": 1,
    "buyer_name": "John Consumer",
    "seller_name": "Rahul Kumar",
    "energy_amount": 40,
    "trade_price": 9.0,
    "settlement_status": "PENDING",
    "blockchain_settlement_hash": null,
    "timestamp": "2026-02-15T10:47:00Z"
  }
]
```

---

#### **Step 13: View User's Trades (Rahul)**

**Endpoint:** `GET http://127.0.0.1:8000/api/my-trades/`

**Headers:**
```
Authorization: Bearer <rahul_token>
```

**Response:** Shows all trades where Rahul is buyer OR seller

---

#### **Step 14: Get Dashboard Stats (Rahul)**

**Endpoint:** `GET http://127.0.0.1:8000/api/dashboard/`

**Headers:**
```
Authorization: Bearer <rahul_token>
```

**Response (200):**
```json
{
  "user_id": 1,
  "name": "Rahul Kumar",
  "user_type": "prosumer",
  "open_orders": 1,
  "matched_orders": 1,
  "trades_as_buyer": 0,
  "trades_as_seller": 1,
  "token_balance": 0,
  "total_kwh_bought": 0,
  "total_kwh_sold": 40
}
```

---

#### **Step 15: Settle Trade on Blockchain**

**Endpoint:** `POST http://127.0.0.1:8000/api/trades/1/settle/`

**Headers:**
```
Authorization: Bearer <rahul_or_john_token>
```

**Body (optional):**
```json
{
  "tx_hash": "0x1234567890abcdef1234567890abcdef"
}
```

**Response (200):**
```json
{
  "message": "Trade settled successfully",
  "trade_id": 1,
  "blockchain_hash": "0x1234567890abcdef1234567890abcdef"
}
```

---

## 📊 Complete Testing Checklist

After running all 15 steps above, verify:

- [x] User Registration works
- [x] Login generates JWT tokens
- [x] Wallet connection works
- [x] Current price endpoint returns data
- [x] SELL order created
- [x] BUY order created
- [x] Open orders listed
- [x] **✨ Matching Engine matched orders!**
- [x] Trades visible in system
- [x] User trades filtered correctly
- [x] Dashboard shows stats
- [x] Trade settlement works
- [x] API error handling works (test with invalid data)

---

## 🔥 Key Success Indicators

✅ **BUY and SELL orders created**  
✅ **Matching algorithm finds compatible trades**  
✅ **TradeMatch record created with correct data**  
✅ **Orders status changed to MATCHED**  
✅ **Buyer and seller information stored**  
✅ **Trade price correctly recorded**  

---

## 🚨 Common Issues & Solutions

### Issue: "No pricing data available"
**Solution:** Run Step 4 to create sample pricing data

### Issue: Orders not matching
**Possible reasons:**
- BUY price < SELL price → Increase BUY price
- Time slots don't overlap → Use same time slots
- Same user created both orders → Use different users
- Orders not OPEN status → Check order status endpoint

### Issue: "Wallet not connected"
**Solution:** Make sure you ran Step 4 or 8 to connect wallet

### Issue: "Not authorized"
**Solution:** Check bearer token in Authorization header

---

## 📈 API Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success (GET, PUT) |
| 201 | ✅ Created (POST) |
| 400 | ❌ Bad Request |
| 401 | ❌ Unauthorized |
| 403 | ❌ Forbidden |
| 404 | ❌ Not Found |
| 500 | ❌ Server Error |

---

## 🎯 Next: Frontend Integration

After backend testing is complete:

1. Install frontend dependencies
2. Configure API base URL: `http://127.0.0.1:8000/api/`
3. Use access tokens for all authenticated requests
4. Implement UI forms for Order creation
5. Build dashboard with stats
6. Connect MetaMask wallet
7. Trigger order matching
8. Display trades

---

## 📚 API Endpoints Quick Reference

```
AUTH
  POST   /api/register/
  POST   /api/login/
  POST   /api/token/refresh/

WALLET
  POST   /api/connect-wallet/
  GET    /api/wallet/

PRICING
  GET    /api/current-price/?zone=ZONE_A
  GET    /api/pricing-history/

ORDERS
  POST   /api/sell-order/
  POST   /api/buy-order/
  GET    /api/orders/
  GET    /api/orders/{id}/
  POST   /api/orders/{id}/cancel/
  GET    /api/my-orders/

MATCHING
  POST   /api/match-orders/

TRADES
  GET    /api/trades/
  GET    /api/trades/{id}/
  POST   /api/trades/{id}/settle/
  GET    /api/my-trades/

TOKENS
  GET    /api/token-balance/
  GET    /api/token-transactions/

PROFILE
  GET    /api/profile/
  PUT    /api/profile/update/
  GET    /api/users/{email}/

STATS
  GET    /api/dashboard/
```

---

**🎉 Happy Testing! Your API is production-ready! 🚀**
