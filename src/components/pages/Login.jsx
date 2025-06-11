import React, { useState, useContext, useEffect } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      document.getElementById('username')?.focus();
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      toast.error('⚠️ All fields are required');
      return;
    }

    try {
      setLoading(true);

      // ✅ Call only the context login function
      await login({ username, password });

      toast.success('✅ Login successful! Redirecting...');
      setFormData({ username: '', password: '' });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setFormData((prev) => ({ ...prev, password: '' }));

      const errDetail =
        error?.detail ||
        error?.password?.[0] ||
        error?.non_field_errors?.[0] ||
        '❌ Login failed. Please check your credentials.';

      toast.error(errDetail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-center mb-4">Login to Your Account</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ paddingRight: '40px' }}
              autoComplete="current-password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#555',
                userSelect: 'none',
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowPassword((prev) => !prev);
                }
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
