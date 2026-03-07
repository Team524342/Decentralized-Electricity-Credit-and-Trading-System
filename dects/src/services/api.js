// dects/src/services/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(
          `${API_BASE_URL}token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;
        localStorage.setItem("access_token", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// =================== AUTHENTICATION ===================

export const registerUser = async (userData) => {
  return API.post("register/", userData);
};

export const loginUser = async (email, password) => {
  return API.post("login/", { email, password });
};

export const refreshToken = async (refreshToken) => {
  return API.post("token/refresh/", { refresh: refreshToken });
};

// =================== WALLET ===================

export const connectWallet = async (walletAddress) => {
  return API.post("connect-wallet/", { wallet_address: walletAddress });
};

export const getWallet = async () => {
  return API.get("wallet/");
};

export const getWalletBlockchainBalance = async () => {
  return API.get("wallet-blockchain-balance/");
};

// =================== PRICING ===================

export const getCurrentPrice = async (zone = "ZONE_A") => {
  return API.get(`current-price/?zone=${zone}`);
};

export const getPricingHistory = async (zone = "ZONE_A", limit = 10) => {
  return API.get(`pricing-history/?zone=${zone}&limit=${limit}`);
};

// =================== ORDERS ===================

export const createSellOrder = async (orderData) => {
  return API.post("sell-order/", orderData);
};

export const createBuyOrder = async (orderData) => {
  return API.post("buy-order/", orderData);
};

export const listOpenOrders = async (orderType = null) => {
  if (orderType) {
    return API.get(`orders/?order_type=${orderType}`);
  }
  return API.get("orders/");
};

export const getOrderDetails = async (orderId) => {
  return API.get(`orders/${orderId}/`);
};

export const cancelOrder = async (orderId) => {
  return API.post(`orders/${orderId}/cancel/`);
};

export const getUserOrders = async (status = null) => {
  if (status) {
    return API.get(`my-orders/?status=${status}`);
  }
  return API.get("my-orders/");
};

// =================== ORDER MATCHING ===================

export const matchOrders = async () => {
  return API.post("match-orders/", {});
};

// =================== TRADES ===================

export const listTrades = async (status = null) => {
  if (status) {
    return API.get(`trades/?status=${status}`);
  }
  return API.get("trades/");
};

export const getTradeDetails = async (tradeId) => {
  return API.get(`trades/${tradeId}/`);
};

export const executeTrade = async (tradeId, txHash = null) => {
  const data = txHash ? { tx_hash: txHash } : {};
  return API.post(`execute-trade/${tradeId}/`, data);
};

export const settleTradeBlockchain = async (tradeId, txHash = null) => {
  const data = txHash ? { tx_hash: txHash } : {};
  return API.post(`trades/${tradeId}/settle/`, data);
};

export const retryBlockchainSettlement = async (tradeId) => {
  return API.post(`trades/${tradeId}/retry-settlement/`);
};

export const getUserTrades = async () => {
  return API.get("my-trades/");
};

// =================== BLOCKCHAIN ===================

export const processEnergyMeasurement = async (measurementId) => {
  return API.post("process-energy/", { measurement_id: measurementId });
};

export const getBlockchainStatus = async () => {
  return API.get("blockchain-status/");
};

// =================== TOKENS ===================

export const getUserTokenBalance = async () => {
  return API.get("token-balance/");
};

export const getTokenTransactions = async (limit = 20) => {
  return API.get(`token-transactions/?limit=${limit}`);
};

// =================== USER PROFILE ===================

export const getUserProfile = async () => {
  return API.get("profile/");
};

export const updateUserProfile = async (profileData) => {
  return API.put("profile/update/", profileData);
};

export const getUserByEmail = async (email) => {
  return API.get(`users/${email}/`);
};

// =================== DASHBOARD ===================

export const getDashboardStats = async () => {
  return API.get("dashboard/");
};

export default API;
