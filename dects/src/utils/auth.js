/**
 * Authentication utility functions for token and role management
 * Handles localStorage operations with error handling and validation
 */

/**
 * Store authentication tokens and user role in localStorage
 * @param {Object} authData - Authentication data object
 * @param {string} authData.access - Access token
 * @param {string} authData.refresh - Refresh token
 * @param {string} authData.role - User role (admin, producer, consumer)
 * @throws {Error} If token values are invalid
 */
export const setAuthTokens = ({ access, refresh, role }) => {
  try {
    if (!access || typeof access !== 'string') {
      throw new Error('Invalid access token provided');
    }

    if (access) {
      localStorage.setItem('access_token', access);
    }
    if (refresh && typeof refresh === 'string') {
      localStorage.setItem('refresh_token', refresh);
    }
    if (role && typeof role === 'string') {
      const normalizedRole = role.toLowerCase();
      localStorage.setItem('user_role', normalizedRole);
    }
  } catch (error) {
    console.error('Error setting auth tokens:', error);
    throw new Error(`Failed to set authentication tokens: ${error.message}`);
  }
};

/**
 * Retrieve the access token from localStorage
 * @returns {string|null} Access token or null if not found
 */
export const getAccessToken = () => {
  try {
    return localStorage.getItem('access_token');
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

/**
 * Retrieve the refresh token from localStorage
 * @returns {string|null} Refresh token or null if not found
 */
export const getRefreshToken = () => {
  try {
    return localStorage.getItem('refresh_token');
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

/**
 * Retrieve the user role from localStorage
 * @returns {string|null} User role or null if not found
 */
export const getUserRole = () => {
  try {
    const role = localStorage.getItem('user_role');
    return role ? role.toLowerCase() : null;
  } catch (error) {
    console.error('Error retrieving user role:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if access token exists
 */
export const isAuthenticated = () => {
  return !!getAccessToken();
};

/**
 * Check if user has a specific role
 * @param {string|string[]} requiredRoles - Role(s) to check
 * @returns {boolean} True if user has one of the required roles
 */
export const hasRole = (requiredRoles) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(userRole.toLowerCase());
};

/**
 * Clear all authentication data from localStorage
 * @throws {Error} If localStorage operations fail
 */
export const clearAuth = () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error clearing auth:', error);
    throw new Error('Failed to clear authentication data');
  }
};

/**
 * Generate Authorization header with Bearer token
 * @returns {Object} Headers object with Authorization if token exists
 */
export const authHeader = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Make a fetch request with Authorization header
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 * @throws {Error} If fetch fails
 */
export const fetchWithAuth = async (url, options = {}) => {
  if (!url || typeof url !== 'string') {
    throw new Error('URL must be a non-empty string');
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...authHeader()
    };

    const response = await fetch(url, { ...options, headers });

    // If unauthorized, clear auth and redirect
    if (response.status === 401) {
      clearAuth();
      window.location.href = '/login';
    }

    return response;
  } catch (error) {
    console.error('Fetch request failed:', error);
    throw new Error(`Request failed: ${error.message}`);
  }
};

export default {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  getUserRole,
  isAuthenticated,
  hasRole,
  clearAuth,
  authHeader,
  fetchWithAuth,
};
