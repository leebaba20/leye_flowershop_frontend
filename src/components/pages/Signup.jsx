import React, { useState, useContext } from 'react';
import './signup.css';
import { useNavigate, Link } from 'react-router-dom'; // <-- Added Link import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/UserContext';
import { ApiSignup } from '../../utils/Api';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);  // Use login from context

  const [formData, setFormData] = useState({
    name: '',
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

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Call the mockSignup function to simulate the signup process
      const user = await ApiSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Login the user after successful signup
      login(user);

      // Show success message
      toast.success('Signup successful! Redirecting to login...', {
        autoClose: 2000,
        onClose: () => navigate('/login'), // Redirect to login page
      });
    } catch (error) {
      console.error(error);
      toast.error('Signup failed. Please try again.');
    }

    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <h1 className="text-center mb-4">Sign Up</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
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
          <button type="submit" className="btn-submit">Sign Up</button>
        </form>

        {/* Link to the Login page */}
        <p className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
