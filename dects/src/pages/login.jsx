import React, { useState, useCallback} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Zap, AlertCircle, CheckCircle, Eye, EyeOff, Loader } from "lucide-react";
import "../assets/auth-pages.css";

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [errors, setErrors] = useState({});

  const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

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

  const handleLogin = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      setMessage('Please fix the errors above');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const url = `${API_BASE.replace(/\/$/, '')}/login/`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        const text = await response.text();
        console.error('Login failed:', response.status, text);

        if (response.status === 401) {
          setMessage('Invalid email or password');
          setMessageType('error');
        } else if (response.status === 400) {
          setMessage('Please check your email and password');
          setMessageType('error');
        } else if (response.status >= 500) {
          setMessage('Server error. Please try again later.');
          setMessageType('error');
        } else {
          setMessage('Login failed. Please try again.');
          setMessageType('error');
        }
        return;
      }


      if (contentType.includes('application/json')) {
        const data = await response.json();

        // Validate response data
        if (!data.access) {
          setMessage('Authentication failed. Please try again.');
          setMessageType('error');
          return;
        }

        // Store tokens and user info
        if (data.access) localStorage.setItem('access_token', data.access);
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        
        if (data.role) {
          const normalizedRole = data.role.toLowerCase();
          localStorage.setItem('user_role', normalizedRole);
          localStorage.setItem('role', normalizedRole);
        }

        if (data.email) {
          localStorage.setItem('email', data.email);
        } else if (formData.email) {
          localStorage.setItem('email', formData.email);
        }

        // Store user data
        const userData = {
          email: data.email || formData.email,
          role: data.role?.toLowerCase() || 'consumer',
          name: data.name || formData.email.split('@')[0]
        };
        localStorage.setItem('user', JSON.stringify(userData));

        setMessageType('success');
        setMessage('Login successful! Redirecting...');

        if (setUser) {
          setUser(userData);
        }

        // Redirect based on role
        setTimeout(() => {
          if (data.redirect_to) {
            navigate(data.redirect_to);
          } else if (data.role) {
            const role = data.role.toLowerCase();
            if (role === 'consumer') navigate('/consumer');
            else if (role === 'producer') navigate('/producer');
            else if (role === 'admin') navigate('/adminpanal');
            else navigate('/home');
          } else {
            navigate('/home');
          }
        }, 1000);
      } else {
        setMessage('Unexpected server response. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Connection error. Please check your internet connection.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Zap size={32} />
          </div>
          <h1>RTDECTS</h1>
          <p>Electricity Credit & Trading System</p>
        </div>

        {message && (
          <div className={`login-message ${messageType}`} role="alert">
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

        <form onSubmit={handleLogin} noValidate>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={errors.email ? 'has-error' : ''}
              />
            </div>
            {errors.email && (
              <span id="email-error" className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper password-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={errors.password ? 'has-error' : ''}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn primary login-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Additional Links */}
        <div className="auth-links">
          <p className="register-link">
            Don't have an account?{' '}
            <Link to="/register">Create one here</Link>
          </p>
          <p className="forgot-password">
            <Link to="#forgot">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
