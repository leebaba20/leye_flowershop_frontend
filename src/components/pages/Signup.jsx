// signup.jsx
import React, { useState, useContext } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { ApiSignup } from '../../utils/Api';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    setIsSubmitting(true);

    try {
      const data = await ApiSignup({ username, email, password });
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error?.email?.[0]) {
        toast.error(error.email[0]);
      } else if (error?.username?.[0]) {
        toast.error(error.username[0]);
      } else if (error?.password?.[0]) {
        toast.error(error.password[0]);
      } else if (error?.detail) {
        toast.error(error.detail);
      } else if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('❌ Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h1 className="text-center mb-4">Sign Up</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <input
            id="confirmPassword"
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