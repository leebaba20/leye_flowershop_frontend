import React, { useState, useContext } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom'; // <-- Added Link import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { ApiLogin } from '../../utils/Api'; // ✅ Correct



const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Use login from context

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  }); // Added missing closing brace

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const user = await ApiLogin({
        email: formData.email,
        password: formData.password,
      
      });

      // Login the user after successful login
      login(user);

      // Show success message and redirect to homepage
      toast.success('Login successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/'), // Redirect to homepage or another page
      });
    } catch (error) {
      console.error(error);
      toast.error('Invalid credentials. Please try again.');
    }

    // Clear the form after submission
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h1 className="text-center mb-4">Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn-submit">Login</button>
        </form>

        {/* Link to the Signup page */}
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
