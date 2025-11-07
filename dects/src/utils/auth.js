// Lightweight auth helpers: store tokens and role in localStorage
export const setAuthTokens = ({ access, refresh, role }) => {
  if (access) localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
  if (role) localStorage.setItem('user_role', role);
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const getUserRole = () => localStorage.getItem('user_role');

export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
};

export const authHeader = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper for fetch with Authorization header
export const fetchWithAuth = (url, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}), ...authHeader() };
  return fetch(url, { ...options, headers });
};

export default {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  getUserRole,
  clearAuth,
  authHeader,
  fetchWithAuth,
};
