import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiSignup } from '../../utils/Api';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await ApiSignup({ username, email, password });

      // 🟢 Optional: Save email for next login
      localStorage.setItem('last_email', email);

      toast.success('🎉 Account created successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Signup Error:', error);

      const fallback = 'Signup failed. Please check your input.';

      // Show specific field error or fallback
      if (typeof error === 'object') {
        if (error.username) toast.error(error.username[0]);
        else if (error.email) toast.error(error.email[0]);
        else if (error.password) toast.error(error.password[0]);
        else if (error.detail) toast.error(error.detail);
        else toast.error(fallback);
      } else {
        toast.error(typeof error === 'string' ? error : fallback);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h1 className="text-center mb-4">Sign Up</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-2">
          Forgot your password?{' '}
          <Link to="/forgot-password" className="forgot-password-link">
            Reset it here
          </Link>
        </p>

        <p className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
