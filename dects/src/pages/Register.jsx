import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader } from 'lucide-react';
import '../assets/register.css';

/**
 * User Registration Page Component
 * Handles user registration with form validation and error handling
 */
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    wallet_address: '',
    location: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [errors, setErrors] = useState({});

  const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Validate password strength
   */
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  /**
   * Validate Ethereum address format (optional field)
   */
  const isValidWalletAddress = (address) => {
    if (!address) return true; // Optional field
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  /**
   * Validate entire form
   */
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.wallet_address && !isValidWalletAddress(formData.wallet_address)) {
      newErrors.wallet_address = 'Invalid Ethereum wallet address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /**
   * Handle form field changes
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      setMessage('Please fix the errors above');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const url = `${API_BASE.replace(/\/$/, '')}/register/`;
      
      const response = await axios.post(url, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role.toLowerCase(),
        wallet_address: formData.wallet_address.trim() || null,
        location: formData.location.trim()
      });

      if (response.status >= 200 && response.status < 300) {
        setMessageType('success');
        setMessage('Registration successful! Redirecting to login...');
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.data?.email) {
        setMessage('Email already registered');
        setErrors(prev => ({ ...prev, email: 'Email already in use' }));
      } else if (error.response?.status === 400) {
        setMessage('Invalid registration data. Please check your inputs.');
      } else if (error.response?.status === 500) {
        setMessage('Server error. Please try again later.');
      } else {
        setMessage('Registration failed. Please check your connection and try again.');
      }
      
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join the decentralized energy trading revolution</p>
        </div>

        {message && (
          <div className={`register-message ${messageType}`} role="alert">
            <div className="message-icon">
              {messageType === 'error' ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
            </div>
            <p>{message}</p>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="At least 8 characters"
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id="confirm-error" className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">Account Type</label>
            <select
              id="role"
              name="role"
              className={`form-input ${errors.role ? 'has-error' : ''}`}
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? 'role-error' : undefined}
            >
              <option value="">Select your role</option>
              <option value="consumer">Consumer</option>
              <option value="producer">Producer</option>
            </select>
            {errors.role && (
              <span id="role-error" className="error-message">{errors.role}</span>
            )}
          </div>

          {/* Wallet Address (Optional) */}
          <div className="form-group">
            <label htmlFor="wallet" className="form-label">Wallet Address (Optional)</label>
            <input
              id="wallet"
              type="text"
              name="wallet_address"
              placeholder="0x..."
              className={`form-input ${errors.wallet_address ? 'has-error' : ''}`}
              value={formData.wallet_address}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.wallet_address}
              aria-describedby={errors.wallet_address ? 'wallet-error' : undefined}
            />
            {errors.wallet_address && (
              <span id="wallet-error" className="error-message">{errors.wallet_address}</span>
            )}
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="City, State/Region"
              className={`form-input ${errors.location ? 'has-error' : ''}`}
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? 'location-error' : undefined}
            />
            {errors.location && (
              <span id="location-error" className="error-message">{errors.location}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="login-link">
          Already have an account?{' '}
          <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;